function addOverlayElectricalLayers(map,P_4326,P_900913,P_2077) { 

dtelek_nodes = new OpenLayers.Layer.WMS("www Deutsche Telekom Edges",
			"/geoserver/wms", 
				{
				layers : "gisplatform:dtelek_nodes",
				transparent : "true",
				format : "image/png"
				,srs: "EPSG:4326"
				},{				
				isBaseLayer : false,
				visibility : false
				}
	);


dtelek_edges = new OpenLayers.Layer.WMS("www Deutsche Telekom Edges",
		"/geoserver/wms", {
		layers : "gisplatform:dtelek_edges",
		transparent : "true",
		format : "image/png",
		srs: "EPSG:4326"					
},{
		isBaseLayer : false,
		visibility : false
});

	
ntt_nodes = new OpenLayers.Layer.WMS("www NTT Edges",
			"/geoserver/wms", 
			{							
				layers : "gisplatform:ntt_nodes",
				transparent : "true",
				format : "image/png",
				srs: "EPSG:4326"
			}, {
				isBaseLayer : false,
				visibility : false
			});	


ntt_edges = new OpenLayers.Layer.WMS("www NTT Edges",
		"/geoserver/wms", {
			layers : "gisplatform:ntt_edges",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		},{
			isBaseLayer : false,
			visibility : false
		});

tinet_nodes = new OpenLayers.Layer.WMS("www TINET Nodes",
		"/geoserver/wms", 
		{
			layers : "gisplatform:tinet_nodes",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		},{
			isBaseLayer : false,
			visibility : false
		});

tinet_edges = new OpenLayers.Layer.WMS("www TINET Edges",
		"/geoserver/wms", 
		{							
			layers : "gisplatform:tinet_edges",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		}, {
			isBaseLayer : false,
			visibility : false
		});

cogentco_nodes = new OpenLayers.Layer.WMS("www COGENTCO Nodes",
		"/geoserver/wms", 
		{
			layers : "gisplatform:cogentco_nodes",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		},{
			isBaseLayer : false,
			visibility : false
		});


cogentco_edges = new OpenLayers.Layer.WMS("www COGENTCO Edges",
		"/geoserver/wms", 
		{							
			layers : "gisplatform:cogentco_edges",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		}, {
			isBaseLayer : false,
			visibility : false
		});	



map.addLayers([cross_substation, elect_network, power_stations, interconnections]);
map.addLayers([cross_substation, elect_network, power_stations, interconnections]);

};
