<?php
include_once 'utils.php';

$user = Utils::verify($context, $_POST['token'], 1);
$file = $_FILES['file'];
$target = $_SERVER['DOCUMENT_ROOT'] . '/uploads/' . basename($file["name"]);
if(!move_uploaded_file($file["tmp_name"], $target)) {
	http_response_code(500);
	exit;
}
?>
