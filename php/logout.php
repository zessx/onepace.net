<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
$context = new db_context();
if (!Authenticator::authenticate($context, $_GET['token'], 1, $user)) {
	http_response_code(400);
} else {
	$context->connect();
	$stmt = $context->update_user($user['id'], ['token' => '']);
	$episodes = $context->list_progress_episodes(null);
	$context->disconnect();
	echo json_encode($episodes);
}
?>
