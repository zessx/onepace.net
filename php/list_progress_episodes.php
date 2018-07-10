<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'Authenticator.php';
require_once 'db_context.php';
require_once 'config.php';
include_once 'logger.php';
$context = new db_context();
Authenticator::authenticate($context, $_POST['token'], 0, $user);
$context->connect();
$episodes = $context->list_progress_episodes($user);
$context->disconnect();
echo json_encode($episodes);
?>
