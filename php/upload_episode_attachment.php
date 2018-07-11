<?php
include_once 'utils.php';

$user = Utils::verify($context, $_POST['token'], 1);
$file = $_FILES['file'];
$time = time();
$target = $_SERVER['DOCUMENT_ROOT'] . '\\episodeattachments\\' . $_POST['episode_id'] . '_' . $time . '_' . basename($file["name"]);
Utils::log_info($target);
if(!move_uploaded_file($file["tmp_name"], $target)) {
	http_response_code(500);
	exit;
}
$context->connect();
$context->create_episode_attachment([
	'episode_id' => $_POST['episode_id'],
	'name' => basename($file["name"]),
	'type' => $file['type'],
	'size' => $file['size'],
	'uploadeddate' => time(),
	'uploadedby' => $user['name'],
]);
$context->disconnect();
?>
