<?php
require_once 'db_context.php';
require_once 'utils.php';
$context = new db_context();
if(!Utils::authenticate($context, $_POST['token'], 4, $user)) {
	http_response_code(400);
	exit;
}
$episode = (array)json_decode($_POST['episode']);
if($_POST['query'] != null) {
	$query = $_POST['query'];
	$context->connect();
	$row = $context->prepare_and_get_single("
		select episodes.id from episodes
		inner join arcs on episodes.arc_id = arcs.id
		where concat(lower(arcs.title), ' ', episodes.part) like ?
		;", ["query" => $query]
	);
	$context->disconnect();
	if($row == null) {
		http_response_code(400);
		exit;
	}
	$id = $row['id'];
} else if($episode['id'] != null) {
	$id = $episode['id'];
} else {
	http_response_code(400);
	exit;
}
if(isset($episode['part']) && $episode['part'] < 1) {
	$episode['part'] = null;
}
if(isset($episode['released_date']) && $episode['released_date'] == '') {
	$episode['released_date'] = null;
}
unset($episode['id']);
unset($episode['in_progress']);
unset($episode['issues_total']);
$context->connect();
$context->update_episode($id, $episode);
$episodes = $context->list_progress_episodes($user);
$context->disconnect();
Utils::echo_json($episodes);
?>
