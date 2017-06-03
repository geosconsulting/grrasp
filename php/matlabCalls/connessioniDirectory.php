<?php

include_once '../libs/fb/fb.php';
include_once '../inclusioni/datiServer.inc';


class ConnessioneDirectory{
	
	public $filename;		     
   
    public $inputDir;	
	public $outputDir;	
	public $matlabDir; 
	
		
	public function __construct($inputDir,$outputDir,$matlabDir){
		$this->inputDir =  $inputDir;
		
	}
	
	
}


?>