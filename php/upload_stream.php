<?php
require_once 'db_context.php';
require_once 'config.php';
require_once 'Authenticator.php';
include_once 'utils.php';

$post = Utils::post();
Utils::log_info(print_r($post, true));
Utils::echo_json($post);
?>
