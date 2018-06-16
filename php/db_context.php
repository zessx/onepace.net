<?php
include_once 'config.php';
include_once 'logger.php';

class db_context {
    private $connection;
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
    function query($sql, $params = null, $param_types = null) {
        $connection = $this->connection;
        if($params != null && $param_types != null) {
            $stmt = $connection->prepare($sql);
            if($stmt === false) {
                log_error('Wrong SQL: ' . $sql . ' Error: ' . $connection->errno . ' ' . $connection->error, E_USER_ERROR);
            }
            $a_params = [];
            $a_params[] = &$param_types;
            foreach ($params as $p) {
                $a_params[] = &$p;
            }
            call_user_func_array(array($stmt, 'bind_param'), $a_params);
            if(!$stmt->execute()) {
                log_error($stmt->error);
            }
            if(!$result = $stmt->get_result()) {
                log_error($stmt->error);
            }
            $stmt->close();
        } else if (!$result = mysqli_query($connection, $sql)) {
            log_error("Error description: " . mysqli_error($connection));
        }
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }
    function prepare($sql) {
        $connection = $this->connection;
        $stmt = $connection->prepare($sql);
        if($stmt === false) {
            log_error('Wrong SQL: ' . $sql . ' Error: ' . $connection->errno . ' ' . $connection->error, E_USER_ERROR);
        }
        return $stmt;
    }
    function execute($stmt) {
        if(!$stmt->execute()) {
            log_error($stmt->error);
        }
        $stmt->close();
		}
		function natcmpchapters($a, $b) {
			return strnatcmp($a['chapters'], $b['chapters']);
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
		function list_progress_episodes() {
			$stmt = $this->prepare(
				"select episodes.*"
				.", arcs.id as arc_id, arcs.title as arc_title, arcs.chapters as arc_chapters, arcs.episodes as arc_episodes, arcs.completed as arc_completed"
				.", arcs.resolution as arc_resolution, arcs.torrent_hash as arc_torrent_hash, arcs.released as arc_released"
				." from episodes right join arcs on arcs.id = episodes.arc_id where arcs.hidden = false;"
			);
			$rows = $this->get_result($stmt);
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
					"arc_id" => $row['arc_id'],
					'part' => $row['part'],
					'title' => $row['title'],
					'chapters' => $row['chapters'],
					"released_date" => $row['released_date'],
				];
			}
			usort($data['arcs'], "natcmpchapters");
			usort($data['episodes'], 'natcmpchapters');
			for($i = 0; $i < sizeof($data['arcs']); $i++) { // This does something
				$arc = $data['arcs'][$i];
				if($arc['chapters'] == null) {
					unset($data['arcs'][$i]);
					$data['arcs'][] = $arc;
					$data['arcs'] = array_values($data['arcs']);
				}
			}
			echo json_encode($data);
		}
}
