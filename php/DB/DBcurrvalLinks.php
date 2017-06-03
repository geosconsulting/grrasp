<?php

include_once '../inclusioni/DBconnect.inc';
include_once '../libs/fb/fb.php';
include_once '../libs/dbug.php';

// comando sql
$sql = "SELECT MAX(gid) FROM segmenti_it";	
	
if(!$query = @pg_query($sql))
	die("Errore nella query: " . pg_last_error($conn));


while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
    foreach ($line as $col_value) {
        $col_value;
    }
}

//echo "tutto bene modificato tutto";		
$respuesta = array(
		'success' => 'true',
		'ultimoValLinks' => $col_value);
	
echo json_encode($respuesta);

// close connection
pg_close($conn);

?>
