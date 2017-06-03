var macro_regions,italian_regions,impact,outage;

function addOverlayItalianLayers(map,P_4326,P_900913,P_2077) { 

macro_regions = new OpenLayers.Layer.WMS("Italian Macro Regions",
			"/geoserver/wms", 
				{
				layers : "gisplatform:macro_regions",
				transparent : "true",
				format : "image/png"
				,srs: "EPSG:2077"
				},{				
				isBaseLayer : false,
				visibility : false
				}
	);


italian_regions = new OpenLayers.Layer.WMS("Italian Regions",
		"/geoserver/wms", {
		layers : "gisplatform:italian_regions",
		transparent : "true",
		format : "image/png",
		srs: "EPSG:2077"					
},{
		isBaseLayer : false,
		visibility : false
});
map.addLayer(italian_regions);


impact = new OpenLayers.Layer.WMS("Italian Economic Impact",
		"/geoserver/wms", {
			layers : "gisplatform:impact",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		},{
			isBaseLayer : false,
			visibility : false
		});

outage = new OpenLayers.Layer.WMS("Italian Outage Time",
		"/geoserver/wms", {
			layers : "gisplatform:outage",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		},{
			isBaseLayer : false,
			visibility : false
		});

//Add WMS Overlay
map.addLayers([macro_regions, italian_regions]);
map.addLayers([impact,outage]);

};
