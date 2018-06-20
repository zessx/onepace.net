<?php
require_once 'db_context.php';
require_once 'config.php';
class Authenticator {
	static function authenticate($context, $token) {
		$context->connect();
		$stmt = $context->prepare("select * from users where token = ?;");
		$stmt->bind_param("s", $token);
		$rows = $context->get_result($stmt);
		$context->disconnect();
		return sizeof($rows) > 0;
	}
}
?>
