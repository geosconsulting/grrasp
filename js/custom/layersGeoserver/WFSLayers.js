var wfs_layer_lines,wfs_layer_point,WFSEconomicImpact,styleRegioniImpattoSingleValue;
var select_feature_control,select_feature_segmenti;

function addVectorLayers(map,P_4326,P_900913,P_2077) { 	
    
var strat_bbox = [new OpenLayers.Strategy.BBOX()];
var strat_cluster = [new OpenLayers.Strategy.Cluster({distance: 75})];
    
wfs_layer_lines = new OpenLayers.Layer.Vector("Editable Lines", {
    	strategies: [
    	     new OpenLayers.Strategy.BBOX(), 
    	     saveStrategyLine
    	],    	 
    	//projection: P_900913,
    	protocol: new OpenLayers.Protocol.WFS({
    	//version: "1.1.0",    		
    	url: "/geoserver/wfs",    		         
        featureNS: "www.gisplatform.it",
        featureType: "segs_edit",
        //maxExtent: mapextent,    		
    	geometryName: "the_geom"
    	,schema: "/geoserver/wfs?service=wfs&version=1.1.0&request=DescribeFeatureType&typeName=gislatform:segs_edit"
     	}),
        //styleMap: styles,
     	displayInLayerSwitcher: false
     });

//CREO UN CONTROLLO PER I NODI
select_feature_segmenti = new OpenLayers.Control.SelectFeature(
	wfs_layer_lines,
	{
		multiple: false,
		toggle:true,				
		hover:false
	}
);
//AGGIUNGO IL CONTROLLO ALLA MAPPA
map.addControl(select_feature_segmenti);

//REGISTRO IL CONTROLLO PER L'EVENTO SELEZIONA E DESELEZIONA
wfs_layer_lines.events.register('featureselected',this,selected_feature_segmenti);
wfs_layer_lines.events.register('featureunselected',this,unselected_feature_segmenti);

wfs_layer_point = new OpenLayers.Layer.Vector("Editable Nodes", {
    	strategies: [
    	    new OpenLayers.Strategy.BBOX(), 
    	    saveStrategyPoint
    	],
    	//projection: P_900913,
    	protocol: new OpenLayers.Protocol.WFS({
    	//version: "1.1.0",    		
    	url: "/geoserver/wfs",    				 	         
        featureNS: "www.gisplatform.it",    			          
    	featureType: "nodi_edit",     
    	//maxExtent: mapextent,
    	geometryName: "the_geom"
    	,schema: "/geoserver/wfs?service=wfs&version=1.1.0&request=DescribeFeatureType&typeName=gislatform:nodi_edit"
     	}),
        styleMap: styles, 
     	displayInLayerSwitcher: false
     });

//CREO UN CONTROLLO PER I NODI
select_feature_control = new OpenLayers.Control.SelectFeature(
		wfs_layer_point,
			{
			multiple :false,
			toggle:true,				
			hover:false
			}
		);
//AGGIUNGO IL CONTROLLO DI SELEZIONE ALLA MAPPA PER I PUNTI
map.addControl(select_feature_control);

//REGISTRO IL CONTROLLO PER L'EVENTO SELEZIONA E DESELEZIONA
wfs_layer_point.events.register('featureselected',this,selected_feature_nodi);
wfs_layer_point.events.register('featureunselected',this,unselected_feature_nodi);
	
//map.addLayers([wfs_layer_lines,wfs_layer_point]);

var defStyleRegioniImpatto = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);        
OpenLayers.Util.extend(defStyleRegioniImpatto ,
			{			
			strokeWidth: 2,		
			strokeColor : 'black',
			fillColor :'white'
			});	
    
var selStyleRegioniImpatto = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['select']);        
	OpenLayers.Util.extend(selStyleRegioniImpatto , 
			{             
            labelOutlineColor: "white",
            labelOutlineWidth: 3,
			cursor: 'crosshair',
			strokeWidth: '2', 
			strokeColor: 'white',
			fillColor:'red'
			});	
	
styleRegioniImpattoSingleValue = new OpenLayers.StyleMap({
        "default": defStyleRegioniImpatto,
        "select": selStyleRegioniImpatto
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
    projection: P_4326//,
    //style : styleRegioniImpattoSingleValue
});
//map.addLayer(WFSEconomicImpact);

ruleEconomicImpact = new OpenLayers.Rule({     
    symbolizer: {
        fillColor: "#ff0000",
        strokeColor: "#ffcccc",
        fillOpacity: "0.5"
    }    
});

regioniImpactStyle = new OpenLayers.StyleMap(
		new OpenLayers.Style({}, 
   	    	 {rules: ruleEconomicImpact})
);

//WFSEconomicImpact.styleMap = regioniImpactStyle;

};

