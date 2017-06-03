var winAttributesNodesEditing;
var addingNodesToolbarItems = [], actionsAddingNodes = {};

function createNodesManagingWin(map){

chiPremuto='nessuno';

actionModifyPoint = new Ext.Toolbar.Button({    
	id:'attributes_point',
  	iconCls:'modify_point',
    map: map,   
    toggleGroup: "editPoints",
    allowDepress: true,
    pressed: false,
    tooltip: "Modify <b>point</b> attributes",  
	group: "editPoints",
	enableToggle: true,
	toggleHandler: function(btn, pressed){              
        var stato = pressed;         
        if (stato == true) {
        	chiPremuto='attributiNodo';         	
        	cambiaTitoloFinestraNodi(" - Attributes");
         	select_feature_control.activate();  
         	applicaLegendaNodiUnique();
        }else{
        	cambiaTitoloFinestraNodi("");
        	unselected_feature_nodi(); 
        	select_feature_control.unselectAll();
        	select_feature_control.deactivate();        	
        	applicaLegendaRulesNodiWFS();        	
        }               
	}    
});
actionsAddingNodes["attributes_point"] = actionModifyPoint;
addingNodesToolbarItems.push(actionModifyPoint);	

actionAddPoint = new GeoExt.Action({
    //text: "draw point",  	   
	id:'draw_point',
  	iconCls:'draw_point',
    control: new OpenLayers.Control.DrawFeature(
    	wfs_layer_point, 
    	OpenLayers.Handler.Point,{    		
    		multi : true,
    		featureAdded: function(){
    			//alert("added");
    		}
    	}
    ),
    map: map,   
    toggleGroup: "editPoints",
    allowDepress: true,
    tooltip: "<b>Add a new point</b> drawing on the map",   
	group: "editPoints",
	enableToggle: true,
	handler :function() {		
		if (wfs_layer_point.selectedFeatures.length>0) {
			select_feature_control.unselectAll();
		}
	},
	toggleHandler: function(btn, pressed){              
        var stato=pressed;        
        if (stato==true) {
        	chiPremuto='aggiungiNodo';        	
        	cambiaTitoloFinestraNodi(" - Adding Nodes");         	  
         	applicaLegendaNodiUnique();
        }else{
        	cambiaTitoloFinestraNodi("");        	        	
        	applicaLegendaRulesNodiWFS();
        }               
	}    
});
actionsAddingNodes["draw_point"] = actionAddPoint;
addingNodesToolbarItems.push(actionAddPoint);

actionMovePoint = new GeoExt.Action({
    //text: "Modify point",
	id:'move_point',
  	iconCls:'move_point',
    control: new OpenLayers.Control.ModifyFeature(
   		wfs_layer_point
     ),
    map: map,   
    toggleGroup: "editPoints",
    allowDepress: true,
    tooltip: "<b>Move a point</b> to a new position",   
	group: "editPoints",
	enableToggle: true,
    handler: function(){
    	if (wfs_layer_point.selectedFeatures.length>0) {
			select_feature_control.unselectAll();
		}
    },
    toggleHandler: function(btn, pressed){              
        var stato=pressed;        
        if (stato==true) {
        	chiPremuto='muoviNodo';   
        	attivaDisattivaPerDeleteMove(stato); 
         	cambiaTitoloFinestraNodi(" - Move Node");         	  
         	applicaLegendaNodiUnique();
        }else{
        	attivaDisattivaPerDeleteMove(stato); 
        	cambiaTitoloFinestraNodi("");        	        	
        	//applicaLegendaRulesNodiWFS();
        }   
       }
	});
actionsAddingNodes["attributes_point"] = actionMovePoint;
addingNodesToolbarItems.push(actionMovePoint);	

actionDeletePoint = new GeoExt.Action({
    //text: "delete point",
	id:'delete_point',
  	iconCls:'delete_point',
    control:new DeleteFeature(
    		wfs_layer_point
    ),
	map: map,	
	toggleGroup: "editPoints",
	allowDepress: true,
	tooltip: "<b>Delete</b> a point",	
	group: "editPoints",
	enableToggle: true,	
	handler: function(){		
		if (wfs_layer_point.selectedFeatures.length>0) {
			select_feature_control.unselectAll();
		}		
	 },
	toggleHandler: function(btn, pressed){              
    var stato=pressed;        
    if (stato==true) {
    	chiPremuto='cancellaNodo';  
    	attivaDisattivaPerDeleteMove(stato);    	
    	cambiaTitoloFinestraNodi(" - Delete Nodes");         	  
     	applicaLegendaNodiUnique();     	
    }else{
    	cambiaTitoloFinestraNodi("");
    	attivaDisattivaPerDeleteMove(stato);
    	//applicaLegendaRulesNodiWFS();
    }               
}    
});
actionsAddingNodes["delete_point"] = actionDeletePoint;
addingNodesToolbarItems.push(actionDeletePoint);
//addingNodesToolbarItems.push("-");  

var bufferingTime = new Ext.FormPanel({
    labelWidth: 80,
    frame: true,
    title: 'Buffering Time',
    bodyStyle: 'padding:5px 5px 0',
    //width: 210,
    collapsible :true,
    //defaults: {width: 135},
    defaultType: 'textfield',
    items: [{
    	xtype: 'spinnerfield',
		fieldLabel: 'Hours',
		name: 'btHours',
		minValue: 1,
		maxValue: 24,
		allowDecimals: false,
		decimalPrecision: 0,
		incrementValue: 1,
		alternateIncrementValue: 5,
		accelerate: true
    },{
    	xtype: 'spinnerfield',
        fieldLabel: 'Minutes',
        name: 'btMinutes',
        minValue: 0,
        maxValue: 60,
        allowDecimals: false,
        decimalPrecision: 1,
        incrementValue: 5,
        alternateIncrementValue: 10,
        accelerate: true
    }]
});	

var recoveryTime = new Ext.FormPanel({
    labelWidth: 80, 
    frame: true,
    collapsible :true,
    title: 'Recovery Time',
    bodyStyle: 'padding:5px 5px 0',
    //width: 210,
    //defaults: {width: 135},
    defaultType: 'textfield',
    items: [
       {
		xtype: 'spinnerfield',
		fieldLabel: 'Hours',
		name: 'rtHours',
		minValue: 1,
		maxValue: 24,
		allowDecimals: false,
		decimalPrecision: 0,
		incrementValue: 1,
		alternateIncrementValue: 5,
		accelerate: true
       },{
        xtype: 'spinnerfield',
        fieldLabel: 'Minutes',
        name: 'rtMinutes',
        minValue: 0,
        maxValue: 60,
        allowDecimals: false,
        decimalPrecision: 1,
        incrementValue: 5,
        alternateIncrementValue: 10,
        accelerate: true
        }
    ]
});	
	
var datiNodi = new Ext.data.ArrayStore({
		fields: ['type_id', 'id'],
		data : 	[
		 	['1','Node Type 1'],
			['2','Node Type 2'],
			['3','Node Type 3'],
			['4','Node Type 4']
		]
});

var valoreCombo;
var comboTipoNodo = new Ext.form.ComboBox({
	    id:'node_type',
		hiddenName: 'node_type',
		fieldLabel: 'Node Type',
		mode: 'local',
		store: datiNodi,
		displayField:'id',
		valueField:'type_id',
		width: 200,
		triggerAction:'all',	
		listeners: {
			'select': function(t){ 				
				valoreCombo = t.value;
			}
		}	
});

winAttributesNodesEditing = new Ext.Window({	
	title: 'Modify Nodes',
	closable:false,		
	id: 'nodesWin',	
	width: 320,
	layout: 'form',
	tbar : addingNodesToolbarItems,
	items:[
		{
			xtype: 'numberfield',
			fieldLabel: 'Node ID',		
	        boxLabel : 'Node ID',       
	        width: 200,
			name: 'gid',
			id: 'gid',
			disabled:true
		},{
			xtype: 'textfield',
			fieldLabel: 'Feature ID',
			width: 200,
			name: 'fid',
			id: 'fid',
			disabled:true
		},{
			xtype: 'textfield',		
			fieldLabel: 'Desc',
			width: 200,
			name: 'desc',
			id: 'desc'
		},{
			xtype: 'numberfield',
			fieldLabel: 'Easting',
			width: 200,
			name: 'easting',
			id: 'easting',
			decimalPrecision:2,
			disabled:true
		},{
			xtype: 'numberfield',
			fieldLabel: 'Northing',
			width: 200,
			name: 'northing',
			id: 'northing',
			decimalPrecision:2,
			disabled:true
		},
		comboTipoNodo,
		bufferingTime,
		recoveryTime
	],
	fbar:["->",
	    {
		text: "Reload Data",
		width : "70px",
		tooltip: 'Use this button to refresh/syncronize the data',
		listeners: {
	        click: function () {
	                Ext.Msg.alert('Reload','Data are now up-to-date');
	        	} // click
	        }, // listeners
	        handler: function () {				    	
	        	wfs_layer_point.refresh({force: true});			       
	        }
	    },
        {
        text: "Submit",
        width : "50px",
        handler: function() {        	
        	switch (chiPremuto) {
			case "attributiNodo":				
				modificaDatiAJAX();
				break;
			case "aggiungiNodo":								
				inserisciDatiAJAX();
				break;
			case "muoviNodo":
				try {
				saveStrategyPoint.save();
				Ext.Msg.show({ title : 'Success',
					msg : "Node has been moved",
					buttons : Ext.Msg.OK
				});
			} catch (e) {
				Ext.Msg.show({ title : 'Failure',
					msg : "Node has not been moved",
					buttons : Ext.Msg.OK
				});
			}
				break;
			case "cancellaNodo":								
				try {
					saveStrategyPoint.save();
					Ext.Msg.show({ title : 'Success',
						msg : "Nodes have been deleted",
						buttons : Ext.Msg.OK
					});
				} catch (e) {
					Ext.Msg.show({ title : 'Failure',
						msg : "Nodes have not been deleted",
						buttons : Ext.Msg.OK
					});
				}
				break;					
			case "nessuno":
				Ext.Msg.show({ title : 'Error',
					msg : "Select tool from toolbar",
					buttons : Ext.Msg.OK
				});
			break;
			}
        }
        },
        {
            text: "Close Window",
            width : "50px",
            handler: function() {
            	winAttributesNodesEditing.hide();
            	map.removeLayer(wfs_layer_point);
            }
            }
    ]
});
};


