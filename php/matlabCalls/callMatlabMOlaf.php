<?php

include_once '../libs/fb/fb.php';
include_once '../inclusioni/datiServer.inc';

$matlabExe = '"d:\\Program Files\\MATLAB\\R2012a\\bin\\matlab.exe"';

$paese  = $_POST['paese'];

if(isset($paese)){		
	chdir(BASE_PATH);
	chdir('matlabModels');	     
    $inputDir 	= getcwd();
	//fb("Dir modelli  " . $inputDir);
	
	chdir(BASE_PATH);
	chdir('_FILES');
	$outputDir 	= getcwd();	 
	//fb("Dir output   " . $outputDir);
    
    $command = $matlabExe . " -nodisplay -nosplash -nodesktop -sd ". $inputDir ." -r mainIO2MA('" . $paese . "')";	
	//fb($command);
		
	exec($command, $output, $return);
}else{
	fb("Problem");
};
	
    	
?>