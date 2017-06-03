var segmenti,nodes,macro_regions,italian_regions;

function addOverlayLayersLombardy(map,P_4326,P_900913,P_2077) { 

node_lombardy_topo = new OpenLayers.Layer.WMS("Lombardy Nodes",
		"/geoserver/wms", 
		{	
			id:"nodi",				
			layers : "grrasp:nodes_lombardy",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:4326"
		}, {
			isBaseLayer : false,
			visibility : false
		});		

segs_lombardy_topo = new OpenLayers.Layer.WMS("Lombardy Edges",
		"/geoserver/wms", {
			layers : "grrasp:segments_lombardy",
			transparent : "true",
			format : "image/png",
			srs: "EPSG:2077"
		},{
			isBaseLayer : false,
			visibility : false
		});


//Add WMS Overlay
map.addLayers([segs_lombardy_topo,node_lombardy_topo]);

};
