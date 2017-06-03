<?php
session_start();

if(isset($_SESSION['utente']))
	echo $_SESSION['utente'];

?>
