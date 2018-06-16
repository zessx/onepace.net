<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
$token = $_POST['token'];
$context = new db_context();
$context->connect();
$statement = $context->prepare("select * from users where token = ?;");
$statement->bind_param('s', $token);
$rows = $context->get_result($statement);
$context->disconnect();
if(sizeof($rows) > 0) {
	echo json_encode([
		"name" => $rows[0]["name"]
	]);
} else {
	http_response_code(400);
}
?>
