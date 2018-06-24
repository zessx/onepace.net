<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
include_once 'logger.php';
$context = new db_context();
$context->connect();
$episodes = $context->list_progress_episodes();
$context->disconnect();
echo json_encode($episodes);
?>
