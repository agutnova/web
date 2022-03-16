<?php
	$link=@mysqli_connect('127.0.0.1', 'root', '', 'computers_gutnova');
	if (!$link) {
		die('Ошибка подключения к бд: '.mysqli_connect_error());
	}
	
	/*$link=@new mysqli('127.0.0.1', 'root', '', 'computers_gutnova');
	if ($link->connect_error()) {
		die('Ошибка подключения к бд: '.$link->connect_error());
	}*/
?>