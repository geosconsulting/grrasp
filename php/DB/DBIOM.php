<?php

include_once '../inclusioni/DBConn_obj.php';
include_once '../libs/fb/fb.php';

$porta		= '5433';
$database 	= 'grid';

$paese  = $_POST['paese'];
$valoriUpdate  = json_decode($_POST['valoriUpdate']);

//"host=localhost port=5433 dbname=grid user=postgres password=GIS"
$newConn = new Connessione('localhost', $porta, $database,'postgres','GIS');

if(isset($_POST['paese'])) {

$conn = pg_connect($newConn->stringaConnessione());
if (!$conn) {
	die("Error in connection: " . pg_last_error());
} 

$tabella_p0Esiste = $newConn->controllaTabella_p0($conn, $paese);
if($tabella_p0Esiste[0]==0){
	$newConn->creaTabella_p0($conn, $paese);
	$newConn->inserisciValori_p0($conn, $paese);	
	$tabella_xEsiste = $newConn->controllaTabella_x($conn, $paese);
	if($tabella_xEsiste[0]==0){
		$newConn->creaTabella_inventory($conn, $paese);
		$newConn->inserisciValori_inventory($conn, $paese);
	}
} else{
	
$newConn->azzeraTabelle_0($conn, $paese, $valoriUpdate);
	
}

if(count($valoriUpdate)>0){
	$newConn->updataTabella_p0($conn, $paese,$valoriUpdate);
	$newConn->updataTabella_inventory($conn, $paese,$valoriUpdate);
}
	
echo ("Data have been stored in the database");

}
else{	

echo ("Impossible to save data in database");

}

//close connection
pg_close($conn);

?>
