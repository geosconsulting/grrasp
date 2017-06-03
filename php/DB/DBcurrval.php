<?php

include_once '../inclusioni/DBconnect.inc';
include_once '../libs/fb/fb.php';

$sql = "SELECT MAX(gid) FROM nodes_it_attrib";	
	
if(!$query = @pg_query($sql))
	die("Errore nella query: " . pg_last_error($conn));


while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
    foreach ($line as $col_value) {
        $col_value;
    }
}

$respuesta = array(
		'success' => 'true',
		'ultimoVal' => $col_value);
	
echo json_encode($respuesta);

pg_close($conn);

?>
