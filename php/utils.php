<?php
include_once 'config.php';
class Utils {
	static function post() {
		return json_decode(file_get_contents('php://input'), true);
	}
	static function log_error($text) {
		if(DEBUG) {
			error_log($text);
		} else {
			error_log($text . PHP_EOL, 3, LOG_PATH . "/onepace_error.log");
		}
	}
	function log_info($text) {
		if(DEBUG) {
			error_log($text);
		} else {
			error_log($text . PHP_EOL, 3, LOG_PATH . "/onepace_info.log");
		}
	}
	function echo_json($data) {
		header('Content-Type: application/json; charset=utf-8;');
		echo json_encode($data);
	}
}
?>
