<?php

//connessione
$conn = pg_connect("host=localhost port=5433 dbname=grid user=postgres password=GIS");
if (!$conn) {
	die("Error in connection: " . pg_last_error());
}

?>