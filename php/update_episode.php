<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'secure_indexer.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'], 4, $user)) {
	http_response_code(400);
} else {
	$released_date = $_GET['released_date'];
	$context->connect();
	$context->update_episode($_GET['id'], [
		"crc32" => $_GET['crc32'],
		"chapters" => $_GET['chapters'],
		"episodes" => $_GET['episodes'],
		"resolution" => $_GET['resolution'],
		"title" => $_GET['title'],
		"part" => $_GET['part'] < 1 ? null : $_GET['part'],
		"torrent_hash" => $_GET['torrent_hash'],
		"hidden" => $_GET['hidden'],
		"released_date" => $released_date == '' ? null : $released_date,
		"status" => $_GET['status']
	]);
	$episodes = $context->list_progress_episodes($user);
	$context->disconnect();
	echo json_encode($episodes);
}
?>
