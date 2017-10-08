<?php
require_once 'mysqli_utils.php';

$streams = run_mysqli_query("call get_streams()");

$data = ['arcs' => []];
$arc_i = -1;
if(sizeof($streams) > 0) {
   foreach($streams as $stream) {
       if($stream['arc_id'] != $arc_id) {
           $arc_id = $stream['arc_id'];
           $data['arcs'][] = [
                'id' => (int)$stream['arc_id'],
                'title' => $stream['arc_title'],
                'chapters' => $stream['arc_chapters'],
                'episodes' => []
            ];
           
            $arc_i += 1;
        }
       
        $data['arcs'][$arc_i]['episodes'][] = [
            'crc32' => $stream['crc32'],
            'stream_id' => $stream['stream_id'],
            'title' => $stream['title'],
			'resolution' => $stream['resolution'],
            'part_number' => isset($stream['part_number']) ? (int)$stream['part_number'] : null
       ];
    }
}

function usortchapters($a, $b) {
    return strnatcmp($a['chapters'], $b['chapters']);
}
usort($data['arcs'], "usortchapters");

function usortpartnumber($a, $b) {
    return strnatcmp($a['part_number'], $b['part_number']);
}
foreach($data['arcs'] as &$a) {
    usort($a['episodes'], "usortpartnumber");
}


header('Content-Type: application/json; charset=utf-8;');
echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT | JSON_HEX_APOS);
?>