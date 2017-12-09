<?php
require_once 'mysqli_utils.php';
require_once 'torrent_utils.php';
include_once 'string_utils.php';

$torrents = TorrentUtils::getTorrents();

$data = [];

$rows = run_mysqli_query("call get_all()");

$arc_i = -1;
$episode_i = -1;
foreach($rows as $row) {
    if($arc_id != $row['arc_id']) {
        $arc_id = $row['arc_id'];
        
        $data['arcs'][] = [
            'id' => $row['arc_id'],
            'title' => $row['arc_title'],
            'chapters' => $row['arc_chapters'],
            'episodes' => [],
			'completed' => $row['arc_completed'] == 1 ? true : false
        ];
        
        $arc_i++;
        $episode_i = -1;
        
        $torrent = TorrentUtils::findTorrent($torrents, $row['arc_torrent_hash']);
        if($torrent != null) {
            $data['arcs'][$arc_i]['torrent'] = $torrent;
        }
    }
    
    $chapter_count = sizeof(parts_to_ints($row['chapters']));
    $episode_count = sizeof(parts_to_ints($row['episodes']));
    $toei_seconds = $episode_count * 18 * 60;
    $seconds = $row['seconds'];
    $saved_seconds = $toei_seconds > $seconds ? $toei_seconds - $seconds : 0;

    $data['arcs'][$arc_i]['episodes'][] = [
        'crc32' => $row['crc32'],
		'resolution' => $row['resolution'],
        'title' => $row['title'],
        'chapters' => $row['chapters'],
        'chapter_count' => $chapter_count,
        'episodes' => $row['episodes'],
        'episode_count' => $episode_count,
        'stream_id' => $row['stream_id'],
        'seconds' => $seconds,
        'saved_seconds' => $saved_seconds
    ];
    $episode_i++;
    
    $torrent = TorrentUtils::findTorrent($torrents, $row['torrent_hash']);
    if($torrent != null) {
        $data['arcs'][$arc_i]['episodes'][$episode_i]['torrent'] = $torrent;
    }
}
function usortarcs($a, $b) {
    return strnatcmp($a['chapters'], $b['chapters']);
}
usort($data['arcs'], "usortarcs");

for($i = 0; $i < sizeof($data['arcs']); $i++) {
    $arc = $data['arcs'][$i];
    if($arc['chapters'] == null) {
        unset($data['arcs'][$i]);
        $data['arcs'][] = $arc;
        $data['arcs'] = array_values($data['arcs']);
    } else {
        $saved_seconds = 0;
        foreach($arc['episodes'] as $episode) {
            $saved_seconds += $episode['saved_seconds'];
        }

        $data['arcs'][$i]['saved_seconds'] = $saved_seconds;
    }
}



header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);
?>