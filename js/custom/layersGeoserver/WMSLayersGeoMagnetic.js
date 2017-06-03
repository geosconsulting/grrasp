function addOverlayGeomagneticLayers(map,P_4326,P_900913,P_2077) { 
	
var soil = new OpenLayers.Layer.WMS("GM Soil of Europe",
		"/geoserver/wms", 
		{
		layers : "gisplatform:soil_euro",
		transparent : "true",
		format : "image/png"
		,srs: "EPSG:4326"
		},{				
		isBaseLayer : false,
		visibility : false
		}
);
	
var wmm2013_f = new OpenLayers.Layer.WMS("GM Main field total intensity (F)",
			"/geoserver/wms", 
				{
				layers : "gisplatform:wmm2013_f",
				transparent : "true",
				format : "image/png"
				,srs: "EPSG:4326"
				},{				
				isBaseLayer : false,
				visibility : false
				}
	);

var wmm2013_d = new OpenLayers.Layer.WMS("GM Main field declination (D)",
		"/geoserver/wms", 
			{
			layers : "gisplatform:wmm2013_d",
			transparent : "true",
			format : "image/png"
			,srs: "EPSG:4326"
			},{				
			isBaseLayer : false,
			visibility : false
			}
);

//Add WMS Overlay
map.addLayers([wmm2013_d, wmm2013_f,soil]);

};
