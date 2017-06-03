<?php

include_once '../inclusioni/DBconnect.inc';
include_once '../libs/fb/fb.php';
include_once '../libs/dbug.php';

if(isset($_POST['parametroLinkID'])) {	
	
$FID = $_POST['parametroLinkID'];
$valoreDesc = $_POST['parametroLinkDesc'];
$valoreType = $_POST['parametroLinkType'];
$valoreLinkedTo = $_POST['parametroLinkedTo'];

//comando sql
$sql = "UPDATE segmenti_it SET \"link_desc\"='" . $valoreDesc . "',link_type='" . $valoreType . "',linked_to='" . $valoreLinkedTo . "' WHERE gid=$FID";	

if(!$query = @pg_query($sql))
	die("Errore nella query: " . pg_last_error($conn));

pg_close($conn);
		
$respuesta = array(
		'success' => 'true',
		'descrizione' => $valoreDesc,
		'tipo' => $valoreType,
		'connessoA' => $valoreLinkedTo);

echo json_encode($respuesta);
}
else{

$respuesta = array(
	'success' => 'false',
	'descrizione' => ' ',
	'tipo' => ' ');
echo json_encode($respuesta);
}

?>
