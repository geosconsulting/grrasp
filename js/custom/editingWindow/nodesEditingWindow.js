var winAttributesNodesEditing;
var addingNodesToolbarItems = [], actionsAddingNodes = {};

function createNodesManagingWin(wfsEditingAttivo,controlloSelezioniLayerWFSAttivo){

actionModifyPoint = new Ext.Toolbar.Button({    
	id				:'attributes_point',
  	iconCls			:'modify_point',
    map				: map,   
    toggleGroup		: "editPoints",
    allowDepress	: true,
    pressed			: false,
    tooltip			: "Modify <b>point</b> attributes",  
	group			: "editPoints",
	enableToggle	: true,
	toggleHandler	: function(btn, pressed){              
        var stato = pressed;         
        if (stato == true) {
        	chiPremuto='attributiNodo';
        	cambiaTitoloFinestraNodi(" - Attributes");
         	controlloSelezioniLayerWFSAttivo.activate();  
         	applicaLegendaNodiUnique(wfsEditingAttivo);
        }else{
        	cambiaTitoloFinestraNodi("");
        	controlloSelezioniLayerWFSAttivo.unselectAll();
        	controlloSelezioniLayerWFSAttivo.deactivate();        	
        	applicaLegendaRulesNodiWFS(wfsEditingAttivo);        	
        }               
	}    
});
actionsAddingNodes["attributes_point"] = actionModifyPoint;
addingNodesToolbarItems.push(actionModifyPoint);	

actionAddPoint = new GeoExt.Action({
    //text: "draw point",  	   
	id		:'draw_point',
  	iconCls	:'draw_point',
    control	: new OpenLayers.Control.DrawFeature(
    	wfsEditingAttivo, 
    	OpenLayers.Handler.Point,{    		
    		multi : true,
    		featureAdded: function(){
    			//alert("added");
    		}
    	}
    ),
    map				: map,   
    toggleGroup		: "editPoints",
    allowDepress	: true,
    tooltip			: "<b>Add a new point</b> drawing on the map",   
	group			: "editPoints",
	enableToggle	: true,
	handler 		:function() {		
		if (wfsEditingAttivo.selectedFeatures.length>0) {
			controlloSelezioniLayerWFSAttivo.unselectAll();
		}
	},
	toggleHandler	: function(btn, pressed){              
        var stato=pressed;        
        if (stato==true) {
        	chiPremuto='aggiungiNodo';        	
        	cambiaTitoloFinestraNodi(" - Adding Nodes");         	  
         	applicaLegendaNodiUnique(wfsEditingAttivo);
        }else{
        	cambiaTitoloFinestraNodi("");        	        	
        	applicaLegendaRulesNodiWFS(wfsEditingAttivo);
        }               
	}    
});
actionsAddingNodes["draw_point"] = actionAddPoint;
addingNodesToolbarItems.push(actionAddPoint);

actionMovePoint = new GeoExt.Action({
    //text: "Modify point",
	id		:'move_point',
  	iconCls	:'move_point',
    control	: new OpenLayers.Control.ModifyFeature(
    	wfsEditingAttivo
     ),
    map				: map,   
    toggleGroup		: "editPoints",
    allowDepress	: true,
    tooltip			: "<b>Move a point</b> to a new position",   
	group			: "editPoints",
	enableToggle	: true,
    handler			: function(){
    	if (wfsEditingAttivo.selectedFeatures.length>0) {
			controlloSelezioniLayerWFSAttivo.unselectAll();
		}
    },
    toggleHandler	: function(btn, pressed){              
        var stato=pressed;        
        if (stato==true) {
        	chiPremuto='muoviNodo';   
        	attivaDisattivaPerDeleteMove(stato); 
         	cambiaTitoloFinestraNodi(" - Move Node");         	  
         	applicaLegendaNodiUnique(wfsEditingAttivo);
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
	id			:'delete_point',
  	iconCls		:'delete_point',
    control		:new DeleteFeature(
    	wfsEditingAttivo
    ),
	map			: map,	
	toggleGroup	: "editPoints",
	allowDepress: true,
	tooltip		: "<b>Delete</b> a point",	
	group		: "editPoints",
	enableToggle: true,	
	handler		: function(){		
		if (wfsEditingAttivo.selectedFeatures.length>0) {
			controlloSelezioniLayerWFSAttivo.unselectAll();
		}		
	 },
	toggleHandler: function(btn, pressed){              
    var stato=pressed;        
    if (stato==true) {
    	chiPremuto='cancellaNodo';  
    	attivaDisattivaPerDeleteMove(stato);    	
    	cambiaTitoloFinestraNodi(" - Delete Nodes");         	  
     	applicaLegendaNodiUnique(wfsEditingAttivo);     	
    }else{
    	cambiaTitoloFinestraNodi("");
    	attivaDisattivaPerDeleteMove(stato);
    	//applicaLegendaRulesNodiWFS();
    }               
}    
});
actionsAddingNodes["delete_point"] = actionDeletePoint;
addingNodesToolbarItems.push(actionDeletePoint);

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
			name: 'id',
			id: 'id',
			disabled:true
		},{
			xtype: 'textfield',
			fieldLabel: 'Infrastructure Type',
			width: 200,
			name: 'tipo',
			id: 'tipo',
			disabled:true
		},{
			xtype: 'textfield',		
			fieldLabel: 'Infrastructure Name',
			width: 200,
			name: 'nome',
			id: 'nome'
		},{
			xtype: 'textfield',
			fieldLabel: 'GeoID',
			width: 200,
			name: 'fid',
			id: 'fid',
			disabled:true
		},
		{
			xtype : 'fieldset',
			title : 'Integrity Modulation',
			items : [{
				xtype : 'compositefield',
				fieldLabel : 'Buffer Time',
				combineErrors : false,
				items : [{
					name : 'Buffer Time',
					id : 'buffer2',
					xtype : 'numberfield',
					allowBlank : false
				}, {
					xtype : 'displayfield',
					value : 'Hours'
				}]
			}, {
				xtype : 'compositefield',
				fieldLabel : 'Propragation Time',
				combineErrors : false,
				items : [{
					name : 'Propragation Time',
					id : 'propagation2',
					xtype : 'numberfield',
					allowBlank : false
				}, {
					xtype : 'displayfield',
					value : 'Hours'
				}]
			}, {
				xtype : 'compositefield',
				fieldLabel : 'Organizational Time',
				combineErrors : false,
				items : [{
					name : 'Organizational Time',
					id : 'organisation2',
					xtype : 'numberfield',
					allowBlank : false
				}, {
					xtype : 'displayfield',
					value : 'Hours'
				}]
			}, {
				xtype : 'compositefield',
				fieldLabel : 'Recovery Time',
				combineErrors : false,
				items : [{
					name : 'Recovery Time',
					id : 'recovery2',
					xtype : 'numberfield',
					allowBlank : false
				}, {
					xtype : 'displayfield',
					value : 'Hours'
				}]
			}, {
				xtype : 'compositefield',
				fieldLabel : 'Initial Integrity',
				combineErrors : false,
				items : [{
					name : 'Initial Integrity',
					id : 'initial2',
					xtype : 'checkbox',
					checked : true,
				}, {
					xtype : 'displayfield',
					value : 'checked=1 and uncheked=0'
				}]
			}]
		},
		{
			xtype : 'fieldset',
			title : "Threat's characteristic times",
			autoHeight : true,

			items : [{
				xtype : 'fieldset',
				title : 'Threat 1',

				items : [{
					fieldLabel : 'Start time',
					name : 'Start time',
					id : '1start2',
					xtype : 'timefield',
					width : 130,
					format : 'H:i',
					increment : 30
				}, {
					fieldLabel : 'End time',
					name : 'End time',
					id : '1end2',
					xtype : 'timefield',
					width : 130,
					format : 'H:i',
					increment : 30
				}]
			}, {
				xtype : 'fieldset',
				title : 'Threat 2',
				items : [{
					fieldLabel : 'Start time',
					name : 'Start time',
					id : '2start2',
					xtype : 'timefield',
					width : 130,
					format : 'H:i',
					increment : 30
				}, {
					fieldLabel : 'End time',
					name : 'End time',
					id : '2end2',
					xtype : 'timefield',
					width : 130,
					format : 'H:i',
					increment : 30
				}]
			}]
		}
	],
	fbar:["->",
	    {
		text: "Reload Data",
		width : "70px",
		tooltip: 'Use this button to refresh/syncronize the data',
		listeners: {
	        click: function () {
	                Ext.Msg.alert('Reload','Data are now up-to-date');
	        	}
			},
	        handler: function () {				    	
	        	wfsEditingAttivo.refresh({force: true});			       
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
				}
				catch (e) {
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
				}
				catch (e) {
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
            	winAttributesNodesEditing.close();
            	map.removeLayer(wfsEditingAttivo);
            }
            }
    ]
});
};

