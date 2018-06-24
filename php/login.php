<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
$name = strtolower($_GET['name']);
$pass = $_GET['password'];
$pass_hashed = sha1($pass . SALT);
$context = new db_context();
$context->connect();
$statement = $context->prepare("select * from users where lower(name) = ? and password = ?;");
$statement->bind_param('ss', $name, $pass_hashed);
$rows = $context->get_result($statement);
$context->disconnect();

if(sizeof($rows) > 0) {
	$user = $rows[0];
	$token = sha1(time() . SALT);
	$context->connect();
	$stmt = $context->prepare("update users set token = '" . $token . "' where id = " . $user["id"] . ";");
	$context->execute($stmt);
	$context->disconnect();
	echo json_encode([
		"id" => $user["id"],
		"role" => $user["role"],
		"name" => $user["name"],
		"token" => $token
	]);
} else {
	http_response_code(400);
}
?>
