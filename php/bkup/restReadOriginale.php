<?php

// Open log file
    $logfh = fopen("GeoserverPHP.log", 'w') or die("can't open log file");

    // Initiate cURL session
    $service = "http://localhost/geoserver/"; // replace with your URL
    $request = "rest/workspaces"; // to add a new workspace
    $url = $service . $request;
    $ch = curl_init($url);
	
	// Optional settings for debugging
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //option to return string
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_STDERR, $logfh); // logs curl messages

    
    $passwordStr = "admin:GIS"; // replace with your username:password
    curl_setopt($ch, CURLOPT_USERPWD, $passwordStr);
	
    //GET data
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/xml"));

    //GET return code
    $successCode = 200;
	
	$buffer = curl_exec($ch); // Execute the curl request
	
	// Check for errors and process results
    $info = curl_getinfo($ch);
    if ($info['http_code'] != $successCode) {
      $msgStr = "# Unsuccessful cURL request to ";
      $msgStr .= $url." [". $info['http_code']. "]\n";
      fwrite($logfh, $msgStr);
    } else {
      $msgStr = "# Successful cURL request to ".$url."\n";
	  echo $msgStr."<br/>";
	  echo $ch ."<br/>";
	  echo $buffer;
      fwrite($logfh, $msgStr);
    }
    fwrite($logfh, $buffer."\n");

    curl_close($ch); // free resources if curl handle will not be reused
    fclose($logfh);  // close logfile
    
?>
