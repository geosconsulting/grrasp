<?php

include("../inclusioni/DBconnectGrid.inc");
include("../libs/fb/fb.php");

$tabellaNome = $_POST['tabAttiva'];
$featureID 	 = $_POST['fidAttiva'];


$query = <<<EOQ
	SELECT ST_extent($tabellaNome.the_geom)
	FROM   public.$tabellaNome
	WHERE  $tabellaNome.gid = $featureID;
EOQ;

$result = pg_query($conn,$query);    

if (!$result) {
    echo "Problem with query " . $query . "<br/>";
    echo pg_last_error();
    exit();
     }

while ($row = pg_fetch_array($result)) {
  $BBOX_PA = $row[0];
  $BBOX_PA= trim($BBOX_PA);  
}

echo($BBOX_PA);

pg_close($conn);
?>
