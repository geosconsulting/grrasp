<?php

include_once '../inclusioni/DBConn_obj.php';
include_once '../libs/fb/fb.php';

$porta		= '5433';
$database 	= 'grid';

$paese  = $_POST['paese'];
$valoriUpdateInventory  = json_decode($_POST['valoriUpdateInventory']);

//"host=localhost port=5433 dbname=grid user=postgres password=GIS"
$newConn = new Connessione('localhost', $porta, $database,'postgres','GIS');

if(isset($_POST['paese'])) {

$conn = pg_connect($newConn->stringaConnessione());
if (!$conn) {
	die("Error in connection: " . pg_last_error());
} 

$tabella_inventoryEsiste = $newConn->controllaTabella_inventory($conn, $paese);
if($tabella_inventoryEsiste[0]==0){
	$newConn->creaTabella_inventory($conn, $paese);
	$newConn->inserisciValori_inventory($conn, $paese);
}

if(count($valoriUpdateInventory)>0){
	$newConn->updataTabella_inventory($conn, $paese,$valoriUpdateInventory);
}
	
echo ("Data have been stored in the database");

}
else{	
echo ("Impossible to save data in database");

}

//close connection
pg_close($conn);

?>
