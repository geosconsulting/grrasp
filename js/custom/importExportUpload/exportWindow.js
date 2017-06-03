var	layerExportWin;
var layerEsportabiliStore,comboLayerEsportabili;
var iWMSsoli = []
var iWFSsoli = []
var WMSeWFS  = [];
var listaNome  	 = [];
var listaLayer 	 = [];
var lista  		 = [];

function createLayerExport(mapPanel) {	
	
var layerScelto;

var numLayers = map.layers.length

for(i=0;i<=numLayers;i++){
    if (map.layers[i] instanceof OpenLayers.Layer.WMS){
    iWMSsoli.push(map.layers[i]);
}else{    
	if (map.layers[i] instanceof OpenLayers.Layer.Vector){
		iWFSsoli.push(map.layers[i]);	
	}
}
}

WMSeWFS = iWMSsoli.concat(iWFSsoli);

for(j=0;j<=iWMSsoli.length-1;j++){
   	nomeLayer    = iWMSsoli[j].name;
    cognomeLayer = iWMSsoli[j].params.LAYERS;
    listaNome[j]  	= nomeLayer;
    listaLayer[j] 	= cognomeLayer;
    lista[j] 	= [nomeLayer,cognomeLayer];
}


layerEsportabiliStore = new Ext.data.ArrayStore({
		fields: ['name', 'typeName'],
		data : 	lista
});

comboLayerEsportabili = new Ext.form.ComboBox({
    id:'tipoLayerDaEsportare',
    labelWidth: 30,
    width: 195,
	fieldLabel: 'Data',
	tooltip : 'Layer to export',
	typeAhead: true,		
    triggerAction: 'all',       
    forceSelection:true,        
	mode: 'local',
	emptyText: 'Choose layer', 
	store: layerEsportabiliStore,
	displayField:'name',
	valueField:'typeName',	
	triggerAction:'all',
	listeners: {
		select : function(combo, record, index) {			
			layerScelto = combo.value;
		}
	}		 
});	


layerExportWin = new Ext.Window({
	id: 'layerExport',
	layout: "fit",
	title: "Export Data set",
	closeAction: "hide",			
	width: 220,
	height: 165,
	x: 400,
	y: 120,
	items : [{
		id: "pannelloExport",
		xtype : "panel",
		bodyStyle: 'padding: 5px;',
		items : [
		     comboLayerEsportabili
		     ,{
			//title : "Format",
		    xtype: 'panel',
		    width: 205,
		    labelWidth: 145,
		    style: 'margin-top: 10px;',
		    layout: 'form',
		    layoutConfig: {
		    	//margin: 5,
		        padding:'5',
		        pack:'middle',
		        align:'middle'
		     },
		    items:[
		    {
			     xtype : "radio",
			     name : "formato",
			     id : "shape",
			     value : "GIS",
			     inputValue : "shape",
				 fieldLabel : "GIS Shapefile",
				 boxLabel : "ZIP",
				 //checked:true,
				 listeners: {
					 check: function (field,newValue,oldValue) {
					 //console.log(newValue);
						 if(newValue){
							 formatoScelto = field.value;
							 //console.log(formatoScelto);
						 }
				   }
				 }
			},{
			    xtype : "radio",
			    name : "formato",
			    id : "CSV",
			    value : "CSV",
			    inputValue : "CSV",
			    fieldLabel : "Comma Delimited",
			    boxLabel : "CSV",				        
			    listeners: {
			    	check: function (field,newValue,oldValue) {
			    	//console.log(newValue);
			    		if(newValue){
			    			formatoScelto = field.value;
							 //console.log(formatoScelto);
			    		}
			    		
			   	  	}
			    }
			}
		]
     	},{
	          xtype : "button",
	          text : "Export",		         
	          width: 80,
	          style: 'margin-left: 40px; margin-top: 8px;',
	          handler: function(){
	        	  conversione(layerScelto,formatoScelto);
	          }
	      }]
		}]
	});
}

function conversione(layerScelto,formatoScelto){  	
	
	if(typeof layerScelto != 'undefined'){
		try {
			url = "http://localhost/geoserver/wfs?request=GetFeature&version=1.1.0&typeName=" + layerScelto;
			switch(formatoScelto) {  	
			
			case "GIS":
			  url = url + "&outputFormat=shape-zip";
			  break; 
			  
			case "CSV":	   
			  url = url + "&outputFormat=csv";
			  break;

			default:
			   
			}			
			window.location.href = url;
			
		} catch (e) {
			Ext.Msg.alert('Export',"Problems exporting the layer");
		}		
	}else{
			Ext.Msg.alert('Export',"Please choose a layer to export");
	}
	
}	

function apriFinestraExport(){
	layerExportWin.show();
}