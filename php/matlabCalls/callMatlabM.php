<?php

include_once '../libs/fb/fb.php';
include_once '../inclusioni/datiServer.inc';

if(isset($_POST['fileName'])) {
	
	$matlabExe = '"d:\\Program Files\\MATLAB\\R2012a\\bin\\matlab.exe"';						
	
	$filename  = $_POST['fileName'];
	//fb("File corrente " . $filename);
	
	chdir(BASE_PATH);
    $currentDir = getcwd();
	//fb("Dir corrente " . $currentDir);
	
	chdir('matlabModels');	     
    $inputDir 	= getcwd();
	//fb("Dir modelli  " . $inputDir);
	
	chdir(BASE_PATH);
	chdir('_FILES');
	$outputDir 	= getcwd();	 
	//fb("Dir output   " . $outputDir);
    
    $command = $matlabExe . " -nodisplay -nosplash -nodesktop -sd ". $inputDir ." -r RandomNumbers('". $outputDir. '\\' . $filename."')";	
    //$command = "matlab -sd ". $inputDir ." -r phpcreatefile('". $outputDir. '\\' . $filename."')";
	
	//fb($command);
	
	//exec($command);	
	passthru($command);  
	$fileCreato = $outputDir. '\\' . $filename;
		
} 

echo $fileCreato;
    	
?>