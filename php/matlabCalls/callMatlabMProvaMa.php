<?php

include_once '../libs/fb/fb.php';
include_once '../inclusioni/datiServer.inc';

if(isset($_POST['fileName'])) {
							
	$filename  = $_POST['fileName'];		
    
	chdir(BASE_PATH);
    //$currentDir = getcwd();
	//fb("Dir corrente " . $currentDir);
	
	chdir('matlabModels');	     
    $inputDir 	= getcwd();
	//fb("Dir modelli  " . $inputDir);
	
	chdir(BASE_PATH);
	chdir('_FILES');
	$outputDir 	= getcwd();	 
	//fb("Dir output   " . $outputDir);
	
	chdir('d:\\Program Files\\MATLAB\\R2012a\\bin\\');	
    $command = "matlab -sd ". $inputDir ." -nodesktop -nosplash -r ProvaMa('[1,2;3,4]')";
	
	fb($command);
	
	exec($command,$output,$ritorno);  

	$fileCreato = $outputDir. '\\' . $filename;
		
} 

echo $fileCreato;
    	
?>