function addOverlayElectricalLayers(map,P_4326,P_900913,P_2077) { 

cross_substation = new OpenLayers.Layer.WMS("Electrical Substation",
			"/geoserver/wms", 
				{
				layers : "grrasp:cross_substation",
				transparent : "true",
				format : "image/png"
				,srs: "EPSG:4326"
				},{				
				isBaseLayer : false,
				visibility : false
				}
	);

elect_network = new OpenLayers.Layer.WMS("Electrical Network",
		"/geoserver/wms", {
		layers : "grrasp:elect_network",
		transparent : "true",
		format : "image/png",
		srs: "EPSG:4326"					
},{
		isBaseLayer : false,
		visibility : false
});
	
power_stations = new OpenLayers.Layer.WMS("Electrical Power Station",
			"/geoserver/wms", 
			{							
				layers : "grrasp:power_stations",
				transparent : "true",
				format : "image/png",
				srs: "EPSG:4326"
			}, {
				isBaseLayer : false,
				visibility : false
			});	

interconnections = new OpenLayers.Layer.WMS("Electrical Interconnessions",
		"/geoserver/wms", {
			layers : "grrasp:interconnections",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		},{
			isBaseLayer : false,
			visibility : false
		});

map.addLayers([cross_substation, elect_network, power_stations, interconnections]);

magg_220 = new OpenLayers.Layer.WMS(
		"Electrical Magg220",
		"/geoserver/wms", 
		{	
			id:"nodi",				
			layers : "grrasp:magg_220",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		}, {
			isBaseLayer : false,
			visibility : false
		});		

transformation_stations = new OpenLayers.Layer.WMS(
		"Electrical Transformation Stations",
		"/geoserver/wms", {
			layers : "grrasp:transformation_stations",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		},{
			isBaseLayer : false,
			visibility : false
		});


transmission_net = new OpenLayers.Layer.WMS(
		"Electrical Transmission Net",
		"/geoserver/wms", {
			layers : "grrasp:transmission_net",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		},{
			isBaseLayer : false,
			visibility : false
		});

//Add WMS Overlay
map.addLayers([magg_220, transformation_stations, transmission_net]);

};
