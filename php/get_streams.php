<?php
require_once 'db_context.php';
require_once 'torrent_utils.php';
include_once 'string_utils.php';
include_once 'secure_indexer.php';

$torrents = TorrentUtils::getTorrents();

$data = [];

$context = new db_context();
$context->connect();
$rows = $context->query("select episodes.id,".
"episodes.crc32,".
"episodes.resolution,".
"episodes.title,".
"episodes.chapters,".
"episodes.episodes,".
"episodes.stream_id,".
"episodes.torrent_hash,".
"episodes.is_released,".
"episodes.status,".
"arcs.id as arc_id,".
"arcs.title as arc_title,".
"arcs.chapters as arc_chapters,".
"arcs.completed as arc_completed,".
"arcs.torrent_hash as arc_torrent_hash ".
"from episodes ".
"right join arcs on arcs.id = episodes.arc_id ".
"where arcs.hidden = false and ((episodes.scheduled_for is null or episodes.scheduled_for <= CURDATE()) and (episodes.deprecated_on is null or episodes.deprecated_on > CURDATE()));");
$context->disconnect();

$arc_i = -1;
$episode_i = -1;
$arc_id = -1;
foreach($rows as $row) {
    if($arc_id != scr_value($row, 'arc_id')) {
        $arc_id = scr_value($row, 'arc_id');
        
        $data['arcs'][] = [
            'id' => scr_value($row, 'arc_id'),
            'title' => scr_value($row, 'arc_title'),
            'chapters' => scr_value($row, 'arc_chapters'),
            'episodes' => [],
            'completed' => scr_value($row, 'arc_completed') == 1 ? true : false
        ];
        
        $arc_i++;
        $episode_i = -1;
        
        $torrent = TorrentUtils::findTorrent($torrents, scr_value($row, 'arc_torrent_hash'));
        if($torrent != null) {
            $data['arcs'][$arc_i]['torrent'] = $torrent;
        }
    }
    
    $data['arcs'][$arc_i]['episodes'][] = [
        'id' => scr_value($row, 'id'),
        'crc32' => scr_value($row, 'crc32'),
        'resolution' => scr_value($row, 'resolution'),
        'title' => scr_value($row, 'title'),
        'chapters' => scr_value($row, 'chapters'),
        'episodes' => scr_value($row, 'episodes'),
        'stream_id' => scr_value($row, 'stream_id'),
        'isReleased' => scr_value($row, 'is_released') == 1,
        'status' => scr_value($row, 'status')
    ];
    $episode_i++;
    
    $torrent = TorrentUtils::findTorrent($torrents, scr_value($row, 'torrent_hash'));
    if($torrent != null) {
        $data['arcs'][$arc_i]['episodes'][$episode_i]['torrent'] = $torrent;
    }
}

function usortchapters($a, $b) {
    return strnatcmp($a['chapters'], $b['chapters']);
}
usort($data['arcs'], "usortchapters");

for($i = 0; $i < sizeof($data['arcs']); $i++) {
    $arc = $data['arcs'][$i];
    if($arc['chapters'] == null) {
        unset($data['arcs'][$i]);
        $data['arcs'][] = $arc;
        $data['arcs'] = array_values($data['arcs']);
    }

    usort($data['arcs'][$i]['episodes'], 'usortchapters');
}

header('Content-Type: application/json; charset=utf-8;');
echo json_encode($data);
?>
