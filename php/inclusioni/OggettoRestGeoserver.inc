<?php

include_once 'DatiXml.php';

class GestisciGeoserver {
	public static $workspaceString= "workspaces/";
	public static $datastoresString= "datastores";    
    public $restURL;
    public $credenziali;
	public $GETsuccessCode;
	public $POSTsuccessCode;
	public $ch;	
	            
public function __construct($restURL, $credenziali,$GETsuccessCode,$POSTsuccessCode) {
     $this->restURL 		= $restURL;
     $this->credenziali		= $credenziali;
	 $this->GETsuccessCode	= $GETsuccessCode;
	 $this->POSTsuccessCode	= $POSTsuccessCode;
}

public function verificaVersione() {
			
	$ch = curl_init($this->restURL . "about/version");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_VERBOSE, true);        
    curl_setopt($ch, CURLOPT_USERPWD, $this->credenziali);    
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
    $buffer = curl_exec($ch);	
	
    $info = curl_getinfo($ch);
    if ($info['http_code'] != $this->GETsuccessCode) {
      $msgStr = "# Unsuccessful cURL request to ";
      $msgStr .= $this->restURL." [". $info['http_code']. "]\n";    
    } else {      
	  return $buffer;      
    }
    curl_close($ch);   
}	

public function leggiListaWorkSpaces() {
			
	$ch = curl_init($this->restURL . self::$workspaceString);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_VERBOSE, true);        
    curl_setopt($ch, CURLOPT_USERPWD, $this->credenziali);    
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
    $buffer = curl_exec($ch);	
	
    $info = curl_getinfo($ch);
	$msgStr = "";
    if ($info['http_code'] != $this->GETsuccessCode) {
      	$msgStr = "# Lista Worskspace Unsuccessful cURL request to ";
      	$msgStr .= $this->restURL." [". $info['http_code']. "]\n";    
    } else {
		$msgStr = "# Lista Worskspace Successful cURL request to ";
      	$msgStr .= $this->restURL." [". $info['http_code']. "]\n";
	  return $buffer;      
    }
    curl_close($ch); // free resources if curl handle will not be reused        
}	
	
public function leggiListaDataStores($workspaceNome){
		
	$ch = curl_init($this->restURL . self::$workspaceString . $workspaceNome . "/". self::$datastoresString . "/");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_VERBOSE, true);        
    curl_setopt($ch, CURLOPT_USERPWD, $this->credenziali);	   
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: text/xml"));  
    
    $buffer = curl_exec($ch);
	$info = curl_getinfo($ch);
	
	$msgStr = "";
	if ($info['http_code'] != $this->GETsuccessCode) {
    	$msgStr = "# Unsuccessful cURL request to ";
    	$msgStr .= $this->restURL . " [". $info['http_code']. "]\n";  
		return $msgStr;  
    } else {
    	$msgStr = "# Lista Data Store Successful cURL request to ";
    	$msgStr .= $this->restURL . " [". $info['http_code']. "]\n";       
		return $buffer;      
    }			
    curl_close($ch);   
}

public function scriviNuovoWorkSpace($nuovoWorkspace) {
	
    $ch = curl_init($this->restURL . self::$workspaceString);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_POST, True);
    curl_setopt($ch, CURLOPT_USERPWD, $this->credenziali);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/xml"));
        
    $xmlStr = "<workspace><name>".$nuovoWorkspace."</name></workspace>";
    curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlStr);

    $buffer = curl_exec($ch);
    $info = curl_getinfo($ch);
    $msgStr = "";
    if ($info['http_code'] != $this->POSTsuccessCode) {
      $msgStr = "# Unsuccessful cURL request to ";
      $msgStr .= $this->restURL ." [". $info['http_code']. "]\n";
    } else {
      $msgStr = "# Successful cURL request to ".$this->restURL."\n";
    }	
	return $msgStr;
    curl_close($ch);
}	
	
public function scriviNuovoDataStore($databaseHost,$databasePort,$databaseUser,$databasePass,$databaseName,$databaseSchema,$workspaceInScrittura,$datastoreName){
	   
   	ScriviXMLDT($datastoreName, $databaseHost, $databasePort, $databaseUser, $databasePass, $databaseName, $databaseSchema, $workspaceInScrittura, $datastoreName);
	
	$eseguibile = 'curl.exe';
	$comando  	= ' -v -u admin:geoserver -X POST -H "Content-type:text/xml" -T ';	
	$url		= 'http://localhost:8080/geoserver/rest/workspaces/'. $workspaceInScrittura . '/datastores';
	
	$comandoEseguibile = $eseguibile . $comando . " prodotti/".$datastoreName. ".xml " . $url;	
	exec($comandoEseguibile);
}

public function listaLayers($workspaceName, $datastoreName) {
			
    $datastore= "workspaces/" . $workspaceName . "/datastores/" . $datastoreName . "/featuretypes";
    $url = $this->restURL . $datastore;	
		
    $ch = curl_init($url);		
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_VERBOSE, true);            
    curl_setopt($ch, CURLOPT_USERPWD, $this->credenziali); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
	
	$buffer = curl_exec($ch);
		
    $info = curl_getinfo($ch);
    if ($info['http_code'] != $this->GETsuccessCode) {
      $msgStr = "# Unsuccessful cURL request to ";
      $msgStr .= $url." [". $info['http_code']. "]\n";    
    } else {      
	  return $buffer;      
    }   		
    curl_close($ch);
	}


public function creaLayerTabellaPostgisEsistente($tableName,$workspaceInScrittura,$datastoreName) {
	
	$eseguibile = 'curl.exe';
	$comando  	= ' -v -u admin:geoserver -X POST -H "Content-type:text/xml" -d "<featureType><name>'. $tableName .'</name></featureType>" ';	
	$url		= 'http://localhost:8080/geoserver/rest/workspaces/' . $workspaceInScrittura. '/datastores/'. $datastoreName . '/featuretypes';
	
	$comandoEseguibile = $eseguibile . $comando . $url;
	fb($comandoEseguibile);	
	exec($comandoEseguibile);
		
	}

public function deleteLayer($layerName, $workspaceName, $datastoreName) {
		//$this->runApi('layers/'.urlencode($layerName), 'DELETE');
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName).'/featuretypes/'.urlencode($layerName), 'DELETE');
	}



}
?>
