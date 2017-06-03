<?php

include_once '../inclusioni/datiServer.inc';
include_once '../libs/fb/fb.php';

set_time_limit(0);
$timeout = 30; // sec
putenv('PATH='.getenv('PATH').'; d:\Program Files\MATLAB\MATLAB Compiler Runtime\v81\runtime\win64');	

chdir(BASE_PATH . '/matlabModels/');

$eseguibile 	= 'IOM.exe';
$paese  		= $_POST['paese'];
$algoritmo  	= $_POST['algoritmo'];
$ultimoutput    = $paese . ".csv";

$comandoEseguibile = $eseguibile . " \"". $paese . "\" " . $algoritmo;		
$err=0;

passthru($comandoEseguibile,$err);	

try{
	$giaScritto=file_exists($ultimoutput);	
	fb($giaScritto);
	while($giaScritto){				
		if ($ultimoutput !== false) {
			if(is_file($ultimoutput) && is_readable($ultimoutput)){
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

fb($err)

?>
