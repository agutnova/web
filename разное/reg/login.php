<?php
if (isset($_GET["msg"])) $message = $_GET['msg'];
if (isset($_POST['auth'])) {
	$_POST['email'] = strtolower($_POST['email']);
	$not_valid = true;
	$fio="";
	if (!$_POST['email']) $not_valid=false;
	else {
		$data = file('data.txt');
		$is_found=false;
		foreach($data as $item) {
			$res=explode('|',$item);
			if ($res[1]==$_POST['email']) {
				$is_found=true;
				if ($res[2]!=md5($_POST['psw'])) $not_valid=false;
				else $fio=$res[0];
			}
		}
		if (!$is_found) $not_valid=false;
	}
	
	if ($not_valid) {
		session_start();
		$_SESSION['user'] = $fio;
		$_SESSION['time'] = time();
		header("Location: lk.php");
		exit;
	} else $message = "Пользователя с введенными email и пароль не существует";
}
?>
<!DOCTYPE html>
<html lang="RU">
<head>
	<title>Авторизация</title>
	<meta charset="utf-8">
</head>
<body>
	<h1>Авторизация</h1>
	<font color="red"><?php print (isset($message))?$message:'';?></font>
	<form action="" method="post">
		Email <input type="email" name="email" value="<?php print (isset($_POST['email']))?$_POST['email']:""?>"><br>
		Пароль <input type="password" name="psw"><br>
		<input type="submit" name="auth" value="Войти">
	</form>
</body>
</html>