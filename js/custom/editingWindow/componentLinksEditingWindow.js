var winAttributesLinksEditing;
var addingLinesToolbarItems = [], actionsAddingLines = {};

function createLinksManagingWin(map){	

chiPremuto='nessuno';
	
actionModifyLineAttributes = new Ext.Toolbar.Button({    
		id:'attributes_links',
	  	iconCls:'modify_point',
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
	        	select_feature_segmenti.activate();	         	
	        }else{
	        	cambiaTitoloFinestraLinee("");
	        	unselected_feature_segmenti();        	
	        	select_feature_segmenti.deactivate();
	        }               
		}    
	});
actionsAddingLines["attributes_links"] = actionModifyLineAttributes;
addingLinesToolbarItems.push(actionModifyLineAttributes);	

actionAddLine = new GeoExt.Action({
        //text: "draw line",
    	iconCls: 'draw_line',
        control: new OpenLayers.Control.DrawFeature(
	            wfs_layer_lines, 
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
            	wfs_layer_point.setVisibility(true); 
            	cambiaTitoloFinestraLinee(" - Add Link");            	
            }else{       
            	wfs_layer_point.setVisibility(false);
            	cambiaTitoloFinestraLinee("");               	
            }               
    	},
        handler: function(){
        	if (wfs_layer_lines.selectedFeatures.length>0) {
        		select_feature_segmenti.unselectAll();
    		}       	
        }
});
actionsAddingLines["draw_line"] = actionAddLine;
addingLinesToolbarItems.push(actionAddLine);

actionReshapeLine = new GeoExt.Action({
    //text: "draw line",
	iconCls: 'move_point',
    control: new OpenLayers.Control.ModifyFeature(
            wfs_layer_lines
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
        	wfs_layer_point.setVisibility(true);
        	cambiaTitoloFinestraLinee(" - Reshape Link"); 
        	attivaDisattivaPerDeleteReshape(stato);
        }else{     
        	wfs_layer_point.setVisibility(false);
        	cambiaTitoloFinestraLinee("");   
        	attivaDisattivaPerDeleteReshape(stato);
        }               
	},
    handler: function(){
    	if (wfs_layer_lines.selectedFeatures.length>0) {
    		select_feature_segmenti.unselectAll();
		}	
    }
});
actionsAddingLines["reshape_line"] = actionReshapeLine;
addingLinesToolbarItems.push(actionReshapeLine);

actionDeleteLine = new GeoExt.Action({
        //text: "draw line",
    	iconCls: 'delete_line',    	
        control: new DeleteFeature(
        		wfs_layer_lines
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
        	if (wfs_layer_lines.selectedFeatures.length>0) {
        		select_feature_segmenti.unselectAll();
    		}	
        }
});
actionsAddingLines["delete_line"] = actionDeleteLine;
addingLinesToolbarItems.push(actionDeleteLine);
//editingToolbarItems.push("-");  
//DRAWING SECTION

var datiCollegamento = new Ext.data.ArrayStore({
	fields: ['conn_id', 'link_type'],
	data : 	[
	 	 ['1','Physical'],
	   	 ['2','Functional'],
	   	 ['3','Logical'],
	   	 ['4','Cyber'],
	]
});

var tipoCollegamento = new Ext.data.ArrayStore({
	fields: ['tipocoll_id', 'tipocoll_type'],
	data : 	[
	 	 ['1','Producer'],
	   	 ['2','Consumer']
	]
});

var infrastrutturaCollegata = new Ext.data.ArrayStore({
	fields: ['interdipendency_id', 'interdipendency_type'],
	data : 	[
	   	['1','Energy & Utilities'],
		['2','Water'],
		['3','Transportation'],
		['4','Information & Telecom'],
	   	['5','Emergency Services']
	]
});

var comboCollegamento = new Ext.form.ComboBox({
	id:'link_type',		
	fieldLabel: 'Dependency Type',
	mode: 'local',
	store: datiCollegamento,
	displayField:'link_type',
	valueField:'conn_id',
	width: 150,
	triggerAction:'all',
	disabled : true
});


