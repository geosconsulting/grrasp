<?php

include_once '../libs/fb/fb.php';

function LeggiXMLDT($nomefile)

{
$upload_dir = "prodotti/";
$file = $nomefile;
$fp = fopen($file, "rb") or die("cannot open file");
$str = fread($fp, filesize($file));
	   
$xml = new DOMDocument();
$xml->formatOutput = true;
$xml->preserveWhiteSpace = false;
$xml->loadXML($str) or die("Error");

echo "<xmp>". $xml->saveXML() ."</xmp>";

$root   = $xml->documentElement;
$fnode  = $root->firstChild;

$ori    = $fnode->childNodes->item(1);
fb($ori);

}


function ScriviXMLDT($nomefile,$databaseHost,$databasePort,$databaseUser,$databasePass,$databaseName,$databaseSchema,$workspaceInScrittura,$datastoreName)
{
$myFile = $nomefile . '.xml';
$upload_dir = "prodotti/";

$fh = fopen(($upload_dir.$myFile), 'w') or die("can't open file");
$rss = '<?xml version="1.0" encoding="utf-8"?>';
$rss .= '<dataStore>';
$rss .= '<name>'.$datastoreName.'</name>';
$rss .= '<type>PostGIS</type>';
$rss .= '<enabled>true</enabled>';
$rss .= '<workspace>'.$workspaceInScrittura.'</workspace>';
$rss .= '<connectionParameters>';
$rss .= '<port>'.$databasePort.'</port>';
$rss .= '<user>'.$databaseUser.'</user>';
$rss .= '<passwd>'.$databasePass.'</passwd>';
$rss .= '<dbtype>postgis</dbtype>';
$rss .= '<host>'.$databaseHost.'</host>';
$rss .= '<database>'.$databaseName.'</database>';
$rss .= '<schema>'.$databaseSchema.'</schema>';
$rss .= '</connectionParameters>';
$rss .= '</dataStore>';

fwrite($fh, $rss);
fclose($fh);

}

function ScriviXMLLy($nomeTabella,$databaseHost,$databasePort,$databaseUser,$databasePass,$databaseName,$databaseSchema,$workspaceInScrittura,$datastoreName)
{
$myFile = $nomefile . '.xml';
$upload_dir = "prodotti/";

$fh = fopen(($upload_dir.$myFile), 'w') or die("can't open file");

$rss = '<?xml version="1.0" encoding="utf-8"?>';
$rss .= '<featureType>';
$rss .= '<name>'.$datastoreName.'</name>';
$rss .= '<nativeName>'.$datastoreName.'</nativeName>';
$rss .= '<srs>EPSG:3857</srs>';
$rss .= '<attributes>';
$rss .= '<attribute>';
$rss .= '<name>the_geom</port>';
$rss .= '<binding>com.vividsolutions.jts.geom.Point</binding>';
$rss .= '</attribute>';
$rss .= '<attribute>';
$rss .= '<user>description</user>';
$rss .= ' <binding>java.lang.String</binding>';
$rss .= '</attribute>';
$rss .= '<attribute>';
$rss .= '<user>timestamp</user>';
$rss .= ' <binding>java.util.Date</binding>';
$rss .= '</attribute>';
$rss .= '</attributes>';
$rss .= '</featureType>';

fwrite($fh, $rss);
fclose($fh);

}

?>
