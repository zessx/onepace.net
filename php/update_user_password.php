<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'secure_indexer.php';
$context = new db_context();
$old_password = sha1($_GET['oldpassword'] . SALT);
if(!Authenticator::authenticate($context, $_GET['token'], 0, $user) || !Authenticator::verify_password($context, $_GET['token'], $old_password)){
	http_response_code(400);
} else {
	$password = sha1($_GET['newpassword'] . SALT);
	$context->connect();
	$stmt = $context->prepare("update users set password=? where id=?;");
	$stmt->bind_param('sd', $password, $user['id']);
	$context->execute($stmt);
	$episodes = $context->list_progress_episodes();
	$context->disconnect();
	echo json_encode($episodes);
}
?>
