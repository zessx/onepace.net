<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'logger.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_POST['token'], 1, $user)) {
	http_response_code(400);
} else {
	$time = time();
	$context->connect();
	$descriptions = preg_split('/\r\n|\r|\n/', $_POST['description']);
	foreach($descriptions as $desc) {
		$description = trim($desc);
		if(strlen($description) > 0) {
			$context->create_issue([
				"createddate" => $time,
				"createdby" => $user["name"],
				"episode_id" => $_POST["episode_id"],
				"description" => $description
			]);
		}
	}
	$issues = $context->list_issues($user, $_POST["episode_id"]);
	$context->disconnect();
	echo json_encode($issues);
}
?>