function cambiaTitoloFinestraNodi(chiamante){		
	editWinCommArea = Ext.getCmp('nodesWin');
	editWinCommArea.setTitle('Modify Nodes ' + chiamante);	
}

//

function modificaDatiAJAX(){
	
	var nodoEditingVal 		= Ext.getCmp('gid').value;
	var valoreDescrizione 	= Ext.getCmp('desc').getValue();
	var valoreTipoNodo		= Ext.getCmp('node_type');
	
	var valoreTypeID 		= illo.value;	
	//storace = illo.selectedIndex;
	//recordio = illo.store.data.itemAt(storace);
	//var valoreType= recordio.data.id;
	
	Ext.Ajax.request({
		method : 'POST',
		url : 'php/DB/DBupdate.php',
		params : {
			nodoEditing : nodoEditingVal,
			valDesc : valoreDescrizione,
			valType : valoreType,
			valTypeID : valoreTypeID
		},
		success : function(response) {
			// UTILISSIMO PERCHE FA UN DECODE DEL JSON CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
			var jsonData = Ext.util.JSON.decode(response.responseText);
			var newDesc =jsonData.descrizione;
			var newTipo = jsonData.tipo;						
			Ext.Msg.show({ title : 'Success',
							msg : "Description is <b> '" + newDesc + "'</b>" +
								  " and type is '<b>" + newTipo + "'</b>",
							buttons : Ext.Msg.OK
			});
		},
		failure : function(response) {										
			Ext.Msg.show({ 
				title : 'Failure',
				msg : response.responseText,
				buttons : Ext.Msg.OK
			});
		},
		callback : function(response) {	}
	});
}

