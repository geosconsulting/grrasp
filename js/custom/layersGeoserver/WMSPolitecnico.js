function addOverlayPolitecnicoLayers(map,P_4326,P_900913,P_2077) { 

var nodi_milano = new OpenLayers.Layer.WMS("TS Punctual Nodes",
			"/geoserver/wms", 
				{
				layers : "gisplatform:nodes_milano",
				transparent : "true",
				format : "image/png"
				,srs: "EPSG:3857"
				},{				
				isBaseLayer : false,
				visibility : false
				}
	);	
	
var linee_milano = new OpenLayers.Layer.WMS("TS Linear Nodes",
			"/geoserver/wms", 
				{
				layers : "gisplatform:lines_milano",
				transparent : "true",
				format : "image/png"
				,srs: "EPSG:3857"
				},{				
				isBaseLayer : false,
				visibility : false
				}
	);

var poly_milano = new OpenLayers.Layer.WMS("TS Areal Nodes",
		"/geoserver/wms", 
			{
			layers : "gisplatform:polys_milano",
			transparent : "true",
			format : "image/png"
			,srs: "EPSG:3857"
			},{				
			isBaseLayer : false,
			visibility : false
			}
);

map.addLayers([nodi_milano, linee_milano, poly_milano]);

};
