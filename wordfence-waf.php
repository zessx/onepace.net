<?php
// Before removing this file, please verify the PHP ini setting `auto_prepend_file` does not point to this.

if (file_exists('/media/dmm/galaxy9000/www/onepace.net/public_html/wp-content/plugins/wordfence/waf/bootstrap.php')) {
	define("WFWAF_LOG_PATH", '/media/dmm/galaxy9000/www/onepace.net/public_html/wp-content/wflogs/');
	include_once '/media/dmm/galaxy9000/www/onepace.net/public_html/wp-content/plugins/wordfence/waf/bootstrap.php';
}
?>