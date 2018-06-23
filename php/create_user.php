<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'logger.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'], 2, $user)){
	http_response_code(400);
} else {
	$token = sha1(time() . SALT);
	$password = sha1($_GET['password'] . SALT);
	$context->connect();
	$stmt = $context->prepare("insert into users (`name`, `role`, `password`, `token`) values(?, ?, ?, ?);");
	$stmt->bind_param('sdss', $_GET["name"], $_GET['role'], $password, $token);
	$context->execute($stmt);
	$context->disconnect();
	http_response_code(200);
}
?>
