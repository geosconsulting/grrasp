<?php

include_once '../inclusioni/DBconnect.inc';

$sql = "SELECT * FROM public.nodes_it_attrib";

if(!$query = @pg_query($sql))
die("Errore nella query: " . pg_last_error($conn));
echo <<<EOD

<table border="1" cellspacing="2" cellpadding="5">
    <tr>   
    	<td><b>contatore</b></td> 	
        <td><b>id_0</b></td>
        <td><b>nome</b></td>
        <td><b>tipo</b></td>  
        <td><b>id</b></td>      
    </tr>

EOD;

$contatore = 1;
while($row = pg_fetch_assoc($query)) {
    echo "<tr>";
	echo "<td>$contatore</td>";
    echo "<td>{$row['id_0']}</td>";
    echo "<td>{$row['nome']}</td>";
    echo "<td>{$row['tipo']}</td>";
	echo "<td>{$row['id']}</td>";
	echo "</tr>";
	$contatore++;
}

echo <<<EOD

</table>
EOD;

// close connection
pg_close($conn);

?>
