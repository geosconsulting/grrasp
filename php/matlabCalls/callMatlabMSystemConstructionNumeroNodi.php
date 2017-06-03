<?php

include_once '../libs/fb/fb.php';
include_once '../inclusioni/datiServer.inc';

if(isset($_POST['numeroNodiSimulazione'])) {

fb($_POST['numeroNodiSimulazione']);

$numeroNodi = $_POST['numeroNodiSimulazione'];
		
$matlabExe = '"d:\\Program Files\\MATLAB\\R2012a\\bin\\matlab.exe"';						

chdir(BASE_PATH);
$currentDir = getcwd();
	
chdir('matlabModels');	     
$inputDir 	= getcwd();	
    
//$command = $matlabExe . " -timing -nojvm ". $inputDir ." -r mainSissy";
$commandOld = $matlabExe . " -nodisplay -nosplash -nodesktop -r mainSissy";

//FUTURO COMANDO CON NODO SELEZIONATO DAL GIS
//$command = $matlabExe . " -nodisplay -nosplash -nodesktop -r MetaNet(" . $numeroNodi . ")";
$command = $matlabExe . " -nojvm -minimize -r MetaNet(" . $numeroNodi . ");";	
passthru($command);  
}

?>