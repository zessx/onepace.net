<?php
require_once 'mysql_utils.php';
connect();
$q_result = run_query("call get_episodes({$_GET['arc']})");
disconnect();
$rows = get_rows_from_result($q_result);

$data = array(
    'arc' => array(),
    'episodes' => array()
);
if(sizeof($rows) > 0) {
    $data['arc'] = array(
        'id' => $rows[0]['arc_id'],
        'title' => $rows[0]['arc_title']
    );
    foreach($rows as $row) {
        $data['episodes'][] = array(
            'id' => $row['crc32'],
            'title' => $row['title'],
            'arc_id' => $row['arc_id'],
            'part_number' => $row['part_number'],
            'stream_id' => $row['stream_id'],
            'nyaa_id' => $row['nyaa_id'],
            'torrent_hash' => $row['torrent_hash'],
            'scheduled_for' => $row['scheduled_for']
        );
    }
}

header('Content-Type: application/json; charset=utf-8;');
echo json_encode($data, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT| JSON_HEX_APOS);
?>