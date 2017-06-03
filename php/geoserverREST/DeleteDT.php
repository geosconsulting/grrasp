<?php

session_start(); 

ob_start();
require_once('../libs/fb/fb.php');

include_once 'geoserver_settings.inc';
	
$wsName = $_SESSION['nomeWSAttivo'];
    
if(isset($_POST['nomeDatastoreDel'])) {	
	$dtName  = $_POST['nomeDatastoreDel'];
};    

fb("Datastore da canecellare " . $dtName); 
$request = "/workspaces/". $wsName ."/datastores/featuretypes/" . $dtName; 
$url = $service . $request;

$ch = curl_init($url);
	
// Optional settings for debugging
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //option to return string
curl_setopt($ch, CURLOPT_VERBOSE, true);	
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");   
curl_setopt($ch, CURLOPT_USERPWD, $passwordStr);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/xml"));
$xmlStr = "<recurse>true</recurse>";
curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlStr);
	
//DELETE return code
$successCode = 200;
	
$buffer = curl_exec($ch); // Execute the curl request

// Check for errors and process results
$info = curl_getinfo($ch);
if ($info['http_code'] != $successCode) {
    $msgStr = "# Unsuccessful cURL request to ";
    $msgStr .= $url." [". $info['http_code']. "]\n";
} else {
    $msgStr = "# Successful cURL request to ".$url."\n";
}

fb($msgStr);
curl_close($ch); // free resources if curl handle will not be reused
    
?>
