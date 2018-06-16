<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
$context = new db_context();
if(!Authenticator::authenticate($context, $_POST['token'])){
	http_response_code(400);
} else {
	$context->connect();
	$stmt = $context->prepare("update episodes set crc32=?, chapters=?, episodes=?, resolution=?, released_date=?, title=?, part=?, torrent_hash=? where id=?;");
	$stmt->bind_param('ssssssdsd', $_POST['crc32'], $_POST['chapters'], $_POST['episodes'], $_POST['resolution'], $_POST['released_date'], $_POST['title'], $_POST['part'], $_POST['torrent_hash'], $_POST['id']);
	$context->execute($stmt);
	$episodes = $context->list_progress_episodes();
	$context->disconnect();
	echo json_encode($episodes);
}
?>
