<?php

// connessione
$conn = pg_connect("host=localhost port=5432 dbname=grid_15 user=postgres password=GIS");
if (!$conn) {
	die("Error in connection: " . pg_last_error());
}


?>