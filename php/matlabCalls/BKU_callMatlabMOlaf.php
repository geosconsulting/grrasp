<?php

include_once '../libs/fb/fb.php';
include_once '../inclusioni/datiServer.inc';

$matlabExe = '"d:\\Program Files\\MATLAB\\R2012a\\bin\\matlab.exe"';

//$filename  = $_POST['fileName'];
$filename = MATLAB_PATH . 'DataInput.mat';

if(file_exists($filename)){
		
	chdir(BASE_PATH);
	chdir('matlabModels');	     
    $inputDir 	= getcwd();
	fb("Dir modelli  " . $inputDir);
	
	chdir(BASE_PATH);
	chdir('_FILES');
	$outputDir 	= getcwd();	 
	fb("Dir output   " . $outputDir);
    
    $command = $matlabExe . " -nodisplay -nosplash -nodesktop -sd ". $inputDir ." -r OlafOriginal";	
	fb($command);
	
	exec($command, $output, $return);	
	var_dump($output); 
	
	$fileCreato = $outputDir. '\\' . $filename;
	echo $fileCreato;

}else{
		
	fb('non esiste' . $filename);
};
	
    	
?>