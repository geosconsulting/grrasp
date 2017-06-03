<?php
session_start();

if(isset($_SESSION['utente']))
  unset($_SESSION['utente']);

?>