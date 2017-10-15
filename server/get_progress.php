<?php
include_once 'mysqli_utils.php';
include_once 'string_utils.php';

$rows = run_mysqli_query("select chapters from onepace_episodes");
$maxchapters = run_mysqli_query("select chapters from constants")[0]['chapters'];
$chapters = [];

if(sizeof($rows) > 0) {
    foreach($rows as $row) {
        $parts = parts_to_ints($row['chapters']);
        $chapters = array_merge($parts, $chapters);
    }
    $chapters = array_unique($chapters);
    natsort($chapters);
    
    $data = [];
    for($i = 0; $i <= $maxchapters; $i++) {
        if(in_array($i, $chapters)) {
            $data[] = [
                'chapter' => $i,
                'is_progress' => true
            ];
        } else {
            $data[] = [
                'chapter' => $i,
                'is_progress' => false
            ];
        }
    }
    
    header('Content-Type: application/json; charset=utf-8;');
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT| JSON_HEX_APOS);
} else {
    http_response_code(400);
}
?>