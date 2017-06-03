function addOverlayGasLayers(map,P_4326,P_900913,P_2077) { 

var gas_network = new OpenLayers.Layer.WMS("Gas Network",
			"/geoserver/wms", 
				{
				layers : "grrasp:network",
				transparent : "true",
				format : "image/png"
				,srs: "EPSG:4326"
				},{				
				isBaseLayer : false,
				visibility : false
				}
	);

var gas_impExpnodes = new OpenLayers.Layer.WMS("Gas Import/Export Nodes",
		"/geoserver/wms", 
			{
			layers : "grrasp:import_export_nodes",
			transparent : "true",
			format : "image/png"
			,srs: "EPSG:4326"
			},{				
			isBaseLayer : false,
			visibility : false
			}
);

var gas_points = new OpenLayers.Layer.WMS("Gas Network Nodes",
		"/geoserver/wms", 
			{
			layers : "grrasp:gas_nodes",
			transparent : "true",
			format : "image/png"
			,srs: "EPSG:4326"
			},{				
			isBaseLayer : false,
			visibility : false
			}
);



//Add WMS Overlay
map.addLayers([gas_network, gas_impExpnodes, gas_points]);

};
