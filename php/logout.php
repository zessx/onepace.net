<?php
require_once 'db_context.php';
require_once 'config.php';
require_once 'utils.php';

$user = Utils::verify($context, $_POST['token'], 1);
$context->connect();
$context->update_user($user['id'], ['token' => '']);
$episodes = $context->list_progress_episodes(null);
$context->disconnect();
Utils::echo_json($episodes);
?>
