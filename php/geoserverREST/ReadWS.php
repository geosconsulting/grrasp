<?php 		

include('geoserver_settings.php');
include_once '../libs/fb/fb.php';  
ob_start();
    
$request = "workspaces"; // to add a new workspace      
$url = $service . $request;
fb($url);    

$ch = curl_init($url);
	
// Optional settings for debugging
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //option to return string
curl_setopt($ch, CURLOPT_VERBOSE, true);
        
curl_setopt($ch, CURLOPT_USERPWD, $passwordStr);
	
//GET data
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));

//GET return code
$successCode = 200;
$buffer = curl_exec($ch); // Execute the curl request
	
// Check for errors and process results
$info = curl_getinfo($ch);
if ($info['http_code'] != $successCode) {
    $msgStr = "# Unsuccessful cURL request to ";
    $msgStr .= $url." [". $info['http_code']. "]\n";    
} else {      
    echo $buffer;      
}
curl_close($ch); // free resources if curl handle will not be reused        
?>
