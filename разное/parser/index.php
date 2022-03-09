<?php
if (isset($_GET['search'])) {
	$res=file_get_contents('https://mp3party.net/search?q='.urlencode($_GET['query']));
	preg_match_all("/<div class=\"play-btn track__image_play\" data-song-id=\"\d+\" href=\"(.+?)\"><\/div>/", $res, $matches);
	/*print_r($matches);
	exit;*/
}
?>
<!DOCTYPE html>
<html lang="RU">
<head>
	<title>Поисковичок</title>
	<meta charset="utf-8">
</head>
<body>
	<h1>Поисковичок</h1>
	<form action="" method="get">
		Запрос <input type="text" name="query" value="<?php print (isset($_GET['query']))?$_GET['query']:''?>">
		<input type="submit" name="search" value="Поиск">
	</form>
	<br><br>
	
	<?php
	foreach($matches[1] as $item) 
	{
		print "<audio controls>\n
			<source src='$item' type='audio/mpeg'>\n
			Your browser does not support the audio element.\n
		</audio><br>\n";
	}
	?>
</body>
</html>