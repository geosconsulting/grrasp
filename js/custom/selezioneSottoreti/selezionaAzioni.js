function selected_feature(event){	
	var max = vectorNodes.selectedFeatures.length;
	gridWin.setTitle(max + ' selected elements');
}

function unselected_feature(event){
	gridWin.setTitle('No selected elements');
}

function disegnaCerchio(lonLat,bufferDiam){	 
			 
	vectorLayerCircle.removeAllFeatures();
	
	//CENTRO
	var point = new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat);
	
	//CERCHIO
	var cerchioSelezione = OpenLayers.Geometry.Polygon.createRegularPolygon
	 	(point,
	 	 bufferDiam * 1000,
	     40,
	     0);

	 featurecircle = new OpenLayers.Feature.Vector(cerchioSelezione);
	 featurePoint = new OpenLayers.Feature.Vector(
	     point,
	     { description: 'info' },
	     { externalGraphic: 'img/x.png', graphicHeight: 18, graphicWidth: 16, graphicXOffset: -9, graphicYOffset: -8 }
	 );
	 vectorLayerCircle.addFeatures([featurecircle,featurePoint]);
	 
} 
