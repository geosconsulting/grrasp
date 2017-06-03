var nuts2;

function addOverlayLayersBaseline(map,P_4326,P_900913,P_2077) { 

european_countries = new OpenLayers.Layer.WMS(
		"EU Countries",
		"/geoserver/wms", {
		layers : "grrasp:nations_euro",
		transparent : "true",
		format : "image/png",
		srs: "EPSG:4326"					
	},{
		isBaseLayer : false,
		visibility : false
});
map.addLayer(european_countries);	

nuts2 = new OpenLayers.Layer.WMS(
		"Regions",
		"/geoserver/wms", {
		layers : "grrasp:nuts2",
		transparent : "true",
		format : "image/png",
		srs: "EPSG:4326"					
	},{
		isBaseLayer : false,
		visibility : false
}); 
map.addLayer(nuts2);
	
builtup_eu = new OpenLayers.Layer.WMS(
	"BuiltUp Areas",
	"/geoserver/wms", {
	layers : "grrasp:builtup_eu",
	transparent : "true",
	format : "image/png",
	srs: "EPSG:4326"
},{
	isBaseLayer : false,
	visibility : false
});

waterbodies_eu = new OpenLayers.Layer.WMS(
	"Water Bodies",
	"/geoserver/wms", {
	layers : "grrasp:waterbodies_eu",
	transparent : "true",
	format : "image/png",
	srs: "EPSG:4326"
},{
	isBaseLayer : false,
	visibility : false
});

//Add WMS Overlay
map.addLayers([builtup_eu,waterbodies_eu]);

};
