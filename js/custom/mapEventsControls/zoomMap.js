function zoomEstensioneLayer (map,layerZummolo){
	
		var mapS = map.getSize();
		var mapPanelS = mapPanel.getSize();
		var panW= mapPanelS.width;
		var panH= mapPanelS.height;
		
		//console.log(mapS + "/" + "w=" + panW + ",h=" +panH)
		
		var illo= map.getLayersByName(layerZummolo);
		var mex = illo[0].getExtent();	
		console.log(mex);
								
		var bounds = mex.transform(P_900913,P_4326);	
		
		console.log(bounds);		
		map.zoomToExtent(mex);	
	
}