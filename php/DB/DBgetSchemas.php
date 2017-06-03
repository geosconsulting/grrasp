<?php

include_once '../inclusioni/DBConn_Obj.inc';
include_once '../libs/fb/fb.php';

$porta		= '5433';
$schemaNN 	= 'wfst_polipo';

$oggettoDBPolitecnico = new Connessione("localhost",$porta, $schemaNN,"postgres","GIS");
$conn = pg_connect($oggettoDBPolitecnico->stringaConnessione());
if (!$conn) {
	die("Error in connection: " . pg_last_error());
} 
	
$sql = "select schema_name from information_schema.schemata";	

if(!$query = @pg_query($sql))
	die("Errore nella query: " . pg_last_error($conn));

$respuestas = pg_fetch_all($query);

$listaSchemiValidi = array();
$contatore=0;

foreach($respuestas as $respuesta)
{	
	$schemaInScrutinio=$respuesta['schema_name'];
	$sottoStringa = substr($schemaInScrutinio, 0,3);
	if($sottoStringa=="pg_" OR $sottoStringa=="inf" OR $sottoStringa=='inf' OR $sottoStringa=="top" OR $sottoStringa=="pub"){
		
	}
	else {		
		$listaSchemiValidi["radiceSchemi"][$contatore]["nomeSchema"] = $schemaInScrutinio;
		$contatore += 1;
	}
}

pg_close($conn);

$listaSchemiEncoded = json_encode($listaSchemiValidi);
echo $listaSchemiEncoded;

?>

