<?php
require_once 'mysql_utils.php';
connect();
$q_result = run_query("call get_arcs()");
disconnect();
$rows = get_rows_from_result($q_result);
$data = array_values($rows);

function usortchapters($a, $b) {
    return strnatcmp($a['chapters'], $b['chapters']);
}
usort($data,"usortchapters");

header('Content-Type: application/json; charset=utf-8;');
echo json_encode($data, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT| JSON_HEX_APOS);
?>