<?php

	include_once 'geoserver_settings.inc';	
      
    if(isset($_POST['nomeWorkspaceDel'])) {	
		$wsName  = $_POST['nomeWorkspaceDel'];
	};    
    
    $request = "workspaces/" . $wsName; // to add a new workspace
    $url = $service . $request;
    $ch = curl_init($url);

    // Optional settings for debugging
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //option to return string
    curl_setopt($ch, CURLOPT_VERBOSE, true);
	

    //Required DELETE request settings
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
   
    curl_setopt($ch, CURLOPT_USERPWD, $passwordStr);

    //POST data
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/xml"));
	
    //POST return code
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

    curl_close($ch); // free resources if curl handle will not be reused
    
?>
