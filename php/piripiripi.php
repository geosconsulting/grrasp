<?php

include_once 'libs/dBug.php';

$a = 3;

function foo(){
	global $a;
	$a +=2;
}

foo();

new dBug($a);

$arrayuccio = array("Pippo","Palla","Pertica");

new dBug($arrayuccio);
echo "<br />";

foreach ($arrayuccio as $key=>$value){
	echo $value . "<br />";	
}

echo "<br />";

foreach ($arrayuccio as $tipo){
	echo $tipo . "<br />";	
}


?>
