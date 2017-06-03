<?php

session_start();
 
if(isset($_POST['nomeWSAttivo'])) {	
	$_SESSION['nomeWSAttivo'] = $_POST['nomeWSAttivo'];
}else {
	$_SESSION['nomeWSAttivo'] = 'gisplatform';	
};
	
?>