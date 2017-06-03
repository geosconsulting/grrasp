<?php

	session_start(); 	
 		
	include_once 'geoserver_settings.php';
	include_once '../libs/fb/fb.php';
		
	$wsName=$_SESSION['nomeWSAttivo'];
	$request = "workspaces/" . $wsName . "/datastores"; 
    
    $url = $service . $request;
    $ch = curl_init($url);
	
	// Optional settings for debugging
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //option to return string
    curl_setopt($ch, CURLOPT_VERBOSE, true);        
    curl_setopt($ch, CURLOPT_USERPWD, $passwordStr);	   
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));  
    $successCode = 200;
	$buffer = curl_exec($ch); 
	
	$json_output = json_decode($buffer,true);
	if($json_output['dataStores']==""){
  		$vuoto = '{"dataStores":{"dataStore":[{"name":"EMPTY","href":"EMPTY"}]}}'; 
		echo($vuoto);	
  	}else{
    	$info = curl_getinfo($ch);
		if ($info['http_code'] != $successCode) {
      		$msgStr = "# Unsuccessful cURL request to ";
      		$msgStr .= $url." [". $info['http_code']. "]\n";    
    	} else {      
	  		echo $buffer;      
    	}
	}	
	
    curl_close($ch);        
?>
