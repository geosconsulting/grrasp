<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
<head>
	
<!--EXT SECTION BEGIN-->
<link rel="stylesheet" type="text/css" href="../../js/ext-3.3.1/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="../../js/ext-3.3.1/resources/css/xtheme-gray.css">
<script type="text/javascript" src="../../js/ext-3.3.1/adapter/ext/ext-base.js" ></script>  
<script type="text/javascript" src="../../js/ext-3.3.1/ext-all.js" ></script>  
<!--EXT SECTION END-->	
	
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Cambia server e database</title>
</head>
<body>

<form action="DBIOM_obj.php" method="post">
	<select name="porta">
		<option value="5433">PostgreSQL 9.2</option>
    	<option value="5432">PostgreSQL 8.4</option>    		
	</select>	
	<select name="db">
		<option value="grid">grid</option>
    	<option value="grid_15">grid_15</option>    	
		<option value="gas_elec_ntwk">reti elect gas</option>
    	<option value="timeseries">politecnico</option>    			
	</select>
	<input type="submit" value="Scegli" />
</form>
</body>
</html>