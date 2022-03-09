<?php
if (isset($_GET['search'])) {
	$ch=curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://www.imdb.com/search/title/?title=".urlencode($_GET['query']));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$res = curl_exec($ch);
	curl_close($ch);
	
	preg_match_all("/<a href=\"(\/title\/tt\d+).+?\">/",$res,$matches);
	$url = $matches[1][0];
	
	$ch=curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://www.imdb.com/$url/?ref_=adv_li_tt");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$res = curl_exec($ch);
	curl_close($ch);
}
?>
<!DOCTYPE html>
<html lang="RU">
<head>
	<title>Поисковичок-movie</title>
	<meta charset="utf-8">
</head>
<body>
	<h1>Поисковичок-movie</h1>
	<form action="" method="get">
		Запрос <input type="text" name="query" value="<?php print (isset($_GET['query']))?$_GET['query']:''?>">
		<input type="submit" name="search" value="Поиск">
	</form>
	<br><br>
	
	<?php
	print '<video width="400" height="300" controls="controls">
   <source src="https://www.imdb.com/video/vi1348706585" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'>
   Тег video не поддерживается вашим браузером. 
  </video>';

	?>
</body>
</html>