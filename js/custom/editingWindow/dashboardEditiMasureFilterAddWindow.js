var	editWin;
var editWinCommArea;
var editWinToolsAreaImmutable;
var editWinToolsArea;
var	editingToolbarItems = [], actionsEditing = {};

Ext.QuickTips.init();

function createDashboadWindow() {	
	
creaComponentiFiltering();
creaComponentiMisurazioni();

//EDITING SECTION	
actionModify = new Ext.Toolbar.Button({				
 	tooltip: '<b>Modify data</b> of the networks',
 	id: 'tbEdit',
 	iconCls: 'editWin',
 	handler: function(login){
 		cambiaTitolo("Editing features");
 	},
 	toggleGroup: "tools",
 	enableToggle: true 	
 	});
actionsEditing["edit"] = actionModify;
editingToolbarItems.push(actionModify);  
editingToolbarItems.push("-");   
//EDITING SECTION  
	
//FILTERING SECTION	
actionFiltering = new Ext.Toolbar.Button({				
	tooltip: 'Filtering <b>data</b> of the networks',
	id: 'tbFilter',
 	iconCls: 'filtering',
 	handler: function(login){
 		cambiaTitolo("Filter features");
 	},
 	toggleGroup: "tools",
 	enableToggle: true
 	//toggleHandler: onItemToggle, 
 		
 	});
actionsEditing["filter"] = actionFiltering;
editingToolbarItems.push(actionFiltering);
editingToolbarItems.push("-");   
//FILTERING SECTION     
    
//MEASURING SECTION  
//SPECIFICHE GRAFICISMI PER MISURAZIONI    
//style the sketch fancy
measureStyles = {	    
	    "Line": {
	        strokeWidth: 3,
	        strokeOpacity: 1,
			strokeColor: "red",
	        strokeDashstyle: "dash"
	        },
	    "Polygon": {
	        strokeWidth: 2,
	        strokeOpacity: 1,
	        strokeColor: "maroon",
	        fillColor: "orange",
	        fillOpacity: 0.3
	        }
    };
    
var styleMeasuring = new OpenLayers.Style();
styleMeasuring.addRules([new OpenLayers.Rule({symbolizer: this.measureStyles})]);
var styleMapMeasure = new OpenLayers.StyleMap({"default": styleMeasuring});
	
var optionsLine = {
    handlerOptions: {
	style: "default", // this forces default render intent
	layerOptions: {styleMap: styleMapMeasure},
           persist: true
    },
    displayClass: "olControlMeasureDistance"										
};

var optionsPolygon = {
	handlerOptions: {
	style: "default", // this forces default render intent
		layerOptions: {styleMap: styleMapMeasure},
        persist: true
    },
    displayClass: "olControlMeasureArea"					
};

measureControls = {
		line: new OpenLayers.Control.Measure(
			OpenLayers.Handler.Path, 
			optionsLine
            ),
        polygon: new OpenLayers.Control.Measure(
            OpenLayers.Handler.Polygon, 
            optionsPolygon
            )
};
        
for(var key in measureControls) {
    control = measureControls[key];
    control.events.on({
       "measure": handleMeasurements,
       "measurepartial": handleMeasurements
    });
}	
    
actionMeasuringDistance = new GeoExt.Action({
   //text: "draw line",
  	iconCls: 'measure_lines',
    control: measureControls.line,
    map: map,
    // button options
    disabled: false,
    toggleGroup: "tools",
    allowDepress: true,
    tooltip: "Measure <b>Distances</b>",
    // check item options
    group: "draw",
    handler: function(){        	
      	cambiaTitolo("Measure Distances");        	
      }
 });
actionsEditing["measure_lines"] = actionMeasuringDistance;
editingToolbarItems.push(actionMeasuringDistance);
    
actionEditingAreas = new GeoExt.Action({
   //text: "measure areas",
	iconCls: 'measure_areas',
    control: measureControls.polygon,
    map: map,
    // button options
    disabled: false,
    toggleGroup: "tools",
    allowDepress: true,
    tooltip: "Measure <b>Areas</b>",
    // check item options
     group: "draw",
        handler: function(){
        	cambiaTitolo("Measure Areas");
        }
    });
actionsEditing["measure_areas"] = actionEditingAreas;
editingToolbarItems.push(actionEditingAreas); 
//MEASURING SECTION  

//FINESTRA DASHBOARD PER EDITING    
editWin = new Ext.Window({
	id: 'editingWin',
	name: 'editingWin',
	layout: "fit",
	//layout : 'form',
	title: "Interdependencies Modeler",
	closeAction: "hide",			
	width: 280,
	height: 195,
	x: 400,
	y: 120,
	items : [{
		id: "pannelloEdit",
		xtype : "panel",
		bodyStyle: 'padding: 2px;',
		//title : "Panel",
		tbar: editingToolbarItems,
		layout:'fit',
		activeItem: 0, // index or id
		items : [{
			id: 'messageField',
			name: 'messageField',
 			xtype:"fieldset",
 			width:260,   	 			
 			height: 140,   	 		
   			title:"Waiting...",    			
   			items : [{
   	 			//title: "Filter",
   	 			id: 'editWinToolsAreaImmutable',
				name: 'editWinToolsAreaImmutable',
   	 			xtype:"panel",
   	 			width:238,   	 			
   	 			height: 50,
   	 			labelWidth: 30,   	 			
   	 			layout:'form'
   	 		},{
				id: 'editWinToolsArea',
				name: 'editWinToolsArea',
   	 			xtype:"panel",
   	 			bodyCls:'misura',
   	 			width:238,   	 			
   	 			height: 30,   	 			
   	 			layout:'hbox'/*,
   	 			layourConfig:{
   	 				//padding: '5',
   	 				align: 'middle'
   	 			}*/
   	 			}
   	 		]
		}]
	}]
});	   

};

function cambiaTitolo(chiamante){	
   	 	
editWinCommArea 			= Ext.getCmp('messageField');
editWinCommArea.setTitle(chiamante);
editWinToolsArea 			= Ext.getCmp('editWinToolsArea');
editWinToolsAreaImmutable 	= Ext.getCmp('editWinToolsAreaImmutable');
	
if (chiamante=='Measure Distances' || chiamante=='Measure Areas') {
	distruggiComponenti();		
	creaComponentiMisurazioni();	
	editWinToolsAreaImmutable.add(nameField);
	editWinToolsAreaImmutable.doLayout();	
	editWinToolsArea.add(misura);
	editWinToolsArea.doLayout();
	
}
else if(chiamante=='Filter features'){ 
   	distruggiComponenti();
   	creaComponentiFiltering();
   	
   	editWinToolsAreaImmutable.add(comboLayersFiltrabili);
   	editWinToolsAreaImmutable.add(comboCategorieLayer);   	
   	editWinToolsAreaImmutable.doLayout();
   	
   	editWinToolsArea.add(btnFiltroNodi);
   	editWinToolsArea.add(btnLegendaNodi);   
	editWinToolsArea.doLayout();	
}
else if(chiamante=='Editing features'){ 
   	
   	distruggiComponenti();
   	creaComponentiEditing();
   	
   	editWinToolsAreaImmutable.add(comboLayerEditabili);   	
   	editWinToolsAreaImmutable.doLayout();   	
    
   	editWinToolsArea.add(btnLayerDaEditare);
   	//editWinToolsArea.add(btnEditaAttributi);
   	//editWinToolsArea.add(btnTerminaEditing);
	editWinToolsArea.doLayout();	
	}
}
 
