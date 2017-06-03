<?php

include_once '../inclusioni/DBConn_ObjExtendedCreazioneNodi.inc';
include_once '../libs/fb/fb.php';

$porta		= '5433';
$database 	= 'wfst_polipo';

$schemaDaClonare  		= $_POST['schemaDaClonare'];
$schemaInClonazione  	= $_POST['schemaInClonazione'];

$newConnClonazione = new ConnessioneEstesaCreazioneNodi('localhost', $porta, $database,'postgres','GIS');
$conn = pg_connect($newConnClonazione->stringaConnessione());
	if (!$newConnClonazione) {
		die("Error in connection: " . pg_last_error());
} 

if(isset($_POST['schemaDaClonare']) AND isset($_POST['schemaInClonazione'])) {

	$schemaEsiste = $newConnClonazione->controllaEsisteSchema($conn, $schemaDaClonare);
	if($schemaEsiste[0]==0){
		$newConnClonazione->creazioneSchemaPerClonaggio($conn, $schemaInClonazione);
		$newConnClonazione->clonaNodi($conn, $schemaDaClonare,$schemaInClonazione);	
		echo ("Project has been cloned");
	} else{
		echo ("Impossible to clone the project");	
	}
}
pg_close($conn);

?>