function cambiaTitoloFinestraNodi(chiamante){		
	editWinCommArea = Ext.getCmp('nodesWin');
	editWinCommArea.setTitle('Modify Nodes ' + chiamante);	
}

function modificaDatiAJAX(){
	
	var nodoEditingVal 		= Ext.getCmp('id').value;
	var valoreDescrizione 	= Ext.getCmp('nome').getValue();
	var valoreTipoNodo		= Ext.getCmp('tipo');
	
	var valoreTypeID 		= illo.value;	
	//storace = illo.selectedIndex;
	//recordio = illo.store.data.itemAt(storace);
	//var valoreType= recordio.data.id;
	
	Ext.Ajax.request({
		method : 'POST',
		url : 'php/DB/DBupdate.php',
		params : {
			nodoEditing : nodoEditingVal,
			valDesc 	: valoreDescrizione,
			valType 	: valoreType,
			valTypeID 	: valoreTypeID
		},
		success : function(response) {
			// UTILISSIMO PERCHE FA UN DECODE DEL JSON CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
			var jsonData = Ext.util.JSON.decode(response.responseText);
			var newDesc =jsonData.descrizione;
			var newTipo = jsonData.tipo;						
			Ext.Msg.show({ title 	: "Success",
						   msg 		: "Description is <b> '" + newDesc + "'</b> and type is '<b>" + newTipo + "'</b>",
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
	
}

