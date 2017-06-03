<?php
session_start();

$loginUsername = isset($_POST["loginUsername"]) ? $_POST["loginUsername"] : "";
$loginPWD = isset($_POST["loginPassword"]) ? $_POST["loginPassword"] : "";
 
if($loginUsername == "STA" && $loginPWD=="STA"){
	$_SESSION['utente'] = $loginUsername;
	$_SESSION['password'] = $loginPWD;	
	echo "{success: true}";	
} else {
    echo "{success: false, errors: { reason: 'Login failed. Try again.' }}";
}

?>