<?php
function emailUsed($email)
{
	$data=file_get_contents("data.json");
	$data = json_decode($data);
	$res=false;
	foreach ($data as $u)
		if ($u->email==$email) $res=true;
	
	return $res;
}

function addUser($fio, $email, $psw)
{
	$data=file_get_contents("data.json");
	$data = json_decode($data);

	$obj = new stdClass();
	$obj->fio=$fio;
	$obj->email=$email;
	$obj->pass=$psw;
	$data[]=$obj;
	
	file_put_contents("data.json", json_encode($data));
}

if (isset($_POST["send"])) {
	$_POST['fio'] = ucwords(trim($_POST['fio']));
	$_POST['email'] = strtolower($_POST['email']);
	$not_valid=array();
	if (strlen($_POST['fio'])<3) $not_valid['fio']='Неверное имя';
	if (!$_POST['email']) $not_valid['email']='Пустой email';
	else {
		if (emailUsed($_POST['email'])!==false)$not_valid['email']='Пользователь с таким email уже зарегистрирован';
	}
	
	if (!$_POST['psw1'] || ($_POST['psw1']!=$_POST['psw2'])) $not_valid['psw']='Неверный пароль';
	
	if (count($not_valid)==0) {
		addUser($_POST['fio'],$_POST['email'],md5($_POST['psw1']));
		$_POST=array();
		$message = "Спасибо за регистрацию!";
	} else $message = 'Ошибка: '.implode(', ', $not_valid);
}

?>
<!DOCTYPE html>
<html lang="RU">
<head>
	<title>Регистрация</title>
	<meta charset="utf-8">
</head>
<body>
	<h1>Регистрация</h1>
	<font color="red"><?php print (isset($message))?$message:'';?></font>
	<form action="" method="post">
		Имя <input type="text" name="fio" value="<?php print (isset($_POST['fio']))?$_POST['fio']:""?>"><?php print (isset($not_valid['fio']))?"<font color=red>*</font>":"" ?><br>
		Email <input type="email" name="email" value="<?php print (isset($_POST['email']))?$_POST['email']:""?>"><?php print (isset($not_valid['email']))?"<font color=red>*</font>":"" ?><br>
		Пароль <input type="password" name="psw1"><?php print (isset($not_valid['psw']))?"<font color=red>*</font>":"" ?><br>
		Повторите пароль <input type="password" name="psw2"><?php print (isset($not_valid['psw']))?"<font color=red>*</font>":"" ?><br>
		<input type="submit" name="send" value="Зарегистрироваться">
		
		
	</form>
</body>
</html>