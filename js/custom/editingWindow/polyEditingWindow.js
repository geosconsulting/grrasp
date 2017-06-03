var winAttributesPolygonEditing;
var addingPolygonsToolbarItems = [], actionsAddingPolygons = {};

function createPolygonManagingWin(wfsEditingAttivo,controlloSelezioniLayerWFSAttivo){	

actionModifyPolygonAttributes = new Ext.Toolbar.Button({    
		id:'modify_poly',
	  	iconCls:'modify_poly',
	    //control: (),
	    map: map,   
	    toggleGroup: "editPoly",
	    allowDepress: true,
	    pressed: false,
	    tooltip: "Modify <b>polygon</b> attributes",  
		group: "editPoly",
		enableToggle: true,
		toggleHandler: function(btn, pressed){              
	        var stato=pressed; 	       
	        if (stato==true) {
	        	chiPremuto='attributiPolys'; 
	        	cambiaTitoloFinestraPoligoni(" - Attributes");
	        	controlloSelezioniLayerWFSAttivo.activate();	         	
	        }else{
	        	cambiaTitoloFinestraPoligoni("");
	        	unselected_feature_segmenti();        	
	        	controlloSelezioniLayerWFSAttivo.deactivate();
	        }               
		}    
	});
actionsAddingPolygons["modify_poly"] = actionModifyPolygonAttributes;
addingPolygonsToolbarItems.push(actionModifyPolygonAttributes);	

actionAddPolygon = new GeoExt.Action({
        //text: "draw line",
		id:'draw_poly',
    	iconCls: 'draw_poly',
        control: new OpenLayers.Control.DrawFeature(
        		wfsEditingAttivo, 
	            OpenLayers.Handler.Path,{    		
	            	multi : true,
	        		featureAdded: function(){
	        			//alert("added");
	        		}
	            }
        ),
        map: map,       
        disabled: false,
        toggleGroup: "editPoly",
        allowDepress: true,
        tooltip: "Draw a <b>polygon</b>",        
        group: "editPoly",
        toggleHandler: function(btn,pressed){              
            var stato=pressed;        
            if (stato==true) {
            	chiPremuto='aggiungiPoly';
            	wfsEditingAttivo.setVisibility(true); 
            	cambiaTitoloFinestraPoligoni(" - Add Poly");            	
            }else{       
            	wfs_layer_point.setVisibility(false);
            	cambiaTitoloFinestraPoligoni("");               	
            }               
    	},
        handler: function(){
        	if (wfsEditingAttivo.selectedFeatures.length>0) {
        		controlloSelezioniLayerWFSAttivo.unselectAll();
    		}       	
        }
});
actionsAddingPolygons["draw_poly"] = actionAddPolygon;
addingPolygonsToolbarItems.push(actionAddPolygon);

actionReshapePolygon = new GeoExt.Action({
    //text: "draw line",
	id:'move_poly',
	iconCls: 'move_poly',
    control: new OpenLayers.Control.ModifyFeature(
    		wfsEditingAttivo
    ),
    map: map,
    disabled: false,
    toggleGroup: "editPoly",
    allowDepress: true,
    tooltip: "Reshape a <b>polygon</b>",
    group: "editPoly",
    enableToggle: true,
	toggleHandler: function(btn,pressed){              
        var stato=pressed;        
        if (stato==true) {
        	chiPremuto='reshapePolys';  
        	wfsEditingAttivo.setVisibility(true);
        	cambiaTitoloFinestraPoligoni(" - Reshape Polygon"); 
        	attivaDisattivaPerDeleteReshape(stato);
        }else{     
        	wfsEditingAttivo.setVisibility(false);
        	cambiaTitoloFinestraPoligoni("");   
        	attivaDisattivaPerDeleteReshape(stato);
        }               
	},
    handler: function(){
    	if (wfsEditingAttivo.selectedFeatures.length>0) {
    		controlloSelezioniLayerWFSAttivo.unselectAll();
		}	
    }
});
actionsAddingPolygons["move_poly"] = actionReshapePolygon;
addingPolygonsToolbarItems.push(actionReshapePolygon);

actionDeletePolygon = new GeoExt.Action({
        //text: "draw line",
		id:'delete_poly',
    	iconCls: 'delete_poly',    	
        control: new DeleteFeature(
        		wfsEditingAttivo
        ),
        map: map,
        // button options
        disabled: false,
        toggleGroup: "editPoly",
        allowDepress: true,
        tooltip: "Delete a <b>polygon</b>",
        // check item options
        group: "editPoly",
        enableToggle: true,
    	toggleHandler: function(btn, pressed){              
            var stato=pressed;             
            if (stato==true) {
            	chiPremuto='cancellaPoly';          	
            	cambiaTitoloFinestraPoligoni(" - Delete Poly"); 
            	attivaDisattivaPerDeleteReshape(stato);
            }else{        	
            	cambiaTitoloFinestraPoligoni("");   
            	attivaDisattivaPerDeleteReshape(stato);
            }               
    	},
        handler: function(){
        	if (wfsEditingAttivo.selectedFeatures.length>0) {
        		controlloSelezioniLayerWFSAttivo.unselectAll();
    		}	
        }
});
actionsAddingPolygons["delete_poly"] = actionDeletePolygon;
addingPolygonsToolbarItems.push(actionDeletePolygon);
//editingToolbarItems.push("-");  
//DRAWING SECTION

var btnSelectNodeToPoly= new Ext.Button({
	  text: 'Select Element',
	  id: 'btnAddNewNodePoly',
	  name: 'btnAddNewNodePoly',
	  //enabled: false,
	  autoWidth: true,
	  enableToggle: true,
	  handler: function () {},
	  toggleHandler: function(btn, pressed){              
	       var stato=pressed;                
	       if (stato==true) {	    	  
	    	   infoInterdependency.activate();
	       }else{	    	   
	    	   infoInterdependency.deactivate();            	   
	       }               
	    }
	}); 

var btnSelectSegmentToPoly= new Ext.Button({
	  text: 'Select Poly',
	  id: 'btnAddNewSegPoly',
	  name: 'btnAddNewSegPoly',
	  width: 148,
	  enableToggle: true,
	  handler: function () { 
		}
	}); 
	
winAttributesPolygonEditing = new Ext.Window({	
	title: 'Modify Polygons',
	closable:false,		
	id: 'polyWin',	
	labelWidth: 80,
	width: 320,
	layout: 'form',
	tbar : addingPolygonsToolbarItems,
	items:[
		{
			xtype		: 'numberfield',
			fieldLabel	: 'Poly ID0',		
	        boxLabel 	: 'Poly ID0',       
	        width		: 210,
			name		: 'poly_id0',
			id			: 'poly_id0',
			disabled	:true
		},{
			xtype		: 'combo',		
			fieldLabel	: 'Infrastructure Type',
			width		: 210,
			name		: 'poly_tipo',
			id			: 'poly_tipo'
		},{
			xtype		: 'textfield',		
			fieldLabel	: 'Infrastructure Name',
			width		: 210,
			name		: 'poly_nome',
			id			: 'poly_nome'
		},{
			xtype		: 'textfield',		
			fieldLabel	: 'Poly ID',
			width		: 210,
			name		: 'poly_id',
			id			: 'poly_id'
		},{
			xtype		: 'textfield',
			fieldLabel	: 'GeoID',
			width		: 210,
			name		: 'poly_fid',
			id			: 'poly_fid',
			disabled:true
		},{
			xtype : 'fieldset',
			title : 'Integrity Modulation',
			items : [{
				xtype : 'compositefield',
				fieldLabel : 'Buffer Time',
				combineErrors : false,
				items : [{
					name : 'Buffer Time',
					id : 'buffer3',
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
					id : 'propagation3',
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
					id : 'organisation3',
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
					id : 'recovery3',
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
					id : 'initial3',
					xtype : 'checkbox',
					checked : true,
				}, {
					xtype : 'displayfield',
					value : 'checked=1 and uncheked=0'
				}]
			}]
		}, {
			xtype : 'fieldset',
			title : "Threat's characteristic times",
			autoHeight : true,

			items : [{
				xtype : 'fieldset',
				title : 'Threat 1',

				items : [{
					fieldLabel : 'Start time',
					name : 'Start time',
					id : '1start3',
					xtype : 'timefield',
					width : 130,
					format : 'H:i',
					increment : 30
				}, {
					fieldLabel : 'End time',
					name : 'End time',
					id : '1end3',
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
					id : '2start3',
					xtype : 'timefield',
					width : 130,
					format : 'H:i',
					increment : 30
				}, {
					fieldLabel : 'End time',
					name : 'End time',
					id : '2end3',
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
	        } // click
	        }, // listeners
	        handler: function () {				    	
	        	wfsEditingAttivo.refresh({force: true});			       
	        }
	    },
	    {
        text: "Submit",
        	handler: function() {
            	switch (chiPremuto) {
    			case "attributiPolys":    				
    				modificaDatiPolysAJAX(datiCollegamento);
    				break;
    			case "aggiungiPoly":								
    				inserisciDatiPolysAJAX();
    				break;
    			case "reshapePolys":
    				try {
    				saveStrategyLine.save();
    				Ext.Msg.show({ title : 'Success',
    					msg : "Poly has been reshaped",
    					buttons : Ext.Msg.OK
    				});
    				} catch (e) {
    					Ext.Msg.show({ title : 'Failure',
    						msg : "Poly cannot be reshaped",
    						buttons : Ext.Msg.OK
    					});
    				} 
    				break;
    			case "cancellaPoly":								
    				try {
    					saveStrategyLine.save();
    					Ext.Msg.show({ title : 'Success',
    						msg : "Poly has been deleted",
    						buttons : Ext.Msg.OK
    					});
    				} catch (e) {
    					Ext.Msg.show({ title : 'Failure',
    						msg : "Poly cannot be deleted",
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
            handler: function() {
            	winAttributesPolygonEditing.close();
            	map.removeLayer(wfsEditingAttivo);            	
            }
            }
    ]
});
};

function cambiaTitoloFinestraPoligoni(chiamante){		
	editWinCommArea = Ext.getCmp('polyWin');
	editWinCommArea.setTitle('Modify Polygons ' + chiamante);	
}

function modificaDatiPolysAJAX(datiCollegamento){
	
	var PolyEditingID 	= Ext.getCmp('gid_seg').value;
	var PolyDescription	= Ext.getCmp('Poly_desc').getValue();
	
	var cmboxPolyType = Ext.getCmp('Poly_type');
		valoreDelComboPolyType = cmboxPolyType.value;
		indiceStorecmboxPolyType = cmboxPolyType.selectedIndex;
		recordStorecmboxPolyType = cmboxPolyType.store.data.itemAt(indiceStorecmboxPolyType);
	var PolyType= recordStorecmboxPolyType.data.Poly_type;	
	
	var cmboxExistingNetwork = Ext.getCmp('combovalueExistingNetwork');
		valoreDelComboPolyedTo = cmboxExistingNetwork.value;
		indiceStoreCmboxExistingNetwork = cmboxExistingNetwork.selectedIndex;
		recordStoreCmboxExistingNetwork = cmboxExistingNetwork.store.data.itemAt(indiceStoreCmboxExistingNetwork);
	var PolyedTo= recordStoreCmboxExistingNetwork.data.network_type;
	
	Ext.Ajax.request({
		method : 'POST',
		url : 'php/DB/DBupdatePolys.php',
		params : {
			parametroPolyID  	: PolyEditingID,			
			parametroPolyDesc   : PolyDescription,
			parametroPolyType	: PolyType,
			parametroPolyedTo	: PolyedTo
		},
		success : function(response) {
			//UTILISSIMO PERCHE FA UN DECODE DEL JSON CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
			var jsonData = Ext.util.JSON.decode(response.responseText);
			var newDesc =jsonData.descrizione;
			var newTipo = jsonData.tipo;
			var newTo = jsonData.connessoA;
			Ext.Msg.show({ title : 'Success',
							msg : "Description is <b> '" + newDesc + "'</b>" +
								  " and type is '<b>" + newTipo + "'</b>" +
								  " and is connected to '<b>" + newTo + "'</b>",
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

function inserisciDatiPolysAJAX(){
		
	saveStrategyPoly.save();
	
	Ext.Ajax.request({
		method : 'POST',
		url : 'php/DB/DBcurrvalPolys.php',
		params : {},
		success : function(responsePoly) {			
			//UTILISSIMO PERCHE FA UN DECODE DEL JSON CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
			var jsonDataPolys	= Ext.util.JSON.decode(responsePoly.responseText);	
			var PolyEditingID 	= jsonDataPolys.ultimoValPolys;	
						
			var PolyDescription	= Ext.getCmp('Poly_desc').getValue();
			
			var cmboxPolyType = Ext.getCmp('Poly_type');
				valoreDelComboPolyType = cmboxPolyType.value;
				indiceStorecmboxPolyType = cmboxPolyType.selectedIndex;
				recordStorecmboxPolyType = cmboxPolyType.store.data.itemAt(indiceStorecmboxPolyType);
			var PolyType= recordStorecmboxPolyType.data.Poly_type;	
			
			var cmboxExistingNetwork = Ext.getCmp('combovalueExistingNetwork');
				valoreDelComboPolyedTo = cmboxExistingNetwork.value;
				indiceStoreCmboxExistingNetwork = cmboxExistingNetwork.selectedIndex;
				recordStoreCmboxExistingNetwork = cmboxExistingNetwork.store.data.itemAt(indiceStoreCmboxExistingNetwork);
			var PolyedTo= recordStoreCmboxExistingNetwork.data.network_type;
			
			Ext.Ajax.request({
				method : 'POST',
				url : 'php/DB/DBupdatePolys.php',
				params : {
					parametroPolyID  	: PolyEditingID,			
					parametroPolyDesc   : PolyDescription,
					parametroPolyType	: PolyType,
					parametroPolyedTo	: PolyedTo
				},
				success : function(response) {
					//UTILISSIMO PERCHE FA UN DECODE DEL JSON CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
					var jsonData = Ext.util.JSON.decode(response.responseText);
					var newDesc =jsonData.descrizione;
					var newTipo = jsonData.tipo;
					var newTo = jsonData.connessoA;
					Ext.Msg.show({ title : 'Success',
									msg : "Description is <b> '" + newDesc + "'</b>" +
										  " and type is '<b>" + newTipo + "'</b>" +
										  " and is connected to '<b>" + newTo + "'</b>",
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
		},
		failure : function(responsePoly) {										
			Ext.Msg.show({title : 'Failure', msg : response.responseText, buttons : Ext.Msg.OK});
		},
		callback : function(responsePoly) {}
	});
}


function attivaDisattivaPerDeleteReshape(stato){
	
	var len = winAttributesPolysEditing.items.length;
	for(i=0;i<len;i++){
		if (i==0 || i==3 ) {
			
		} else {
			winAttributesPolysEditing.items.items[i].setDisabled(stato);
		}
		    
	}
}