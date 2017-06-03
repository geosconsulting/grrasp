<?php

include_once '../inclusioni/DBconnect.inc';
// comando sql
$sql = "SELECT * FROM public.nodes_it_attrib";

if(!$query = @pg_query($sql))
die("Errore nella query: " . pg_last_error($conn));
echo <<<EOD

<table border="1" cellspacing="2" cellpadding="5">
    <tr>   
    	<td><b>contatore</b></td> 	
        <td><b>id</b></td>
        <td><b>desc</b></td>
        <td><b>link_type</b></td>        
    </tr>

EOD;

$contatore = 1;
while($row = pg_fetch_assoc($query)) {
    echo "<tr>";
	echo "<td>$contatore</td>";
    echo "<td>{$row['gid']}</td>";
    echo "<td>{$row['desc']}</td>";
    echo "<td>{$row['node_type']}</td>";
	echo "</tr>";
	$contatore++;
}

echo <<<EOD

</table>
EOD;

// close connection
pg_close($conn);

?>
