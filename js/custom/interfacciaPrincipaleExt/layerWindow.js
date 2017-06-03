var	layerTree;
var layerRoot;
var layerBase,layerOverlay,layerOverlayGrids;
var layerCliccatoNome,layerCliccatoID;
var	layerwin;
var layerCliccatoNome,layerCliccatoID;
var gruppiLayers = new Array();
var layerAttivo;
var arrayCampi;

function createLayerWindow(mapPanel) {
	
layerRoot = new Ext.tree.TreeNode({
	text: "All Layers",
	expanded: true
});

layerBase = new GeoExt.tree.BaseLayerContainer({
	text: "Background Maps",
	map: mapPanel,
	expanded: false
	});
layerRoot.appendChild(layerBase);
gruppiLayers.push(layerBase);

layerOverlay = new GeoExt.tree.OverlayLayerContainer({
	text: "Baseline Data",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true 
    		&& record.get("layer").name.indexOf("Grid") == -1
    		&& record.get("layer").name.indexOf("Impact - ") == -1 
    		&& record.get("layer").name.indexOf("Gas") == -1
    		&& record.get("layer").name.indexOf("TS") == -1
    		&& record.get("layer").name.indexOf("Electrical") == -1 
    		&& record.get("layer").name.indexOf("GM") == -1
    		&& record.get("layer").name.indexOf("Lombardy") == -1
    		&& record.get("layer").name.indexOf("Italian") == -1
    		&& record.get("layer").name.indexOf("TR") == -1;    		
    	}
    }
});
layerRoot.appendChild(layerOverlay);
gruppiLayers.push(layerOverlay);

layerLombardyOverlay = new GeoExt.tree.OverlayLayerContainer({
	text: "Lombardy Data",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("Lombardy ") !== -1;    		
    	}
    }
});
layerRoot.appendChild(layerLombardyOverlay);
gruppiLayers.push(layerLombardyOverlay);

layerItalianOverlay = new GeoExt.tree.OverlayLayerContainer({
	text: "Italian Blackout",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("Italian ") !== -1;    		
    	}
    }
});
layerRoot.appendChild(layerItalianOverlay);
gruppiLayers.push(layerItalianOverlay);

layerTransportationOverlay = new GeoExt.tree.OverlayLayerContainer({
	text: "Transportation Data",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("TR") !== -1;    		
    	}
    }
});
layerRoot.appendChild(layerTransportationOverlay);
gruppiLayers.push(layerTransportationOverlay);

layerGemagnetismOverlay = new GeoExt.tree.OverlayLayerContainer({
	text: "Geomagnetical Data",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("GM ") !== -1;    		
    	}
    }
});
layerRoot.appendChild(layerGemagnetismOverlay);
gruppiLayers.push(layerGemagnetismOverlay);

layerGasOverlay = new GeoExt.tree.OverlayLayerContainer({
	text: "Gas Network Data",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("Gas") !== -1;    		
    	}
    }
});
layerRoot.appendChild(layerGasOverlay);
gruppiLayers.push(layerGasOverlay);

layerElectricalOverlay = new GeoExt.tree.OverlayLayerContainer({
	text: "Electrical Network Data",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("Electrical") !== -1;    		
    	}
    }
});
layerRoot.appendChild(layerElectricalOverlay);
gruppiLayers.push(layerElectricalOverlay);

layerPolitecnicoOverlay = new GeoExt.tree.OverlayLayerContainer({
	text: "Timeseries Politecnico",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("TS") !== -1;    		
    	}
    }
});
layerRoot.appendChild(layerPolitecnicoOverlay);
//gruppiLayers.push(layerPolitecnicoOverlay);

layerImpact = new GeoExt.tree.OverlayLayerContainer({
	text: "Impact Data",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("Impact - ") !== -1;
    	}
    }
});
//layerRoot.appendChild(layerImpact);
//gruppiLayers.push(layerImpact);

layerOverlayGrids = new GeoExt.tree.OverlayLayerContainer({
	text: "Networks for Analysis",
	map: mapPanel,
	expanded: false,
    loader: {    
    	filter: function(record){  
    		return record.get("layer")	instanceof OpenLayers.Layer.Vector == true && record.get("layer").name.indexOf("Earthquakes") !== 0 && record.get("layer").name.indexOf("_") !== 0;
    		//return record.get("layer") instanceof OpenLayers.Layer.WMS == true && record.get("layer").name.indexOf("Grid") !== -1;
    	},
    	baseAttrs:{
    		//checkedGroup: "powerGrid"
    	}
    }
});
layerRoot.appendChild(layerOverlayGrids);
gruppiLayers.push(layerOverlayGrids);

