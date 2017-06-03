<?php

include_once 'libs/fb/fb.php';
include_once 'inclusioni/datiServer.inc';

$dir = "../_FILES/";
$tipiFiles = array();

$filtro = $_POST['model'];
//fb("il filtro scelto " . $filtro);

$cont = 0;
if(is_dir($dir)){
    if($dh = opendir($dir)){        	
        while(($file = readdir($dh)) != false){
           if($file == "." or $file == ".."){
           	//Se e' una directory salto il loop
           } 
           else {
            //Se e' excel lo prendo per metterlo nell'array
			$ext = explode ('.', $file);
			$ext = $ext [count ($ext) - 1];			
				//if ($ext == "xls"){
					if ($ext == $filtro){	
               		//$fileXLS[] = $file; // Add the file to the array
               		$tipiFiles['archivos'][$cont]['nomeFile'] = $file; // Add the file to the array
               		$cont = $cont + 1;
				}
         	}
     	}
	}
	
		
	$filesJSONEncoded = json_encode($tipiFiles);	
	
    echo $filesJSONEncoded;
}

?>