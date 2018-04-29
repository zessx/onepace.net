<?php
include_once 'db_context.php';
include_once 'secure_indexer.php';

$context = new db_context();
$context->connect();
$rows = $context->query("select * from posts order by posts.timestamp desc;");
$context->disconnect();
$posts = [];
foreach($rows as $row) {
    $posts[] = [
        'id' => scr_value($row, 'id'),
        'title' => scr_value($row, 'title'),
        'author' => scr_value($row, 'author'),
        'content' => scr_value($row, 'content'),
        'timestamp' => scr_value($row, 'timestamp')
    ];
}
header('Content-Type: application/json; charset=utf-8;');
echo json_encode([
    "posts" => $posts
]);
?>
