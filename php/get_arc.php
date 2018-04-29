<?php
require_once 'db_context.php';
require_once 'torrent_utils.php';
include_once 'secure_indexer.php';

$torrent_hash = $_GET['torrent_hash'];

$context = new db_context();
$context->connect();
$rows = $context-query("select `arcs`.* from `arcs` where `arcs`.`torrent_hash` = ? and `arcs`.`hidden` is false;", $torrent_hash, 's');
$context->disconnect();

$torrents = TorrentUtils::getTorrents();
$data = [];
if(sizeof($rows) > 0) {
    $row = $rows[0];
    $data = [
        'id' => scr_value($row, 'id'),
        'title' => scr_value($row, 'title'),
        'chapters' => scr_value($row, 'chapters'),
        'episodes' => scr_value($row, 'episodes'),
        'resolution' => scr_value($row, 'resolution')
    ];
    
    $torrent = TorrentUtils::findTorrent($torrents, scr_value($row, 'torrent_hash'));
    if($torrent != null) {
        $data['torrent'] = $torrent;
    }
    
    header('Content-Type: application/json; charset=utf-8;');
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT| JSON_HEX_APOS);
} else {
    http_response_code(400);
}
?>
