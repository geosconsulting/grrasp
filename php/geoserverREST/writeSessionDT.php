<?php
session_start();
 
if(isset($_POST['nomeDTAttivo'])) {	
	$_SESSION['nomeDTAttivo'] = $_POST['nomeDTAttivo'];
}else {
	$_SESSION['nomeDTAttivo'] = 'gisplatform';	
};
	
?>