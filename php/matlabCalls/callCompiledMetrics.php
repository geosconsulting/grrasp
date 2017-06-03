<?php

//ob_start();
include_once '../libs/fb/fb.php';
include_once '../inclusioni/datiServer.inc';

set_time_limit(0);
$timeout = 30; // sec
//putenv('PATH='.getenv('PATH').'; d:\Program Files\MATLAB\MATLAB Compiler Runtime\v717\runtime\win64');
putenv('PATH='.getenv('PATH').'; d:\Program Files\MATLAB\MATLAB Compiler Runtime\v81\runtime\win64');	

chdir(BASE_PATH . '/matlabModels/');
$eseguibile = 'Metriche.exe';

$fileInput = BASE_PATH . "/_FILES/". $_POST['fileCalcolo'];

$pathCritico = $_POST['pathCritico'];	

$comandoEseguibile;
if(file_exists($fileInput)){
	$nodoEntrata		= $_POST['nodoEntrata'];
	$nodoUscita			= $_POST['nodoUscita'];
	$comandoEseguibile 	= $eseguibile . " \"". $fileInput . "\" " . $nodoEntrata . " ". $nodoUscita;		
}

//$sottostringaSenzaEstensioneFile = substr($fileInput, 0, strlen($fileInput) - 4);

$output = '';
if ($pathCritico=='true'){
	//$output =  $sottostringaSenzaEstensioneFile . '-Paths.csv';
	$output = $fileInput . '-Paths.csv';
} else {
	//$output = $sottostringaSenzaEstensioneFile  . '-CCLocalGlobal.csv';
	$output = $fileInput . '-CCLocalGlobal.csv';	
} 

passthru($comandoEseguibile);

try{	
	$giaScritto=file_exists($output);	
	fb($giaScritto);
	while($giaScritto){				
		if ($output !== false) {
			if(is_file($output) && is_readable($output)){
               	echo "success";
               	break;
           	}
		}
				
		 // Check Timeout
        if ((time() - $start) > $timeout) {
            throw new Exception("Timeout Reached");
            break;
        }
	}
} catch (Exception $e) {
	echo $e->getMessage();
	break;	
}

?>
