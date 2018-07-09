<?php
header('Content-Type: application/json; charset=utf-8;');
require_once 'db_context.php';
require_once 'config.php';
include_once 'logger.php';
$context = new db_context();
Authenticator::authenticate($context, $_GET['token'], 0, $user);
$context->connect();
$issues = $context->list_issues($user, $_GET['episode_id']);
$context->disconnect();
echo json_encode($issues);
?>
