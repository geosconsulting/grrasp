var WFSEconomicImpact,styleRegioniImpattoSingleValue;

function addVectorLayers(map,P_4326,P_900913,P_2077) { 	

var defaultStyleImpatto = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);        

OpenLayers.Util.extend(defaultStyleImpatto ,
			{			
			strokeWidth: 2,		
			strokeColor : 'black',
			fillColor :'white'
			});	
    
var selezioneStyleImpatto = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['select']);        

OpenLayers.Util.extend(selezioneStyleImpatto , 
			{             
            labelOutlineColor: "white",
            labelOutlineWidth: 3,
			cursor: 'crosshair',
			strokeWidth: '2', 
			strokeColor: 'white',
			fillColor:'red'
			});	
	
styleImpatto = new OpenLayers.StyleMap({
        "default": defaultStyleImpatto,
        "select": selezioneStyleImpatto
    });

WFSEconomicImpact = new OpenLayers.Layer.Vector("Economic Impact", {
    strategies: [new OpenLayers.Strategy.BBOX()],
    protocol: new OpenLayers.Protocol.WFS({
        version: "1.0.0",
        srsName: "EPSG:4326", 
        url:  "/geoserver/wfs",
        featureType: "impact",
        featureNS: "www.gisplatform.it"
    }),
    projection: P_4326
    //,style : styleImpatto
});
//map.addLayer(WFSEconomicImpact);

};

