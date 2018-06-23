<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'], 1)){
	http_response_code(400);
} else {
	$context->connect();
	$stmt = $context->prepare("update issues set description=?, status=? where id=?;");
	$stmt->bind_param('sdd', $_GET['description'], $_GET['status'], $_GET['id']);
	$context->execute($stmt);
	$episodes = $context->list_progress_episodes();
	$context->disconnect();
	echo json_encode($episodes);
}
?>
