<?php
require_once 'db_context.php';
require_once 'torrent_utils.php';
include_once 'secure_indexer.php';

$limit = scr_value($_GET, 'limit');
if($limit == null) {
    http_response_code(400);
}

$context = new db_context();
$context->connect();
$rows = $context->query("select".
    "`episodes`.`id`,".
    "`episodes`.`title`,".
    "`episodes`.`chapters`,".
    "`scheduled_for`,".
    "`status`".
    "from `episodes`".
    "right join `arcs` on `arcs`.`id` = `episodes`.`arc_id` and `arcs`.`hidden` is false ".
    "where `episodes`.`scheduled_for` > now() ".
    "order by `episodes`.`scheduled_for`, `chapters`, `title` ".
    "limit ?;", $limit, 'd');
$context->disconnect();
$data = [];

if(sizeof($rows) > 0) {
    foreach($rows as $row) {
        $data[] = [
            'id' => scr_value($row, 'id'),
            'chapters' => scr_value($row, 'chapters'),
            'scheduled_for' => scr_value($row, 'scheduled_for'),
            'title' => scr_value($row, 'title'),
            'status' => scr_value($row, 'status')
        ];
    }
    header('Content-Type: application/json; charset=utf-8;');
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT| JSON_HEX_APOS);
} else {
    http_response_code(400);
}
?>
