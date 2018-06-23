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
	$issue = $context->read_issue($_GET["id"]);
	if($issue == null) {
		http_response_code(400);
		exit();
	}
	$context->update_issue($_GET["id"], [
		"description" => $_GET["description"],
		"status" => $_GET["status"]
	]);
	$issues = $context->list_issues($issue["episode_id"]);
	$context->disconnect();
	echo json_encode($issues);
}
?>
