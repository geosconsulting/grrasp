
function addOverlayTransportationLayers(map,P_4326,P_900913,P_2077) { 

airport_eu = new OpenLayers.Layer.WMS("TR-Airports",
		"geoserver/grrasp/wms", {
		layers : "grrasp:airport_eu",
		transparent : "true",
		format : "image/png",
		srs: "EPSG:4326"
	},{
		isBaseLayer : false,
		visibility : false
	});

ports = new OpenLayers.Layer.WMS("TR-Ports",
	"/geoserver/wms", {
	layers : "grrasp:ports_eu",
	transparent : "true",
	format : "image/png",
	srs: "EPSG:4326"
},{
	isBaseLayer : false,
	visibility : false
});


linearwater_eu = new OpenLayers.Layer.WMS("TR-Hydro Network",
	"/geoserver/wms",
	{
	layers : "grrasp:linearwater_eu",
	transparent : "true",
	format : "image/png",
	srs: "EPSG:4326"
},{
	isBaseLayer : false,
	visibility : false
});

railroad_eu = new OpenLayers.Layer.WMS("TR-Railroad Network",
	"/geoserver/wms", {
	layers : "grrasp:railroad_eu",
	transparent : "true",
	format : "image/png",
	srs: "EPSG:4326"
},{
	isBaseLayer : false,
	visibility : false
});

roads_eu = new OpenLayers.Layer.WMS("TR-Road Network",
	"/geoserver/wms", {
	layers : "grrasp:roads_eu",
	transparent : "true",
	format : "image/png",
	srs: "EPSG:4326"
},{
	isBaseLayer : false,
	visibility : false
});

map.addLayers([linearwater_eu,railroad_eu,roads_eu]);
map.addLayers([airport_eu,ports]);

};