function inserisciDatiAJAX(){
	
saveStrategyPoint.save();
	
	Ext.Ajax.request({
		method : 'POST',
		url : 'php/DB/DBcurrval.php',
		params : {},
		success : function(response) {
			
			//UTILISSIMO PERCHE FA UN DECODE DEL JSN CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
			var jsonData 			= Ext.util.JSON.decode(response.responseText);	
			var idAggiunto 			= jsonData.ultimoVal;	
			var valoreDescrizione	= Ext.getCmp('desc').getValue();
			
			illo = Ext.getCmp('node_type');
			var valoreTypeID = illo.value;		
			//alert(val);
			storace = illo.selectedIndex;
			recordio = illo.store.data.itemAt(storace);
			var valoreType=recordio.data.id;
									
			Ext.Ajax.request({
				method : 'POST',
				url : 'php/DB/DBupdate.php',
				params : {
					nodoEditing : idAggiunto,
					valDesc : valoreDescrizione,
					valType : valoreType,
					valTypeID : valoreTypeID
				},
				success : function(response) {
				
				//UTILISSIMO PERCHE FA UN DECODE DEL JSN CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
				var jsonData = Ext.util.JSON.decode(response.responseText);
				
				var newDesc =jsonData.descrizione;
				var newTipo = jsonData.tipo;
				
				Ext.Msg.show({ 
						title : 'Success',
						msg : "New node ID :<b> '" + idAggiunto + "'</b> Description is <b> '" + newDesc + "'</b> and type is '<b>" + newTipo + "'</b>",
						buttons : Ext.Msg.OK,
						fn: function(){
							handler : unselected_feature();
						}
						
					});	
				},
				failure : function(response) {										
					winAdd.hide();
					Ext.Msg.show({ 
						title : 'Failure',
						msg : response.responseText,
						buttons : Ext.Msg.OK
					});
				},
				callback : function(response) {	}
			});	
		},
		failure : function(response) {										
			Ext.Msg.show({ 
					title : 'Failure',
					msg : response.responseText,
					buttons : Ext.Msg.OK
				});
				},
		callback : function(response) {}
	});	
}

function attivaDisattivaPerDeleteMove(stato){	
	winAttributesNodesEditing.items.items[2].setDisabled(stato);
	winAttributesNodesEditing.items.items[5].setDisabled(stato);
	winAttributesNodesEditing.items.items[6].setDisabled(stato);
	winAttributesNodesEditing.items.items[7].setDisabled(stato);	
}
