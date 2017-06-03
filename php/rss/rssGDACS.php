<?php

include_once '../libs/fb/fb.php';

$ch = curl_init("http://www.gdacs.org/xml/rss.xml");
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);

$risposta = curl_exec($ch);
$rss = new SimpleXMLElement($risposta);
//fb($rss);

foreach ($rss->channel->item as $evento) {
   echo '<h3><a href="'. $evento->link .'" target="_blank">' . $evento->title . "</a></h3>";
   echo "<p>" . $evento->pubDate . "</p>";
   echo "<p>" . $evento->description . "</p>";
   //echo "<p>" . $evento->enclosure->attributes[1] . "</p>";
}
?>
