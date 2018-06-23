<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'logger.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'], 1, $user)){
	http_response_code(400);
} else {
	$context->connect();
	$stmt = $context->prepare("insert into issues (`createddate`, `createdby`, `description`, `status`) values(?, ?, ?, ?);");
	$stmt->bind_param('dssd', time(), $user["name"], $_GET["description"], 0);
	$context->execute($stmt);
	$episodes = $context->list_progress_episodes();
	$context->disconnect();
	echo json_encode($episodes);
}
?>