var comboInterdipendenza = new Ext.form.ComboBox({
    id:"combovalueExistingNetwork",		    
	fieldLabel:"Dependent Network",
	name:"combovalueExistingNetwork",
    disabled: true,		   
	mode: 'local',
	store: infrastrutturaCollegata,
	displayField:'interdipendency_type',
	valueField:'interdipendency_id',
	width: 150,
	triggerAction:'all',
	disabled : true
});

var comboDirezioneInterdipendenza = new Ext.form.ComboBox({
	fieldLabel:"Dependency",
    id:"combovalueDirezioneNetwork",
	name:"combovalueDirezioneNetwork",
    disabled: true,		   
	mode: 'local',
	store: tipoCollegamento,
	displayField:'tipocoll_type',
	valueField:'tipocoll_id',
	width: 150,
	triggerAction:'all',
	disabled : true
});

var btnSelectNodeToLink= new Ext.Button({
	  text: 'Select Element',
	  id: 'btnAddNewNodeLink',
	  name: 'btnAddNewNodeLink',
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
	labelWidth: 120,
	width: 320,
	layout: 'form',
	tbar : addingLinesToolbarItems,
	items:[
		{
			xtype: 'numberfield',
			fieldLabel: 'Link ID',		
	        boxLabel : 'Link ID',       
	        width: 120,
			name: 'gid_seg',
			id: 'gid_seg',
			disabled:true
		},{
			xtype:"panel",
			layout: 'hbox',
			id: 'pannelloNodiStartEnd',
			layoutConfig: {
                padding:'8',
                align:'center'
            },
            defaults:{margins:'0 0 0 0'},
			items:[{
				xtype: 'numberfield',
				fieldLabel: 'Start Node ID',		
		        boxLabel :  'Start Node',       
		        //width: 100,
				name: 'snode',
				id: 'snode',
				disabled:true
			},{
				xtype: 'numberfield',
				fieldLabel: 'End Node ID',		
		        boxLabel :  'End Node',       
		        //width: 100,
				name: 'enode',
				id: 'enode',
				disabled:true
			}	
			  ]	 
		},{
			xtype: 'textfield',		
			fieldLabel: 'Description',
			width: 120,
			name: 'link_desc',
			id: 'link_desc'
		},{
			xtype: 'textfield',
			fieldLabel: 'Feature ID',
			width: 120,
			name: 'link_fid',
			id: 'link_fid',
			disabled:true
		}
		,{
		    xtype:"checkbox",
		    fieldLabel:"Interdependency",
		    boxLabel:"Linked to Infrastructure?",
		    id:"radioExistingNetwork",
		    handler : function(){	
		    	if (this.checked==true) {
		    		Ext.getCmp('combovalueExistingNetwork').setDisabled(false);
		    		Ext.getCmp('link_type').setDisabled(false);
		    		Ext.getCmp('combovalueDirezioneNetwork').setDisabled(false);
		    		Ext.getCmp('textvalueIDExistingNetwork').setDisabled(false);
				} else {
					Ext.getCmp('combovalueExistingNetwork').setDisabled(true);
					Ext.getCmp('link_type').setDisabled(true);
					Ext.getCmp('combovalueDirezioneNetwork').setDisabled(true);
					Ext.getCmp('textvalueIDExistingNetwork').setDisabled(true);
				}
		    }
		  },
		   comboCollegamento, 
		   comboInterdipendenza,
		   comboDirezioneInterdipendenza,		   
		   btnSelectNodeToLink
		,{
		    xtype:"textfield",
		    fieldLabel:"Selected Node",
		    name:"textvalueIDExistingNetwork",
		    id:"textvalueIDExistingNetwork",
		    enabled: false
		  }/*,{
		    xtype:"textfield",
		    fieldLabel:"Value Selected",
		    name:"textvalueValueExistingNetwork",
		    id:"textvalueValueExistingNetwork",
		    enabled: false
		  }*/],
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
	        	wfs_layer_lines.refresh({force: true});			       
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
            	winAttributesLinksEditing.hide();
            	map.removeLayer(wfs_layer_lines);
            	map.removeLayer(wfs_layer_point);
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
	
	var len = winAttributesLinksEditing.items.length;
	for(i=0;i<len;i++){
		if (i==0 || i==3 ) {
			
		} else {
			winAttributesLinksEditing.items.items[i].setDisabled(stato);
		}
		    
	}
}