<?php
include_once 'utils.php';

$user = Utils::verify($context, $_POST['token'], 1);
$context->connect();
$episode_attachment = $context->read_episode_attachment($_POST['id']);
if($episode_attachment == null || ($user['role'] < 4 && $user['id'] != $episode_attachment['createdby'])) {
	http_response_code(400);
	exit;
}
$context->delete_episode_attachment($episode_attachment['id']);
$issues = $context->list_issues($user, $episode_attachment['episode_id']);
$context->disconnect();
Utils::echo_json($issues);
?>
