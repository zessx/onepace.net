<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'logger.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'], 1, $user)) {
	http_response_code(400);
} else {
	$context->connect();
	$context->create_issue([
		"createddate" => time(),
		"createdby" => $user["name"],
		"episode_id" => $_GET["episode_id"],
		"description" => $_GET["description"]
	]);
	$issues = $context->list_issues($_GET["episode_id"]);
	$context->disconnect();
	echo json_encode($issues);
}
?>
