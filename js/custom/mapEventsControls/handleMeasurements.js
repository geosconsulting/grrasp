function handleMeasurements(event) {
  
  var geometry = event.geometry;
  var units = event.units;
  var order = event.order;
  var measure = event.measure;
  var element = Ext.getCmp('measure');
  var elementMisura = Ext.getCmp('misura');
  var out = "";
  var outMis = "";
  
  if(order == 1) {        
	    if (map.getProjection() == "EPSG:4326") {
	    	out = "Distance in"+ " km";
	    	outMis += calcVincenty(geometry).toFixed(3) ;
	    } else {
	      out = "Distance in " + units ;
	      outMis += measure.toFixed(3) ;     
	    }  
  }
  else{
	 out = "Area in sq" + units;  
	 outMis += measure.toFixed(3) ;
	 
  }  
  
  element.setText(out);
  elementMisura.setText(outMis);
}