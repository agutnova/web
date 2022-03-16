<?php
require('db.php');

if (isset($_POST['send'])) 
{
	$msg=trim($_POST['message']);
	$msg = htmlspecialchars($msg, ENT_QUOTES);
	if ($msg) {
		$query = "INSERT INTO messages(datem, message)
				VALUES(NOW(), '$msg')";
		mysqli_query($link, $query) or die(mysqli_error($link));
		//print "Номер: ".mysqli_insert_id($link);
	}
}

$query= "SELECT * FROM messages ORDER BY datem DESC LIMIT 0,10";
$result = mysqli_query($link, $query);
$messages=array();
while ($row = mysqli_fetch_assoc($result))
{
	$messages[] = $row;
}
?>
<!DOCTYPE html>
<html lang="RU">
<head>
	<title>Мессенджер</title>
	<meta charset="utf-8">
</head>
<body>
	<h1>Сообщения</h1>
	<table border="0">
	<tr><th>Дата</th><th>Сообщение</th></tr>
	<?php
	foreach ($messages as $msg)
	{
		print "<tr><td>$msg[datem]</td><td>$msg[message]</td></tr>";
	}
	?>
	</table>
	
	<form action="" method="post">
		<textarea name="message" rows="10" cols="60"></textarea><br>
		<input type="submit" name="send" value="Отправить">
	</form>
</body>
</html>