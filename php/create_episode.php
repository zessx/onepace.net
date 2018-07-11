<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'utils.php';
include_once 'secure_indexer.php';

$user = Utils::verify($context, $_POST['token'], 4);
$created_episode = (array)json_decode($_POST['episode']);
if($created_episode['part'] < 1) {
	$created_episode['part'] = null;
}
$context->connect();
$context->create_episode($created_episode);
$episodes = $context->list_progress_episodes($user);
$context->disconnect();
echo json_encode($episodes);
?>
