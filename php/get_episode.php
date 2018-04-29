<?php
require_once 'mysqli_utils.php';
require_once 'torrent_utils.php';

$rows = run_mysqli_query("call get_episode('{$_GET['crc32']}')");

$torrents = TorrentUtils::getTorrents();
$data = [];
if(sizeof($rows) > 0) {
    $row = $rows[0];
    $data = [
        'crc32' => $row['crc32'],
        'title' => $row['title'],
        'arc_id' => $row['arc_id'],
        'arc_title' => $row['arc_title'],
        'part_number' => $row['part_number'],
        'stream_id' => $row['stream_id'],
        'nyaa_id' => $row['nyaa_id'],
        'crc32' => $row['crc32'],
        'scheduled_for' => $row['scheduled_for'],
        'resolution' => $row['resolution'],
        'chapters' => $row['chapters'],
        'episodes' => $row['episodes']
    ];
    
    $torrent = TorrentUtils::findTorrent($torrents, $row['torrent_hash']);
    if($torrent != null) {
        $data['torrent'] = $torrent;
    }

    $arc_torrent = TorrentUtils::findTorrent($torrents, $row['arc_torrent_hash']);
    if($arc_torrent != null) {
        $data['arc_torrent'] = $arc_torrent;
    }
    
    header('Content-Type: application/json; charset=utf-8;');
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT| JSON_HEX_APOS);
} else {
    http_response_code(400);
}
?>