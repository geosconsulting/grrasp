<?php 

  if(isset($_FILES)){  	
  	$temp_file_name = $_FILES['filedata']['tmp_name'];
  	$original_file_name = $_FILES['filedata']['name'];
  
  	// Find file extention
  	$ext = explode ('.', $original_file_name);
 	$ext = $ext [count ($ext) - 1];
  
  if ($ext == "xls"){
  	// Remove the extention from the original file name
  	$milliseconds = round(microtime(true) * 1000);
  	$file_name = str_replace ($ext, '', $original_file_name);
  	//$new_name = "../_FILES/" . 'up_'.$file_name . $ext;
  	$new_name = "../_FILES/" . $milliseconds . '_' . $file_name . $ext;

		if (move_uploaded_file ($temp_file_name, $new_name)) {
	    	echo "success=true";		
	   	} else {
	    	echo "failure=true";
	    }
  } else {
  	  /*echo '<script type="text/javascript">
        console.log("formato non consentito");
		</script>';*/
		echo "failure=true";
  }
  
}
?>