layerHazard = new GeoExt.tree.LayerContainer({
	text: "Hazards",
	map: mapPanel,
	expanded: false,
    loader: { 
    	filter: function(record){  
    		//console.log(record.get("layer").name);
    		//console.log(record.get("layer").id);
    		//return record.get("layer").name.indexOf("Grid") !== -1
    		return record.get("layer")	instanceof OpenLayers.Layer.Vector == true && record.get("layer").name.indexOf("_") !== 0 && record.get("layer").name.indexOf("Nodes") !== 0 && record.get("layer").name.indexOf("Segments") !== 0;
    	}
    }
});
layerRoot.appendChild(layerHazard);
gruppiLayers.push(layerHazard);

layerTree = new Ext.tree.TreePanel({
	//title: "Map Layers",
	//collapsible: true,
	root: layerRoot,
	enableDD: true,	
	height: 150,
	expanded: true,
	autoScroll: true,    
    listeners: {    	 
        "click":function(node) { 
        	modificaInterfacciaSecondoLayerSelezionato(node);        	
        	if (node.layer instanceof OpenLayers.Layer.WMS) {
        		
        		layerAttivo = node.layer.params.LAYERS;
        		//console.log(layerAttivo);
        		        		  		
        		var url = layer.url.split("?")[0];
        		//console.log(url);
        		
            	popolaGriglia(layer,layerAttivo,url);                	
        	} 
        	else if (node.layer instanceof OpenLayers.Layer.Vector)
        	{        		
        		var url = layer.protocol.url;
        		
        		if (url=='/geoserver/wfs') {
                	
                	layerAttivo = map.getLayersByName(node.text);
                	//console.log("La visibilita'" + layerAttivo[0].visibility);
                	if(!layerAttivo[0].visibility){
                		layerAttivo[0].setVisibility(true);                		
                	}
                	//modificaInterfacciaSecondoLayerSelezionato(node); 
        			
        			popolaGriglia(layer,layerAttivo,url); 
        			//gridFeatureSelected.store.bind(wfs_layer_point);
        			//gridFeatureSelected.getSelectionModel().bind(wfs_layer_point);
				}else{
					gridFeatureSelected.store.loadData();
					pannello=Ext.getCmp('southId');
					pannello.setTitle("No Readable data");
					pannello.setDisabled(true);
	        	}        		 
			}   
        	
        }
    },
	enableDD : true		
	});

var layerAttivoIndex;

layerwin = new Ext.Window({
		id: 'layerWin',
		name: 'layerWin',
		layout: "fit",
		title: "No layer selected",
		closeAction: "hide",			
		width: 220,
		height: 450,
		x: 100,
		y: 120,
		listeners: {},
		bbar: [{
			text: 'Zoom to Layer ',
			//iconCls: 'layerDel',
			tooltip: "Show the entire layer",			
			handler: function(){
				try {
					var layerAttivoNome = layerTree.getSelectionModel().getSelectedNode().text;
					//console.log(layerAttivoNome);
					zoomEstensioneLayer(map,layerAttivoNome);
				} catch (e) {
					// TODO: handle exception
					if (layerAttivoNome==null) {
						Ext.Msg.alert('Error','You must select a layer from the layer window');
						layerTree.body.frame('ff0000', 3);
					}
				}	
				}			
		},{
			text: 'Remove Layer ',
			//iconCls: 'layerDel',
			tooltip: "Remove a layer loaded into the map",			
			handler: function(){
				var layerAttivoNome = layerTree.getSelectionModel().getSelectedNode().text;
				cancellaLayer(map,layerAttivoNome);
			}
		}],
		items: [layerTree]		
		});
}

function apriFinestraLayers(){    
	layerwin = Ext.getCmp('layerWin');
	layerwin.show();	
}	

function modificaInterfacciaSecondoLayerSelezionato(node){  
	
	layer = node.layer;   
	layerCliccatoNome = node.layer.name;             	
	layerCliccatoID = node.layer.id;	
		
	layerwin.setTitle("Selected : " + layerCliccatoNome); 
	
	pannello = Ext.getCmp('southId');	
	pannello.setTitle("Selected layer: " + layerCliccatoNome);
	pannello.setDisabled(false);
}
