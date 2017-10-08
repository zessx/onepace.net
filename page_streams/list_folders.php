<?php
require_once 'config.php';
$query = "https://api.openload.co/1/file/listfolder?login=" . API_LOGIN . "&key=" . API_KEY . (isset($_GET['folder_id']) ? "&folder={$_GET['folder_id']}" : "");

$response = json_decode(file_get_contents($query), true);

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
?>