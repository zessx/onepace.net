<?php
include_once 'db_context.php';
include_once 'secure_indexer.php';

$token = scr_value($_GET, 'token');
$title = scr_value($_GET, 'title');
$author = scr_value($_GET, 'author');
$content = scr_value($_GET, 'content');
$timestamp = time();

$context = new db_context();
$context->connect();
$rows = $context->query("select * from tokens where token = ? limit 1;", [$token], "s");
$context->disconnect();
if(sizeof($rows) > 0) {
    $context->connect();
    $stmt = $context->prepare("insert into posts (title, author, content, timestamp) values (?, ?, ?, ?);");
    $stmt->bind_param('sssd', $title, $author, $content, $timestamp);
    $context->execute($stmt);
    $context->disconnect();
    http_response_code(200);
} else {
    http_response_code(400);
}
?>
