<?php
include_once 'config.php';
include_once 'logger.php';

class db_context {
	private $connection;
	/* Help methods */
	function connect() {
		$socket = null;
		if(!DEBUG) {
			$socket = DB_SOCKET;
		}
		$this->connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, $socket);
		if (mysqli_connect_errno()) {
			log_error('Failed to connect to MySQL: ' . mysqli_connect_error());
		}
		$this->connection->set_charset(DB_CHARSET);
	}
	function disconnect() {
		mysqli_close($this->connection);
	}
	function get_param_type($value) {
		if(is_int($value)) {
			return "i";
		} else if (is_double($value)) {
			return "d";
		} else if (is_string($value)) {
			return "s";
		} else if (is_bool($value)) {
			return "b";
		} else if ($value == null) {
			return "s";
		}
	}
	function bind_param($stmt, $params) {
		$types = "";
		$param_keys = [];
		foreach($params as $key => $value) {
			$param_keys[] = $value;
			$types .= $this->get_param_type($value);
		}
		$stmt->bind_param($types, ...$param_keys);
	}
	function get_result($stmt) {
		if(!$stmt->execute()) {
			log_error($stmt->error);
		}
		if(!$result = $stmt->get_result()) {
			log_error($stmt->error);
		}
		$stmt->close();
		$rows = [];
		while ($row = $result->fetch_assoc()) {
			$rows[] = $row;
		}
		return $rows;
	}
	function get_single($stmt) {
		$rows = $this->get_result($stmt);
		if(sizeof($rows) > 0){
			return $rows[0];
		} else {
			return null;
		}
	}
	function execute($stmt) {
		if(!$stmt->execute()) {
			log_error($stmt->error);
		}
		$stmt->close();
	}
	function prepare($sql) {
		$connection = $this->connection;
		$stmt = $connection->prepare($sql);
		if($stmt === false) {
			log_error('Wrong SQL: ' . $sql . ' Error: ' . $connection->errno . ' ' . $connection->error, E_USER_ERROR);
		}
		return $stmt;
	}
	function prepare_and_bind($sql, $params = null) {
		$stmt = $this->prepare($sql);
		if($params != null) {
			$this->bind_param($stmt, $params);
		}
		return $stmt;
	}
	function prepare_and_get_result($sql, $params = null) {
		$stmt = $this->prepare_and_bind($sql, $params);
		return $this->get_result($stmt);
	}
	function prepare_and_get_single($sql, $params = null) {
		$stmt = $this->prepare_and_bind($sql, $params);
		return $this->get_single($stmt);
	}
	function prepare_and_execute($sql, $params = null) {
		$stmt = $this->prepare_and_bind($sql, $params);
		$this->execute($stmt);
	}
	/* Operations */
	function create($table, $params) {
		if(sizeof($params) == 0) {
			return false;
		}
		$sql = "insert into ".$table." (";
		foreach($params as $key => $value) {
			if($notfirst) {
				$sql .= ", ";
			} else {
				$notfirst = true;
			}
			$sql .= "`".$key."`";
		}
		$sql .= ") values(";
		$notfirst = false;
		foreach($params as $key => $value) {
			if($notfirst) {
				$sql .= ", ";
			} else {
				$notfirst = true;
			}
			$sql .= "?";
		}
		$sql .= ");";
		$this->prepare_and_execute($sql, $params);
		return true;
	}
	function read($table, $id) {
		return $this->prepare_and_get_single("select * from ".$table." where id = ?", ["id" => $id]);
	}
	function update($table, $id, $params) {
		if(sizeof($params) == 0) {
			return false;
		}
		$sql = "update ".$table." set ";
		foreach($params as $key => $value) {
			if($notfirst) {
				$sql .= ", ";
			} else {
				$notfirst = true;
			}
			$sql .= "`".$key."` = ?";
		}
		$sql .= " where id = ?;";
		$params["id"] = $id;
		$this->prepare_and_execute($sql, $params);
		return true;
	}
	function delete($table, $id) {
		$this->prepare_and_execute("delete from ".$table." where id = ?;", ["id" => $id]);
		return true;
	}

	/* Episodes */
	function update_episode($id, $params) {
		return $this->update("episodes", $id, $params);
	}
	function list_progress_episodes() {
		$rows = $this->prepare_and_get_result(
			"select
				(select count(*) from issues where episode_id = episodes.id) as issues_total,
				episodes.*, arcs.id as arc_id, arcs.title as arc_title, arcs.chapters as arc_chapters,
				arcs.episodes as arc_episodes, arcs.completed as arc_completed, arcs.resolution as arc_resolution,
				arcs.torrent_hash as arc_torrent_hash, arcs.released as arc_released
			from episodes
			right join arcs on arcs.id = episodes.arc_id
			left join issues on issues.episode_id = episodes.id
			where arcs.hidden = false and episodes.hidden = false and (episodes.released_date is null or episodes.released_date > now())
			group by episodes.id
			;"
		);
		$data = [];
		$arc_id = -1;
		foreach($rows as $row) {
			if($arc_id != $row['arc_id']) {
				$arc_id = $row['arc_id'];
				$data['arcs'][] = [
					'id' => $row['arc_id'],
					'title' => $row['arc_title'],
					'chapters' => $row['arc_chapters']
				];
			}
			$data['episodes'][] = [
				'id' => $row['id'],
				"crc32" => $row["crc32"],
				"arc_id" => $row['arc_id'],
				'part' => $row['part'],
				'title' => $row['title'],
				'chapters' => $row['chapters'],
				"episodes" => $row["episodes"],
				"resolution" => $row["resolution"],
				"torrent_hash" => $row["torrent_hash"],
				"hidden" => $row['hidden'],
				"status" => $row['status'],
				"released_date" => $row['released_date'] == null ? '' : $row['released_date'],
				"issues_total" => $row['issues_total']
			];
		}
		function natcmpchapters($a, $b) {
			return strnatcmp($a['chapters'], $b['chapters']);
		}
		function natcmpchaptersreverse($a, $b) {
			return strnatcmp($b['chapters'], $a['chapters']);
		}
		usort($data['arcs'], "natcmpchaptersreverse");
		usort($data['episodes'], 'natcmpchapters');
		for($i = 0; $i < sizeof($data['arcs']); $i++) {
			$arc = $data['arcs'][$i];
			if($arc['chapters'] == null) {
				unset($data['arcs'][$i]);
				$data['arcs'][] = $arc;
				$data['arcs'] = array_values($data['arcs']);
			}
		}
		return $data;
	}

	/* Users */
	function create_user($params) {
		return $this->create("users", $params);
	}

	/* Issues */
	function create_issue($params) {
		return $this->create("issues", $params);
	}
	function read_issue($id) {
		return $this->read("issues", $id);
	}
	function delete_issue($id) {
		return $this->delete("issues", $id);
	}
	function list_issues($episode_id) {
		$rows = $this->prepare_and_get_result(
			"select issues.*, episodes.id as episode_id from issues"
			." left join episodes on episodes.id = issues.episode_id"
			." where episodes.id = ? and episodes.hidden = false and (episodes.released_date is null or episodes.released_date > now())"
			.";", ["episode_id" => $episode_id]
		);
		$data = ["issues" => []];
		foreach($rows as $row) {
			$data["issues"][] = [
				"id" => $row["id"],
				"episode_id" => $row["episode_id"],
				"description" => $row["description"],
				"createdby" => $row["createdby"],
				"createddate" => $row["createddate"]
			];
		}
		return $data;
	}
}
