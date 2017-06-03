<?php

include_once 'DBconn_Obj.inc';
include_once '../libs/fb/fb.php';

class ConnessioneEstesaCreazioneNodi extends Connessione {
    
public function controllaEsisteSchema($conn,$nomeSchemaClone){
	
	$sqlEsisteSchema = "SELECT COUNT(*) FROM pg_catalog.pg_namespace WHERE nspname='" . $nomeSchemaClone . "'";
	
	if(!$query = @pg_query($sqlEsisteSchema))
		die("Errore nella verifica della sequenza: " . pg_last_error($conn));
	
	//echo "Success schema creation";	
}

public function creazioneSchemaPerClonaggio($conn,$nomeSchemaClone){
	
	$sqlSchemaPerClonazione = "CREATE SCHEMA " . $nomeSchemaClone . " AUTHORIZATION postgres;";
	
	if(!$query = @pg_query($sqlSchemaPerClonazione))
		die("Errore nella creazione della sequenza: " . pg_last_error($conn));	
	
	//echo "Success schema cloning";		
}

public function clonaNodi($conn,$vecchioSchema,$nuovoSchema){		
	
	$clonazionePunti = 	"CREATE TABLE " . $nuovoSchema . ".nodes_" . $nuovoSchema .
						" AS SELECT * FROM ".
  						$vecchioSchema . ".nodes_" .$vecchioSchema.";";
		
	if(!$query = @pg_query($clonazionePunti))
		die("Errore nella creazione della tabella punti: " . pg_last_error($conn));
	
	$clonazioneLinee = 	"CREATE TABLE " . $nuovoSchema . ".line_" . $nuovoSchema .
						" AS SELECT * FROM ".
  						$vecchioSchema . ".line_" .$vecchioSchema.";";
		
	if(!$query = @pg_query($clonazioneLinee))
		die("Errore nella creazione della tabella linee: " . pg_last_error($conn));	
		
	$clonazionePoligoni = 	"CREATE TABLE " . $nuovoSchema . ".poly_" . $nuovoSchema .
						" AS SELECT * FROM ".
  						$vecchioSchema . ".poly_" .$vecchioSchema.";";
		
	if(!$query = @pg_query($clonazionePoligoni))
		die("Errore nella creazione della tabella poligoni : " . pg_last_error($conn));

	//echo "Project cloned succesfully!";		
		
}

}
       
?>