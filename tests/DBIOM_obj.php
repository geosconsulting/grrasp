 <?php  

include_once '../inclusioni/DBConn_obj.php';
include_once '../libs/fb/fb.php';

$porta		= $_POST['porta'];
$database 	= $_POST['db'];
       
//"host=localhost port=5433 dbname=grid user=postgres password=GIS"
$newConn = new Connessione('localhost', $porta, $database,'postgres','GIS');
        
//echo $newConn->stringaConnessione(); 

$conn = pg_connect($newConn->stringaConnessione());
if (!$conn) {
	die("Error in connection: " . pg_last_error());
} 

$tabelle = $newConn->mostraTabelle($conn);

pg_close($conn);
    
?>  
