<?php
require_once 'db_context.php';
require_once 'config.php';
class Authenticator {
	static function authenticate($context, $token, $role, &$user) {
		$context->connect();
		$stmt = $context->prepare("select * from users where token = ?;");
		$stmt->bind_param("s", $token);
		$rows = $context->get_result($stmt);
		$context->disconnect();
		if(sizeof($rows) > 0) {
			$user = $rows[0];
		}else{
			$user = null;
		}
		return sizeof($rows) > 0 && $rows[0]["role"] >= $role;
	}
	static function verify_password($context, $token, $password) {
		$context->connect();
		$stmt = $context->prepare("select * from users where token = ? and password = ?;");
		$stmt->bind_param("ss", $token, $password);
		$rows = $context->get_result($stmt);
		$context->disconnect();
		return sizeof($rows) > 0;
	}
}
?>
