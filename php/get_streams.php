<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
include_once 'string_utils.php';
include_once 'secure_indexer.php';
include_once 'torrent_utils.php';
$torrents = TorrentUtils::getTorrents();
$context = new db_context();
$context->connect();
$stmt = $context->prepare("select episodes.id,".
"episodes.crc32,".
"episodes.resolution,".
"episodes.title,".
"episodes.chapters,".
"episodes.episodes,".
"episodes.torrent_hash,".
"episodes.released_date,".
"episodes.part,episodes.openload,".
"episodes.status,".
"arcs.id as arc_id,".
"arcs.title as arc_title,".
"arcs.chapters as arc_chapters,".
"arcs.episodes as arc_episodes,".
"arcs.completed as arc_completed,".
"arcs.resolution as arc_resolution,".
"arcs.torrent_hash as arc_torrent_hash,".
"arcs.released as arc_released ".
"from episodes ".
"right join arcs on arcs.id = episodes.arc_id ".
"where arcs.hidden = false;");
$rows = $context->get_result($stmt);
$context->disconnect();
$data = [];
$arc_id = -1;
foreach($rows as $row) {
	if($arc_id != scr_value($row, 'arc_id')) {
		$arc_torrent = TorrentUtils::findTorrent($torrents, $row['arc_torrent_hash']);
		$arc_id = scr_value($row, 'arc_id');
		$data['arcs'][] = [
			'id' => scr_value($row, 'arc_id'),
			'title' => scr_value($row, 'arc_title'),
			'chapters' => scr_value($row, 'arc_chapters'),
			'resolution' => scr_value($row, 'arc_resolution'),
			"released" => scr_value($row, "arc_released") == 1,
			"episodes" => scr_value($row, "arc_episodes"),
			'torrent' => $arc_torrent
		];
	}
	$is_released = isset($row["released_date"]) && strtotime($row["released_date"]) <= time();

	// Set the episode object
	$torrent = TorrentUtils::findTorrent($torrents, $row['torrent_hash']);
	$data['episodes'][] = [
		'id' => scr_value($row, 'id'),
		'crc32' => $is_released ? scr_value($row, 'crc32') : "",
		'resolution' => scr_value($row, 'resolution'),
		'title' => scr_value($row, 'title'),
		'chapters' => scr_value($row, 'chapters'),
		"episodes" => scr_value($row, "episodes"),
		"isReleased" => $is_released,
		'status' => scr_value($row, 'status'),
		'part' => scr_value($row, 'part'),
		'arcId' => scr_value($row, 'arc_id'),
		'torrent' => $torrent
	];
}
function usortchapters($a, $b) {
	return strnatcmp($a['chapters'], $b['chapters']);
}
usort($data['arcs'], "usortchapters");
usort($data['episodes'], 'usortchapters');
for($i = 0; $i < sizeof($data['arcs']); $i++) {
	$arc = $data['arcs'][$i];
	if($arc['chapters'] == null) {
		unset($data['arcs'][$i]);
		$data['arcs'][] = $arc;
		$data['arcs'] = array_values($data['arcs']);
	}
}
echo json_encode($data);
?>
