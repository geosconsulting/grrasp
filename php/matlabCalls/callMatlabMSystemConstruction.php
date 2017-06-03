<?php

include_once '../libs/fb/fb.php';
include_once '../inclusioni/datiServer.inc';

if(isset($_POST['nodoSelezionato'])) {

//fb($_POST['nodoSelezionato']);
$nodo = $_POST['nodoSelezionato'];	
		
$matlabExe = '"d:\\Program Files\\MATLAB\\R2012a\\bin\\matlab.exe"';						

chdir(BASE_PATH);
$currentDir = getcwd();
	
chdir('matlabModels');	     
$inputDir 	= getcwd();	
    
//$command = $matlabExe . " -timing -nojvm ". $inputDir ." -r mainSissy";
$commandOld = $matlabExe . " -nodisplay -nosplash -nodesktop -r mainSissy";

//FUTURO COMANDO CON NODO SELEZIONATO DAL GIS
$command = $matlabExe . " -nodisplay -nosplash -nodesktop -r mainSissy(" . $nodo . ")";	
fb($commandFuturo);

//exec($command);

passthru($command);  
}

?>