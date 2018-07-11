<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
require_once 'utils.php';

$user = Utils::verify($context, $_POST['token'], 4);
$context->connect();
$stmt = $context->delete_episode($_POST['id']);
$episodes = $context->list_progress_episodes($user);
$context->disconnect();
echo json_encode($episodes);
?>
