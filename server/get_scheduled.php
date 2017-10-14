<?php
require_once 'mysqli_utils.php';
require_once 'torrent_utils.php';

class get_scheduled {
    public static function echo_json() {
        $data = get_data();
        if(sizeof($data) > 0) {
            header('Content-Type: application/json; charset=utf-8;');
            echo json_encode($data, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT| JSON_HEX_APOS);
        } else {
            http_response_code(400);
        }
    }
    public static function get_data($limit) {
        $rows = run_mysqli_query("call get_scheduled('{$limit}')");
        $data = [];
        
        if(sizeof($rows) > 0) {
            foreach($rows as $row) {
                $data[] = [
                    'id' => $row['id'],
                    'chapters' => $row['chapters'],
                    'scheduled_for' => $row['scheduled_for'],
                    'title' => $row['title'],
                    'status' => $row['status']
                ];
            }
        }

        return $data;
    }
}
?>