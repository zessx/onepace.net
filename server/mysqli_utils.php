<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';
function run_mysqli_query($sql) {
    if(strpos($sql, ';') !== false) {
        throw new Exception("Character ';' not allowed.");
    } else {
        $connection = new mysqli(DB_HOST_NOPORT, DB_USER, DB_PASSWORD, DB_NAME, 0, DB_SOCKET);
        if(!$result = $connection->query($sql)) {
            die('There was an error running the query [' . $db->error . ']');
        }
        
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        return $data;
    }
}
?>