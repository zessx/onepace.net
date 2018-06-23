<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_POST['token'], 2, $user)){
	http_response_code(400);
} else {
	$context->connect();
	$stmt = $context->prepare("delete from episodes where id = ?;");
	$stmt->bind_param('d', $_POST['id']);
	$context->execute($stmt);
	$episodes = $context->list_progress_episodes();
	$context->disconnect();
	echo json_encode($episodes);
}
?>
