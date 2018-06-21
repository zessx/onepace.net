<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'secure_indexer.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_GET['token'])){
	http_response_code(400);
} else {
	$context->connect();
	$stmt = $context->prepare("update episodes set crc32=?, chapters=?, episodes=?, resolution=?, released_date=?, title=?, part=?, torrent_hash=? where id=?;");
	$stmt->bind_param('ssssssdsd',
		scr_value($_GET, 'crc32'), scr_value($_GET, 'chapters'), scr_value($_GET, 'episodes'), scr_value($_GET, 'resolution'),
		scr_value($_GET, 'released_date'), scr_value($_GET, 'title'), scr_value($_GET, 'part'), scr_value($_GET, 'torrent_hash'), scr_value($_GET, 'id')
	);
	$context->execute($stmt);
	$episodes = $context->list_progress_episodes();
	$context->disconnect();
	echo json_encode($episodes);
}
?>
