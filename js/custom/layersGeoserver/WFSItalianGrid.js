function addVectorGridLayers(map,P_4326,P_900913,P_2077) { 	
    
var styleBase = {
			strokeColor: "green", 
		    strokeOpacity: "0.7", 
		    strokeWidth: 2, 
		    fillColor: "blue", 
		    pointRadius: 3, 
		    cursor: "pointer"
};	        
var styleNonSelezionato = OpenLayers.Util.applyDefaults(styleBase, OpenLayers.Feature.Vector.style["default"]);

var styleEvidenziato = {
		label: '${gid}',
	    labelXOffset: 10,	
		labelYOffset: 10,
		fontColor: "red",
	    strokeColor: "red", 
	    fillColor: "red",
	    strokeOpacity: "0.7", 
	    strokeWidth: 2, 
	    pointRadius: 5};
		        
var styleNonSelezionato = OpenLayers.Util.applyDefaults(styleBase, OpenLayers.Feature.Vector.style["default"]);
var styleSelezionato = OpenLayers.Util.applyDefaults(styleEvidenziato, OpenLayers.Feature.Vector.style["select"]);

var stylemap = new OpenLayers.StyleMap({
		'default': styleNonSelezionato,
		'select': styleSelezionato
});
	               
vectorNodes = new OpenLayers.Layer.Vector("Nodes", 
		{
	    strategies: [new OpenLayers.Strategy.BBOX()],
	    styleMap: stylemap,
	    protocol: new OpenLayers.Protocol.WFS({
	        url:  "/geoserver/wfs",
	        featureType: "nodes_900913",
	        featureNS: "www.gisplatform.it"
	    }),		
	    isBaseLayer : false,
	    visibility : false
	    });		
map.addLayer(vectorNodes);

vectorSegments = new OpenLayers.Layer.Vector("Segments", 
			{
		    strategies: [new OpenLayers.Strategy.BBOX()],
		    styleMap: stylemap,
		    protocol: new OpenLayers.Protocol.WFS({
		        url:  "/geoserver/wfs",
		        featureType: "segments_900913",
		        featureNS: "www.gisplatform.it"
		    }),
		    isBaseLayer : false,
		    visibility : false
		    });		
map.addLayer(vectorSegments);
	

};

