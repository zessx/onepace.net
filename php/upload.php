<?php
include_once 'utils.php';

$user = Utils::verify($context, $_POST['token'], 1);
Utils::echo_json($_FILES);
?>
