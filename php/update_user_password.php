<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'secure_indexer.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'], 0, $user)) {
	http_response_code(400);
	exit();
}
$old_password = sha1($_GET['oldpassword'] . strtolower($user["name"]) . SALT);
if(!Authenticator::verify_password($context, $_GET['token'], $old_password)) {
	http_response_code(400);
	exit();
} else {
	$password = sha1($_GET['newpassword'] . strtolower($user["name"]) . SALT);
	$context->connect();
	$stmt = $context->prepare("update users set password=? where id=?;");
	$stmt->bind_param('sd', $password, $user['id']);
	$context->execute($stmt);
	$episodes = $context->list_progress_episodes($user);
	$context->disconnect();
	echo json_encode($episodes);
}
?>
