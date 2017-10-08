<?php
require_once 'mysqli_utils.php';
require_once 'torrent_utils.php';

$rows = run_mysqli_query("call get_arc('{$_GET['torrent_hash']}')");

$torrents = TorrentUtils::getTorrents();
$data = [];
if(sizeof($rows) > 0) {
    $data = [
        'id' => $rows[0]['id'],
        'title' => $rows[0]['title'],
        'chapters' => $rows[0]['chapters'],
        'episodes' => $rows[0]['episodes'],
        'resolution' => $rows[0]['resolution']
    ];
    
    $torrent = TorrentUtils::findTorrent($torrents, $rows[0]['torrent_hash']);
    if($torrent != null) {
        $data['torrent'] = $torrent;
    }
    
    header('Content-Type: application/json; charset=utf-8;');
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT| JSON_HEX_APOS);
} else {
    http_response_code(400);
}
?>