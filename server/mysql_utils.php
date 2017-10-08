<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';
function connect() {
    mysql_connect(DB_HOST,DB_USER,DB_PASSWORD)or die('Could not connect. ' . mysql_error());
    mysql_select_db(DB_NAME)or die('Could not select DB');
    mysql_set_charset("utf8");
}
function disconnect() {
    mysql_close();
}
function get_max_of_column_from_table($table_name,$column_name) {
    return mysql_fetch_row( run_query("select max($column_name) from $table_name") )[0];
}
function run_query($query_str) {
    if(strpos($query_str, ';') !== false) {
        throw new Exception("Character ';' not allowed.");
    } else {
        $result = mysql_query($query_str);
        if($result !== false) {
            return $result;
        } else {
            throw new Exception('Invalid query: ' . mysql_error());
        }
    }
}
function get_rows_from_result($result) {
    $rows = array();
    while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $rows[] = $row;
    }
    return $rows;
}
function get_columns_from_rows($rows, $column) {
    $arr = array();
    foreach($rows as $row) {
        $arr[] = $row[$column];
    }
    return $arr;
}
?>