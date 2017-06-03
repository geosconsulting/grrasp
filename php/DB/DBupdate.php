<?php

include_once '../inclusioni/DBconnect.inc';
include_once '../libs/fb/fb.php';

if(isset($_POST['nodoEditing'])) {
		
fb($_POST['nodoEditing']);	
	
$ID_0 	= $_POST['nodoEditing'];
$tipo 	= $_POST['valDesc'];
$nome 	= $_POST['valType'];
$ID 	= $_POST['valTypeID']; 

//comando sql
$sql = "UPDATE nodi_edit SET \"desc\"='" . $valoreDesc . "',node_type='" . $valoreType . "',type_id='" . $valoreTypeID . "' WHERE gid=$FID";	

if(!$query = @pg_query($sql))
	die("Errore nella query: " . pg_last_error($conn));

// close connection
pg_close($conn);
	
//echo "tutto bene modificato tutto";		
$respuesta = array(
		'success' => 'true',
		'descrizione' => $valoreDesc,
		'tipo' => $valoreType);
	
//$respuesta = array('true',$valoreDesc,$valoreType);
	
echo json_encode($respuesta);
}
else{
		
//echo "errore non ho nodo";
	
$respuesta = array(
	'success' => 'false',
	'descrizione' => ' ',
	'tipo' => ' ');
echo json_encode($respuesta);	
}

?>
