<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'secure_indexer.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_POST['token'], 4, $user)) {
	http_response_code(400);
} else {
	$episode = (array)json_decode($_POST['episode']);
	$id = $episode['id'];
	unset($episode['id']);
	unset($episode['in_progress']);
	unset($episode['issues_total']);
	if($episode['part'] < 1) {
		$episode['part'] = null;
	}
	if($episode['released_date'] == '') {
		$episode['released_date'] = null;
	}
	$context->connect();
	$context->update_episode($id, $episode);
	$episodes = $context->list_progress_episodes($user);
	$context->disconnect();
	echo json_encode($episodes);
}
?>
