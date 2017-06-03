<?php

include_once '../inclusioni/DBconnect92.inc';
include_once '../libs/fb/fb.php';
include_once '../libs/dbug.php';

$sql = "SELECT * FROM economics.nations_euro";	
	
if(!$query = @pg_query($sql))
	die("Errore nella query: " . pg_last_error($conn));

$respuesta = array();
$i=0;
while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
    foreach ($line as $col_value) {
         $col_value;
    }
	$respuesta[$i]['nuts_id'] 	= $line['nuts_id'];
	$respuesta[$i]['country'] 	= $line['country'];
	$respuesta[$i]['iso'] 		= $line['iso'];
	$i++;
}

$respuestaJson = json_encode($respuesta);
echo $respuestaJson;

pg_close($conn);
?>
