<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'logger.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'], 2, $user)) {
	http_response_code(400);
} else {
	$context->connect();
	$issue = $context->read_issue($_GET["id"]);
	if($issue == null) {
		http_response_code(400);
		exit();
	}
	$params = [
		"status" => $_GET["status"]
	];
	if($issue["status"] == 0 && $_GET['status'] == 1) {
		$params["completedby"] = $user['name'];
		$params["completeddate"] = time();
	}
	$context->update_issue($_GET["id"], $params);
	$issues = $context->list_issues($issue["episode_id"]);
	$context->disconnect();
	echo json_encode($issues);
}
?>
