<?php
require_once 'db_context.php';
require_once 'config.php';
require_once 'utils.php';
include_once 'secure_indexer.php';
$user = Utils::verify($context, $_POST['token'], 0);
$old_password = sha1($_POST['oldpassword'] . strtolower($user["name"]) . SALT);
if(!Utils::verify_password($context, $_POST['token'], $old_password)) {
	http_response_code(400);
	exit;
}
$password = sha1($_POST['newpassword'] . strtolower($user["name"]) . SALT);
$context->connect();
$context->update_user($user['id'], [ "password" => $password ]);
$episodes = $context->list_progress_episodes($user);
$context->disconnect();
Utils::echo_json($episodes);
?>
