<?php

// connessione
$conn = pg_connect("host=localhost dbname=grid user=postgres password=GIS");
if (!$conn) {
	die("Error in connection: " . pg_last_error());
}

?>