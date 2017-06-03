var winAttributesLinksEditing;
var addingLinesToolbarItems = [], actionsAddingLines = {};

function createLinksManagingWin(wfsEditingAttivo,controlloSelezioniLayerWFSAttivo){	

actionModifyLineAttributes = new Ext.Toolbar.Button({    
		id:'attributes_links',
	  	iconCls:'modify_line',
	    //control: (),
	    map: map,   
	    toggleGroup: "editLines",
	    allowDepress: true,
	    pressed: false,
	    tooltip: "Modify <b>links</b> attributes",  
		group: "editLines",
		enableToggle: true,
		toggleHandler: function(btn, pressed){              
	        var stato=pressed; 	       
	        if (stato==true) {
	        	chiPremuto='attributiLinks'; 
	        	cambiaTitoloFinestraLinee(" - Attributes");
	        	controlloSelezioniLayerWFSAttivo.activate();	         	
	        }else{
	        	cambiaTitoloFinestraLinee("");
	        	unselected_feature_segmenti();        	
	        	controlloSelezioniLayerWFSAttivo.deactivate();
	        }               
		}    
	});
actionsAddingLines["attributes_links"] = actionModifyLineAttributes;
addingLinesToolbarItems.push(actionModifyLineAttributes);	

actionAddLine = new GeoExt.Action({
        //text: "draw line",
    	iconCls: 'draw_line',
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
        toggleGroup: "editLines",
        allowDepress: true,
        tooltip: "Draw a <b>line</b>",        
        group: "editLines",
        toggleHandler: function(btn,pressed){              
            var stato=pressed;        
            if (stato==true) {
            	chiPremuto='aggiungiLink';
            	wfsEditingAttivo.setVisibility(true); 
            	cambiaTitoloFinestraLinee(" - Add Link");            	
            }else{       
            	wfsEditingAttivo.setVisibility(false);
            	cambiaTitoloFinestraLinee("");               	
            }               
    	},
        handler: function(){
        	if (wfsEditingAttivo.selectedFeatures.length>0) {
        		controlloSelezioniLayerWFSAttivo.unselectAll();
    		}       	
        }
});
actionsAddingLines["draw_line"] = actionAddLine;
addingLinesToolbarItems.push(actionAddLine);

actionReshapeLine = new GeoExt.Action({
    //text: "draw line",
	iconCls: 'move_line',
    control: new OpenLayers.Control.ModifyFeature(
            wfsEditingAttivo
    ),
    map: map,
    disabled: false,
    toggleGroup: "editLines",
    allowDepress: true,
    tooltip: "Reshape a <b>link</b>",
    group: "editLines",
    enableToggle: true,
	toggleHandler: function(btn,pressed){              
        var stato=pressed;        
        if (stato==true) {
        	chiPremuto='reshapeLinks';  
        	wfsEditingAttivo.setVisibility(true);
        	cambiaTitoloFinestraLinee(" - Reshape Link"); 
        	attivaDisattivaPerDeleteReshape(stato);
        }else{     
        	wfsEditingAttivo.setVisibility(false);
        	cambiaTitoloFinestraLinee("");   
        	attivaDisattivaPerDeleteReshape(stato);
        }               
	},
    handler: function(){
    	if (wfsEditingAttivo.selectedFeatures.length>0) {
    		controlloSelezioniLayerWFSAttivo.unselectAll();
		}	
    }
});
actionsAddingLines["reshape_line"] = actionReshapeLine;
addingLinesToolbarItems.push(actionReshapeLine);

actionDeleteLine = new GeoExt.Action({
        //text: "draw line",
    	iconCls: 'delete_line',    	
        control: new DeleteFeature(
        		wfsEditingAttivo
        ),
        map: map,
        // button options
        disabled: false,
        toggleGroup: "editLines",
        allowDepress: true,
        tooltip: "Delete a <b>line</b>",
        // check item options
        group: "editLines",
        enableToggle: true,
    	toggleHandler: function(btn, pressed){              
            var stato=pressed;             
            if (stato==true) {
            	chiPremuto='cancellaLink';          	
            	cambiaTitoloFinestraLinee(" - Delete Link"); 
            	attivaDisattivaPerDeleteReshape(stato);
            }else{        	
            	cambiaTitoloFinestraLinee("");   
            	attivaDisattivaPerDeleteReshape(stato);
            }               
    	},
        handler: function(){
        	if (wfsEditingAttivo.selectedFeatures.length>0) {
        		controlloSelezioniLayerWFSAttivo.unselectAll();
    		}	
        }
});
actionsAddingLines["delete_line"] = actionDeleteLine;
addingLinesToolbarItems.push(actionDeleteLine);
//editingToolbarItems.push("-");  
//DRAWING SECTION


var btnSelectSegmentToLink= new Ext.Button({
	  text: 'Select link',
	  id: 'btnAddNewSegLink',
	  name: 'btnAddNewSegLink',
	  width: 148,
	  enableToggle: true,
	  handler: function () { 
		}
	}); 
	
winAttributesLinksEditing = new Ext.Window({	
	title: 'Modify Links',
	closable:false,		
	id: 'linksWin',	
	labelWidth: 80,
	width: 320,
	layout: 'form',
	tbar : addingLinesToolbarItems,
	items:[
		{
			xtype		: 'numberfield',
			fieldLabel	: 'Link ID 0',		
	        boxLabel 	: 'Link ID',       
	        width		: 210,
			name		: 'link_id0',
			id			: 'link_id0',
			disabled	:true
		},{
			xtype		: 'textfield',		
			fieldLabel	: 'Infrastructure Type',
			width		: 210,
			name		: 'link_tipo',
			id			: 'link_tipo'
		},{
			xtype		: 'textfield',		
			fieldLabel	: 'Infrastructure Name',
			width		: 210,
			name		: 'link_nome',
			id			: 'link_nome'
		},{
			xtype		: 'textfield',		
			fieldLabel	: 'Link ID',
			width		: 210,
			name		: 'link_id',
			id			: 'link_id'
		},{
			xtype		: 'textfield',
			fieldLabel	: 'GeoID',
			width		: 210,
			name		: 'link_fid',
			id			: 'link_fid',
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
					id : 'buffer1',
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
					id : 'propagation1',
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
					id : 'organisation1',
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
					id : 'recovery1',
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
					id : 'initial1',
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
					id : '1start1',
					xtype : 'timefield',
					width : 130,
					format : 'H:i',
					increment : 30
				}, {
					fieldLabel : 'End time',
					name : 'End time',
					id : '1end1',
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
					id : '2start1',
					xtype : 'timefield',
					width : 130,
					format : 'H:i',
					increment : 30
				}, {
					fieldLabel : 'End time',
					name : 'End time',
					id : '2end1',
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
    			case "attributiLinks":    				
    				modificaDatiLinksAJAX(datiCollegamento);
    				break;
    			case "aggiungiLink":								
    				inserisciDatiLinksAJAX();
    				break;
    			case "reshapeLinks":
    				try {
    				saveStrategyLine.save();
    				Ext.Msg.show({ title : 'Success',
    					msg : "Link has been reshaped",
    					buttons : Ext.Msg.OK
    				});
    				} catch (e) {
    					Ext.Msg.show({ title : 'Failure',
    						msg : "Link cannot be reshaped",
    						buttons : Ext.Msg.OK
    					});
    				} 
    				break;
    			case "cancellaLink":								
    				try {
    					saveStrategyLine.save();
    					Ext.Msg.show({ title : 'Success',
    						msg : "Link has been deleted",
    						buttons : Ext.Msg.OK
    					});
    				} catch (e) {
    					Ext.Msg.show({ title : 'Failure',
    						msg : "Link cannot be deleted",
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
            	winAttributesLinksEditing.close();
            	map.removeLayer(wfsEditingAttivo);            	
            }
            }
    ]
});
};

function cambiaTitoloFinestraLinee(chiamante){		
	editWinCommArea = Ext.getCmp('linksWin');
	editWinCommArea.setTitle('Modify Links ' + chiamante);	
}

function modificaDatiLinksAJAX(datiCollegamento){
	
	var linkEditingID 	= Ext.getCmp('gid_seg').value;
	var linkDescription	= Ext.getCmp('link_desc').getValue();
	
	var cmboxLinkType = Ext.getCmp('link_type');
		valoreDelComboLinkType = cmboxLinkType.value;
		indiceStorecmboxLinkType = cmboxLinkType.selectedIndex;
		recordStorecmboxLinkType = cmboxLinkType.store.data.itemAt(indiceStorecmboxLinkType);
	var linkType= recordStorecmboxLinkType.data.link_type;	
	
	var cmboxExistingNetwork = Ext.getCmp('combovalueExistingNetwork');
		valoreDelComboLinkedTo = cmboxExistingNetwork.value;
		indiceStoreCmboxExistingNetwork = cmboxExistingNetwork.selectedIndex;
		recordStoreCmboxExistingNetwork = cmboxExistingNetwork.store.data.itemAt(indiceStoreCmboxExistingNetwork);
	var linkedTo= recordStoreCmboxExistingNetwork.data.network_type;
	
	Ext.Ajax.request({
		method : 'POST',
		url : 'php/DB/DBupdateLinks.php',
		params : {
			parametroLinkID  	: linkEditingID,			
			parametroLinkDesc   : linkDescription,
			parametroLinkType	: linkType,
			parametroLinkedTo	: linkedTo
		},
		success : function(response) {
			//UTILISSIMO PERCHE FA UN DECODE DEL JSON CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
			var jsonData 	= Ext.util.JSON.decode(response.responseText);
			var newDesc 	= jsonData.descrizione;
			var newTipo 	= jsonData.tipo;
			var newTo 		= jsonData.connessoA;
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

function inserisciDatiLinksAJAX(){
		
	saveStrategyLine.save();
	
	Ext.Ajax.request({
		method : 'POST',
		url : 'php/DB/DBcurrvalLinks.php',
		params : {},
		success : function(responseLink) {			
			//UTILISSIMO PERCHE FA UN DECODE DEL JSON CHE POSSO UTILIZZARE INSERENDO LA KEY ED OTTENENDO IL VALORE
			var jsonDataLinks	= Ext.util.JSON.decode(responseLink.responseText);	
			var linkEditingID 	= jsonDataLinks.ultimoValLinks;	
						
			var linkDescription	= Ext.getCmp('link_desc').getValue();
			
			var cmboxLinkType = Ext.getCmp('link_type');
				valoreDelComboLinkType = cmboxLinkType.value;
				indiceStorecmboxLinkType = cmboxLinkType.selectedIndex;
				recordStorecmboxLinkType = cmboxLinkType.store.data.itemAt(indiceStorecmboxLinkType);
			var linkType= recordStorecmboxLinkType.data.link_type;	
			
			var cmboxExistingNetwork = Ext.getCmp('combovalueExistingNetwork');
				valoreDelComboLinkedTo = cmboxExistingNetwork.value;
				indiceStoreCmboxExistingNetwork = cmboxExistingNetwork.selectedIndex;
				recordStoreCmboxExistingNetwork = cmboxExistingNetwork.store.data.itemAt(indiceStoreCmboxExistingNetwork);
			var linkedTo= recordStoreCmboxExistingNetwork.data.network_type;
			
			Ext.Ajax.request({
				method : 'POST',
				url : 'php/DB/DBupdateLinks.php',
				params : {
					parametroLinkID  	: linkEditingID,			
					parametroLinkDesc   : linkDescription,
					parametroLinkType	: linkType,
					parametroLinkedTo	: linkedTo
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
		failure : function(responseLink) {										
			Ext.Msg.show({title : 'Failure', msg : response.responseText, buttons : Ext.Msg.OK});
		},
		callback : function(responseLink) {}
	});
}


function attivaDisattivaPerDeleteReshape(stato){
	
}