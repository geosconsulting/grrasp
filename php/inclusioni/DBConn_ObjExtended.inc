<?php

include_once 'DBconn_Obj.inc';
include_once '../libs/fb/fb.php';

// The code below creates the class
class ConnessioneEstesa extends Connessione {
    
public function controllaTabellaNuoviNodi($conn,$nuoviNodi){			
	$sql = "select count(*) from pg_class where relname='" . $nuoviNodi ."'";
		
	if(!$query = @pg_query($sql))
		die("Errore nella query: " . pg_last_error($conn));
	$respuesta = pg_fetch_row($query);
		
	return $respuesta;
}

public function controllaEsisteSequenzaOGCNuoviNodi($conn,$nuoviNodi){
	
	$sqlEsisteSequenza = "SELECT COUNT(*) FROM pg_class where relname = '" . $nuoviNodi . "_ogc_fid_seq'";

	$respuesta;	
	if(!$query = @pg_query($sqlEsisteSequenza))
		die("Errore nella verifica della sequenza: " . pg_last_error($conn));
	else{
		$respuesta=pg_fetch_all($query);
	};
	
	return $respuesta[0]['count'];		
}

public function creaSequenzaOGCNuoviNodi($conn,$nuoviNodi){
		
	$sqlSequenza = "CREATE SEQUENCE " . $nuoviNodi . "_ogc_fid_seq".
	" INCREMENT 1".
  	" MINVALUE 1".
  	" MAXVALUE 9223372036854775807".
  	" START 1".
  	" CACHE 1;".
  	" ALTER TABLE " . $nuoviNodi . "_ogc_fid_seq " .
	"OWNER TO postgres;";
	
	if(!$query = @pg_query($sqlSequenza))
		die("Errore nella creazione della sequenza: " . pg_last_error($conn));			
}

public function creaTabellaNuoviNodi($conn,$nuoviNodi,$tipoTabella){		
	
	//fb("Ho inviato " . $tipoTabella);
	
	$geometria="";
	switch($tipoTabella){
		case "pu":
			$geometria = "POINT";
			break;
		case "li":
			$geometria = "MULTILINESTRING";
			break;
		case "po":
			$geometria = "MULTIPOLYGON";
			break;
	}
	
	//fb("La geometria e' " . $geometria);
		
	$sqlTabella = "CREATE TABLE " . $nuoviNodi .
	"(".
  	"gid integer NOT NULL DEFAULT nextval('". $nuoviNodi ."_ogc_fid_seq'::regclass),".
  	//"the_geom geometry(".$geometria.",3857),".
  	//"node_id serial NOT NULL,".
  	"infrastructure_type character varying(50),".
  	"buffer_time time without time zone,".
  	"propagation_time time without time zone,".
  	"organizational_time time without time zone,".
  	"recovery_time time without time zone,".
  	"initial_integrity integer,".
  	"treath_char_time time without time zone ARRAY[4],".  	  	
  	"CONSTRAINT pk_". $nuoviNodi ." PRIMARY KEY (gid)".
	")".
	"WITH (".
  	"OIDS=FALSE".
	");".
	"ALTER TABLE " . $nuoviNodi . " " .
	"OWNER TO postgres;";	
	
	if(!$query = @pg_query($sqlTabella))
		die("Errore nella creazione della tabella: " . pg_last_error($conn));	
	
	$sqlGeometria= "SELECT AddGeometryColumn('".$nuoviNodi . "','the_geom', 3857,'". $geometria . "', 2 );";
	fb($sqlGeometria);
	if(!$query = @pg_query($sqlGeometria))
		die("Errore geometria: " . pg_last_error($conn));
}

public function clonaNodi($conn,$nuovoSchema){		
	
	$clonazione = "CREATE TABLE " . $nuovoSchema. "_node" .
	"AS SELECT * FROM".
  	"public.". $vecchioNome .";";	
	
	//if(!$query = @pg_query($clonazione))
		//die("Errore nella creazione della tabella: " . pg_last_error($conn));	
}

}
       
?>