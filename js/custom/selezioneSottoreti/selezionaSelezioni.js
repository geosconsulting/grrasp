var selezFeatSingola;
var selezFeatMultiple;
var layerPoligoni;
var SelectFeaturePoligonale;
var SelectFeatureCircolare;
var selezionaRegione;
var pfilter;

function selezioni(){
	
//SELEZIONE SINGOLA
//SELEZIONE SINGOLA
selezFeatSingola = new OpenLayers.Control.SelectFeature(
		layerAttivo,
	    {
	    	clickout: true, 
	        toggle: false,
	        multiple: false, 
	        hover: false,
	        toggleKey: "ctrlKey",    
	        multipleKey: "shiftKey", 
	        box: false
	     }
	);
map.addControl(selezFeatSingola); 

selezFeatSingola.events.on({
	'featureselected': function(feature) {
		//console.log(layerAttivo[0].selectedFeatures.length + " selezionati");
}
});
//SELEZIONE SINGOLA
//SELEZIONE SINGOLA

//SELEZIONE MULTIPLA
//SELEZIONE MULTIPLA
selezFeatMultiple = new OpenLayers.Control.SelectFeature(
		layerAttivo,
	    {
	    	clickout: true, 
	        toggle: false,
	        multiple: false, 
	        hover: false,
	        toggleKey: "ctrlKey", 
	        multipleKey: "shiftKey", 
	        box: true
	     }
	);
map.addControl(selezFeatMultiple); 

selezFeatMultiple.events.on({
	'boxselectionend': function(feature) {
		//console.log(layerAttivo.selectedFeatures.length + " selezionati");
		//layerWin.setTitle(layerAttivo.selectedFeatures.length + " selected")
	},
	'featurehighlighted' : function(feature) { 
		//console.log(vectorNodes.selectedFeatures.length + " selezionati");
	}
});
//SELEZIONE MULTIPLA
//SELEZIONE MULTIPLA

//SELEZIONE PER POLIGONO
//SELEZIONE PER POLIGONO
SelectFeaturePoligonale = new OpenLayers.Control.SelectFeature(
		layerAttivo,
	    {
	    	clickout: true, 
	        toggle: false,
	        multiple: false, 
	        hover: false,
	        toggleKey: "ctrlKey", 
	        multipleKey: "shiftKey", 
	        box: true
	     }
	);
map.addControl(SelectFeaturePoligonale); 

layerPoligoni.events.register("featureadded", this, function (){ });

layerPoligoni.events.register("beforefeatureadded", this, function (poligono)
		{		
	
	geometry = poligono.feature.geometry;	
			
	pfilter = new OpenLayers.Filter.Spatial({
		type: OpenLayers.Filter.Spatial.WITHIN,
		property : "the_geom",			
		value: geometry.transform(P_900913,P_4326),
		distanceUnits : 'km'
	});
		
	layerAttivo[0].protocol.read({
		filter:  pfilter,
	    callback: processSpatialQuery
	});
			
});

function processSpatialQuery(nodiselezionati)
{	
	num_selezionati = nodiselezionati.features.length;	
	
	for ( int = 0; int < num_selezionati; int++) {		
		indice = nodiselezionati.features[int].fid;	
		SelectFeaturePoligonale.select(layerAttivo[0].getFeatureByFid(indice));
	}	
}
//SELEZIONE PER POLIGONO
//SELEZIONE PER POLIGONO

//SELEZIONE CON CERCHIO
//SELEZIONE CON CERCHIO

SelectFeatureCircolare = new OpenLayers.Control.SelectFeature(
		layerAttivo,
	    {
	    	clickout: true, 
	        toggle: false,
	        multiple: false, 
	        hover: false,
	        toggleKey: "ctrlKey", 
	        multipleKey: "shiftKey", 
	        box: true
	     }
	);
map.addControl(SelectFeatureCircolare); 

vectorLayerCircle.events.register("featureadded", this, function (cerchio)
		{		
	
	geometry = cerchio.feature.geometry;	
			
	cfilter = new OpenLayers.Filter.Spatial({
		type: OpenLayers.Filter.Spatial.WITHIN,
		property : "the_geom",			
		value: geometry.transform(P_900913,P_4326),
		distanceUnits : 'km'
	});
		
	layerAttivo[0].protocol.read({
		filter:  cfilter,
	    callback: processSpatialQueryCerchio
	});
			
});

function processSpatialQueryCerchio(NodiSelezionatiCerchio)
{	
	num_selezionati_cerchio = NodiSelezionatiCerchio.features.length;
	//console.log(nodiselezionati.features);
	
	for ( int = 0; int < num_selezionati_cerchio; int++) {		
		indice = NodiSelezionatiCerchio.features[int].fid;		
		SelectFeatureCircolare.select(layerAttivo[0].getFeatureByFid(indice));
	}	
}
//SELEZIONE CON CERCHIO
//SELEZIONE CON CERCHIO

//SELEZIONE PER REGIONE
//SELEZIONE PER REGIONE
selezionaRegione = new OpenLayers.Control.GetFeature({
  protocol: OpenLayers.Protocol.WFS.fromWMSLayer(nuts2),    
  box: true,
  hover: false,
  multi: false,
  multipleKey: "shiftKey",
  toggleKey: "ctrlKey",
	    eventListeners:{
	    	featureunselected: function(evento) {
	    		vectorLayerRegione.removeFeatures([evento.feature]);	        	       
			},
			featureselected: function(evento) {
				vectorLayerRegione.addFeatures([evento.feature]);
				//console.log(evento.feature.attributes.nome_reg); 
	    	}
		}
	});
map.addControl(selezionaRegione);

SelectFeatureRegionale = new OpenLayers.Control.SelectFeature(
		layerAttivo,
	    {
	    	clickout: true, 
	        toggle: false,
	        multiple: false, 
	        hover: false,
	        toggleKey: "ctrlKey", 
	        multipleKey: "shiftKey", 
	        box: true
	     }
	);
map.addControl(SelectFeatureRegionale); 

//vectorLayerRegione.events.register("beforefeatureadded", this, function (regione)
vectorLayerRegione.events.register("featureadded", this, function (regione)
	{		
	
	SelectFeatureRegionale.unselectAll();
	geometry = regione.feature.geometry;	
			
	cfilter = new OpenLayers.Filter.Spatial({
		type: OpenLayers.Filter.Spatial.WITHIN,
		property : "the_geom",			
		value: geometry.transform(P_900913,P_4326),
		distanceUnits : 'km'
	});
		
	layerAttivo[0].protocol.read({
		filter:  cfilter,
	    callback: processSpatialQueryCerchio
	});
			
});

function processSpatialQueryRegione(NodiSelezionatiRegione)
{	
	num_selezionati_regione = NodiSelezionatiRegione.features.length;
	
	
	for ( int = 0; int < num_selezionati_cerchio; int++) {		
		indice = NodiSelezionatiRegione.features[int].fid;	
		SelectFeatureRegionale.select(layerAttivo[0].getFeatureByFid(indice));
	}	
}


}


