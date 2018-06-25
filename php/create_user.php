<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'logger.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'], 4, $user)) {
	http_response_code(400);
} else {
	$token = sha1(time() . SALT);
	$password = sha1($_GET['password'] . strtolower($_GET['name']) . SALT);
	$context->connect();
	$context->create_user([
		"name" => $_GET["name"],
		"role" => $_GET["role"],
		"password" => $password,
		"token" => $token
	]);
	$context->disconnect();
	echo '{}';
}
?>
