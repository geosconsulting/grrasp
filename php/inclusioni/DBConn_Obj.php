<?php

// The code below creates the class
class Connessione {
    // Creating some properties (variables tied to an object)
    public $host;
    public $port;
    public $db;
    public $user;
	public $pwd;
            
    // Assigning the values
public function __construct($host, $port, $db,$user,$pwd) {
     $this->host 	= $host;
     $this->port 	= $port;
     $this->db 		= $db;
     $this->user 	= $user;
	 $this->pwd 	= $pwd;
}
	
public function stringaConnessione() {
    return "host=".$this->host . " port=" . $this->port . " dbname=" . $this->db . " user=".$this->user . " password=" . $this->pwd;
 }	
	
public function controllaTabella_p0($conn,$paese){			
	$sql = "select count(*) from pg_class where relname='" . $paese . "_p0'";
		
	if(!$query = @pg_query($sql))
		die("Errore nella query: " . pg_last_error($conn));		
	
	$respuesta = pg_fetch_row($query);
	
	return $respuesta;
}

public function controllaTabella_inventory($conn,$paese){			
	$sql = "select count(*) from pg_class where relname='" . $paese . "_inventory'";
		
	if(!$query = @pg_query($sql))
		die("Errore nella query: " . pg_last_error($conn));		
	
	$respuesta = pg_fetch_row($query);
	
	return $respuesta;
}

public function creaTabella_p0($conn,$paese){
		
	//comando sql
	$sqlTabella = "CREATE TABLE econodata." . $paese . "_p0" .
	"(".
  	"id character(4) NOT NULL,".
  	"sector character(120),".
  	"day_inop integer,".
  	"iniprodino integer," .
    "assrectime integer,".
  	"dysfunction integer,".  	
  	"CONSTRAINT pk_p0_".$paese ." PRIMARY KEY (id)".
	")".
	"WITH (".
  	"OIDS=FALSE".
	");".
	"ALTER TABLE econodata.".$paese."_p0 ".
	"OWNER TO postgres;";
	
	if(!$query = @pg_query($sqlTabella))
		die("Errore nella query crea p0: " . pg_last_error($conn));

			
}

public function creaTabella_inventory($conn,$paese){
		
	//comando sql
	$sqlTabella = "CREATE TABLE econodata." . $paese . "_inventory " .
	"(".
  	"id character(4) NOT NULL,".
  	"sector character(120),".
  	"value double precision,".  	
  	"CONSTRAINT pk_inventory_".$paese ." PRIMARY KEY (id)".
	")".
	"WITH (".
  	"OIDS=FALSE".
	");".
	"ALTER TABLE econodata.".$paese."_inventory ".
	"OWNER TO postgres;";
	
	if(!$query = @pg_query($sqlTabella))
		die("Errore nella query crea _inventory: " . pg_last_error($conn));
	
}

public function inserisciValori_p0($conn,$paese){
																											   
	$sqlInserisciTabella =   "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c1','Agriculture, Hunting, Forestry and Fishing',0,0,0,0);"; 
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c2','Mining and Quarrying',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c3','Food, Beverages and Tobacco',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c4','Textiles and Textile Products',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c5','Leather, Leather and Footwear',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c6','Wood and Products of Wood and Cork',0,0,0,0);";	
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c7','Pulp, Paper, Paper , Printing and Publishing',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c8','Coke, Refined Petroleum and Nuclear Fuel',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c9','Chemicals and Chemical Products',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c10','Rubber and Plastics',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c11','Other Non-Metallic Mineral',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c12','Basic Metals and Fabricated Metal',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c13','Machinery, Nec',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c14','Electrical and Optical Equipment',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c15','Transport Equipment',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c16','Manufacturing, Nec; Recycling',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c17','Electricity, Gas and Water Supply',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c18','Construction',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c19','Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c20','Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',0,0,0,0);";	
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c21','Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c22','Hotels and Restaurants',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c23','Inland Transport',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c24','Water Transport',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c25','Air Transport',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c26','Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c27','Post and Telecommunications',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c28','Financial Intermediation',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c29','Real Estate Activities',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c30','Renting of M&Eq and Other Business Activities',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c31','Public Admin and Defence; Compulsory Social Security',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c32','Education',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c33','Health and Social Work',0,0,0,0);";	
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c34','Other Community, Social and Personal Services',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c35','Private Households with Employed Persons',0,0,0,0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_p0(id,sector,day_inop,iniprodino,assrectime,dysfunction) VALUES('c36','Compensation of employees (workforce)',0,0,0,0);";
	
	if(!$query = @pg_query($sqlInserisciTabella))
		die("Errore nella query inserisci p0: " . pg_last_error($conn));
	
}

public function inserisciValori_inventory($conn,$paese){
	//comando sql
	$sqlInserisciTabella =   "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c1','Agriculture, Hunting, Forestry and Fishing',0);"; 
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c2','Mining and Quarrying',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c3','Food, Beverages and Tobacco',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c4','Textiles and Textile Products',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c5','Leather, Leather and Footwear',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c6','Wood and Products of Wood and Cork',0);";	
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c7','Pulp, Paper, Paper , Printing and Publishing',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c8','Coke, Refined Petroleum and Nuclear Fuel',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c9','Chemicals and Chemical Products',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c10','Rubber and Plastics',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c11','Other Non-Metallic Mineral',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c12','Basic Metals and Fabricated Metal',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c13','Machinery, Nec',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c14','Electrical and Optical Equipment',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c15','Transport Equipment',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c16','Manufacturing, Nec; Recycling',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c17','Electricity, Gas and Water Supply',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c18','Construction',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c19','Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c20','Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',0);";	
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c21','Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c22','Hotels and Restaurants',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c23','Inland Transport',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c24','Water Transport',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c25','Air Transport',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c26','Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c27','Post and Telecommunications',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c28','Financial Intermediation',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c29','Real Estate Activities',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c30','Renting of M&Eq and Other Business Activities',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c31','Public Admin and Defence; Compulsory Social Security',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c32','Education',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c33','Health and Social Work',0);";	
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c34','Other Community, Social and Personal Services',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c35','Private Households with Employed Persons',0);";
	$sqlInserisciTabella .=	 "INSERT INTO econodata." . $paese . "_inventory(id,sector,value) VALUES('c36','Compensation of employees (workforce)',0);";
	
