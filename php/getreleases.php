<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'torrent_utils.php';
include_once 'string_utils.php';
include_once 'secure_indexer.php';
$torrents = TorrentUtils::getTorrents();
$context = new db_context();
$context->connect();
$rows = $context->query(
    "select episodes.crc32, episodes.torrent_hash from episodes"
    ." right join arcs on arcs.id = episodes.arc_id "
    ." where"
    ." arcs.hidden = false"
    ." and episodes.is_released = 1"
    ." and ((episodes.scheduled_for is null or episodes.scheduled_for <= CURDATE())"
    ." and (episodes.deprecated_on is null or episodes.deprecated_on > CURDATE()))"
    ." order by episodes.id desc"
.";");
$context->disconnect();
$data = [];
foreach($rows as $row) {
    $torrent = TorrentUtils::findTorrent($torrents, scr_value($row, 'torrent_hash'));
    if($torrent == null) {
        continue;
    }
    $data["releases"][] = [
        'crc32' => scr_value($row, 'crc32'),
        'name' => $torrent['display_name'],
        'magnet' => $torrent['magnet'],
        'torrent' => "/torrents/" . $torrent['torrent_name'],
    ];
}
echo json_encode($data);
?>
