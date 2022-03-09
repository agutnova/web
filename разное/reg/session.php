<?php
session_start();
if (!isset($_SESSION['user']) || (time()-$_SESSION['time']>10)) {
	session_destroy();
	header("Location: login.php?msg=".urldecode("Вы не вошли или сессия завершена"));
	exit;
}
$_SESSION['time'] = time();
?>