	if(!$query = @pg_query($sqlInserisciTabella))
		die("Errore nella query inserisci x: " . pg_last_error($conn));
	
}

public function azzeraTabelle_p0($conn,$paese,$valoriUpdate){
		
	if ($paese=='greece' or $paese=='netherlands') {
		fb("non posso cancellare i dati di " . $paese);
	} else {
		fb("posso cancellare i dati di " . $paese);
		
	$sqlAzzerap0="";
	for($indice=0;$indice<=36;$indice++) {
			$sqlAzzerap0 .= "UPDATE econodata." . $paese . "_p0 SET day_inop=0 , iniprodino=0, assrectime=0, dysfunction=0 WHERE id='c" . $indice . "';";
			fb("Ho messo a ZERO tutti i campi di " . $paese);
		}
	
	if(!$query = @pg_query($sqlAzzerap0))
		die("Errore nella query azzera p0: " . pg_last_error($conn));
	
	$sqlAzzerax0="";
	for($indice=0;$indice<=36;$indice++) {
		$sqlAzzerax0 .= "UPDATE econodata." . $paese . "_inventory SET value=0 WHERE id='c" . $indice . "';";
	}
	
	if(!$query = @pg_query($sqlAzzerax0))
		die("Errore nella query azzera _inventory: " . pg_last_error($conn));
		  
	}
}

public function updataTabella_p0($conn,$paese,$valoriUpdate){
	
	fb($valoriUpdate);	
	$sqlUpdata="";
	foreach ($valoriUpdate as $key => $value) {
		$sqlUpdata .= "UPDATE econodata." . $paese ."_p0 SET day_inop=" . $valoriUpdate[$key][2] . ", iniprodino=" . $valoriUpdate[$key][3] . ", assrectime=" . $valoriUpdate[$key][4] . ", dysfunction=" . $valoriUpdate[$key][5] . " WHERE id='" . $valoriUpdate[$key][0] . "';";
	}
	
	if(!$query = @pg_query($sqlUpdata))
		die("Errore nella query updata p0: " . pg_last_error($conn));
}

public function updataTabella_inventory($conn,$paese,$valoriUpdate){
	
	fb($valoriUpdate);
		
	$sqlUpdata="";
	foreach ($valoriUpdate as $key => $value) {
		$sqlUpdata .= "UPDATE econodata." . $paese ."_inventory SET value=" . $valoriUpdate[$key][1] . " WHERE id='" . $valoriUpdate[$key][0] . "';";
	}
		
	if(!$query = @pg_query($sqlUpdata))
		die("Errore nella query updata _inventory: " . pg_last_error($conn));
}

}
       
?>