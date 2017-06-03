<?php

include_once '../inclusioni/DBconnect92_GasElect.inc';
include_once '../libs/fb/fb.php';

$paese = $_POST['paese'];

$sql = 	"SELECT s.gid,s.\"Label_ID\",s.\"LENGTH\",c.country,c.iso,c.nuts_id ".
	 	"FROM electrical.elect_network s ".
		"LEFT JOIN public.nations_euro c ".
		"ON ST_WITHIN(s.the_geom,c.geom) ".
		"WHERE c.country = '" . $paese . "'".
		" ORDER BY s.gid;";	
		
//fb($sql);
	
if(!$query = @pg_query($sql))
	die("Errore nella query: " . pg_last_error($conn));

$respuesta = array();
$i=0;
while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
    foreach ($line as $col_value) {
         $col_value;
    }
	$respuesta[$i]["int_id"] 	= $i+1;
	$respuesta[$i]['nuts_id'] 	= $line['nuts_id'];
	$respuesta[$i]['country'] 	= $line['country'];
	$respuesta[$i]['id'] 		= $line['Label_ID'];
	$respuesta[$i]['length']  	= $line['LENGTH'];	
	//$respuesta[$i]['the_geom'] 	= $line['the_geom'];
	$i++;
}

$respuestaJson = json_encode($respuesta);

echo $respuestaJson;

pg_close($conn);
?>
