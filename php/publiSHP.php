<?php

session_start();

if ($_FILES["upload"]["error"] > 0)
  {
  echo "Error: " . $_FILES["upload"]["error"] . "<br>";   
  }
else
  {
   	//checks to see if there was a file uploaded from the file input named 'upload'.
	if($_FILES){			
		if(@is_uploaded_file($_FILES['upload']['tmp_name'])){
			restUpload();
		}
	}		  
}

function restUpload(){
	
include_once('geoserverREST/geoserver_settings.inc');
include_once('inclusioni/datiServer.inc');
include_once('libs/fb/fb.php');

$logfh = fopen("GeoserverPHP.log", 'w') or die("can't open log file");
$data = $_FILES['upload']; 

$filename ='b'.time().$data['name']; 
//fb("filename " . $filename);

$uploads_dir = '../_FILES/';	

if (move_uploaded_file ($_FILES['upload']['tmp_name'],  "$uploads_dir/$filename")) {		
	
	$fp = fopen("$uploads_dir/$filename",'r');  
	$file_parts = pathinfo($filename); 			 
	$file = $file_parts['filename']; 			
	
	//fb("file " . $file);
			
	$serverRadice = BASE_URL;
	//fb("radice  " . $serverRadice);
	$request = "/geoserver/rest/workspaces/gisplatform/datastores/".$file."/file.shp";	
	
	$url = $serverRadice . $request;		
	//fb("url " . $url);
						    
	//Inizializzo la sessione cURL interna a PHP
	$ch = curl_init($url); 
	
	//PARAMETRI SESSIONE IN POST (valore 201 in caso di successo)
	curl_setopt($ch, CURLOPT_USERPWD, $passwordStr);
	curl_setopt($ch, CURLOPT_PUT, 1); 
	curl_setopt($ch, CURLOPT_UPLOAD,true); 
	curl_setopt($ch, CURLOPT_REFERER,true);
	curl_setopt($ch, CURLOPT_INFILE,$fp);
	curl_setopt($ch, CURLOPT_INFILESIZE,filesize("$uploads_dir/$filename"));
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('content-type: application/zip')); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
	curl_setopt($ch, CURLOPT_VERBOSE, true);
	curl_setopt($ch, CURLOPT_STDERR, $logfh); 
	$successCode = 201;	
				
	$buffer = curl_exec($ch); 	
	$info = curl_getinfo($ch);
	
	FB::log($info['content_type']);
	fb("HTTP Code");
	FB::log($info['http_code']);
	$success = "";
		
	if ($info['http_code'] != $successCode) {
				$msgStr = "# Unsuccessful cURL request to ";
				$msgStr .= $url." [". $info['http_code']. "]\n";
				fwrite($logfh, $msgStr);
				$success += "Map creation failed";
				FB::log("Map creation failed");				
	}else{
				$msgStr = "# Successful cURL request to ".$url."\n";
			    fwrite($logfh, $msgStr);
				$success += "Map creation successful";
				FB::log("Map creation succesful");				
	}
		
	fwrite($logfh, $buffer."\n");				   
	curl_close($ch); 
	fclose($logfh);  	
		
	echo '{success:true, file:'. json_encode($filename) .'}';
	//return $success;	
		
}else{
		
	echo "failure=true";
}
} 
?> 
