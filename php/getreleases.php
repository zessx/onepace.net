<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'torrent_utils.php';
include_once 'string_utils.php';
include_once 'secure_indexer.php';
$torrents = TorrentUtils::getTorrents();
$context = new db_context();
$context->connect();
$stmt = $context->prepare(
    "select episodes.crc32, episodes.torrent_hash, episodes.released_date, arcs.torrent_hash as arc_torrent_hash from episodes"
    ." right join arcs on arcs.id = episodes.arc_id "
    ." where"
    ." arcs.hidden = false"
    ." and episodes.released_date is not null and episodes.released_date <= now()"
    ." group by arc_torrent_hash, torrent_hash"
.";");
$rows = $context->get_result($stmt);
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
    $createddate = strtotime($row['released_date']);
    $created = date('Y-m-d H:i:s', $createddate);
    $interval = (new DateTime())->diff(new DateTime($created));
    $days = $interval->days;
    $data["releases"][] = [
        'crc32' => scr_value($row, 'crc32'),
        'name' => $torrent['display_name'],
        'magnet' => $torrent['magnet'],
        'torrent' => "/torrents/" . $torrent['torrent_name'],
        'createddate' => $createddate,
        'ageDays' => $days,
    ];
}
function usortf($a, $b) {
    return $a['createddate'] < $b['createddate'];
}
usort($data['releases'], "usortf");
echo json_encode($data);
?>
