<?php
require_once 'db_context.php';
require_once 'config.php';
require_once 'Utils.php';
include_once 'logger.php';

$user = Utils::verify($context, $_POST['token'], 4);
$token = sha1(time() . SALT);
$password = sha1($_POST['password'] . strtolower($_POST['name']) . SALT);
$context->connect();
$context->create_user([
	"name" => $_POST["name"],
	"role" => $_POST["role"],
	"password" => $password,
	"token" => $token
]);
$context->disconnect();
Utils::echo_json([]);
?>
