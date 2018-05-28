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
    "select episodes.crc32, episodes.torrent_hash, arcs.torrent_hash as arc_torrent_hash from episodes"
    ." right join arcs on arcs.id = episodes.arc_id "
    ." where"
    ." arcs.hidden = false"
    ." and episodes.is_released = 1"
    ." and ((episodes.scheduled_for is null or episodes.scheduled_for <= CURDATE())"
    ." and (episodes.deprecated_on is null or episodes.deprecated_on > CURDATE()))"
    ." group by arc_torrent_hash, torrent_hash"
.";");
$context->disconnect();
$data = [];
$torrent_hashes = [];
foreach($rows as $row) {
    $hash = scr_value($row, 'torrent_hash');
    $arc_hash = scr_value($row, 'arc_torrent_hash');
    if (isset($torrent_hashes[$hash]) || isset($torrent_hashes[$arc_hash])) {
        continue;
    }
    $torrent = TorrentUtils::findTorrent($torrents, $hash);
    if($torrent == null) {
        $hash = scr_value($row, 'arc_torrent_hash');
        $torrent = TorrentUtils::findTorrent($torrents, $hash);
        if($torrent == null) {
            continue;
        }
    }
    $torrent_hashes[$hash] = $torrent;
    $data["releases"][] = [
        'crc32' => scr_value($row, 'crc32'),
        'name' => $torrent['display_name'],
        'magnet' => $torrent['magnet'],
        'torrent' => "/torrents/" . $torrent['torrent_name'],
        'createddate' => $torrent['created_raw'],
        'ageDays' => $torrent['age_days'],
    ];
}
function usortf($a, $b) {
    return $a['createddate'] < $b['createddate'];
}
usort($data['releases'], "usortf");
echo json_encode($data);
?>
