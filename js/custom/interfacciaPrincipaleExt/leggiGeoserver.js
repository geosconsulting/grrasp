var geoserverPanel;

function leggiGeo(){

Ext.Ajax.disableCaching = false;   
	
var URLWorkSpace = "php/geoserverREST/ReadWS.php";
var URLayers 	 = "php/geoserverREST/ReadLayers.php";
var URLDataStore = "php/geoserverREST/ReadDT.php";

var storeWS= new Ext.data.JsonStore({
		url: URLWorkSpace,
		root:'workspaces.workspace',		
		fields: ['name','atom'],		
		autoLoad:true 	
	});	
	
var inputWS;

var gridWS = new Ext.grid.GridPanel({
	id: 'grigliaWS',	
	frame: false,
	//title: 'Worskpaces',
	autoHeight: true,
	//width: 250,
	store: storeWS,
	colModel: new Ext.grid.ColumnModel({
		defaultSortable: false,
		columns: [
			{header: " Name", dataIndex: 'name',width:150}
			//,{header: "Link", dataIndex: 'atom'}
		]
	}),
	sm: new Ext.grid.RowSelectionModel({
		singleSelect: true,
			listeners: {
				rowselect: function(sm, index, record) {
					inputWS = record.get('name');				
					Ext.Ajax.request({					
						method: 'POST',
	        			waitMsg: 'Please Wait',
	        			url: 'php/geoserverREST/writeSessionWS.php',
	        			params: { 				           		
						 	nomeWSAttivo: inputWS
						},
						success: function(response){						
							storeDT.reload();						
							Ext.getCmp('grigliaDT').getView().refresh();							
						},
						failure: function(response){									
								Ext.Msg.alert("Info","Problems sending the WS name");
						},
						callback: function(response){  
						  		Ext.getCmp('grigliaDT').getView().refresh();
						}
					});			
				}
			}
	}),
	bbar: [
		/* FORSE IL CAMBIAMENTO DEL NOME WS NON SERVE A MOLTO VISTO CHE E' HARD CODED NON LO INSERISCO
		{
		text: 'Change ',
			handler: function(){
				var sm = gridWS.getSelectionModel(),
				sel = sm.getSelected();
				if (sm.hasSelection()){
				Ext.Msg.show({
					title: 'Change',
					prompt: true,
					buttons: Ext.MessageBox.OKCANCEL,
					value: sel.get('name'),
					fn: function(btn,text){
						if (btn == 'ok'){
							sel.set('title', text);
						}
					}
				});
				}
			}
		},
		/* FORSE IL CAMBIAMENTO DEL WS NON SERVE A MOLTO VISTO CHE E' HARD CODED NON LO INSERISCO
		*/{
			text: 'Add',
			handler: function(){
				Ext.Msg.show({
					title: 'Nome WS',
					prompt: true,
					buttons: Ext.MessageBox.OKCANCEL,				
					fn: function(btn,text){
						if (btn == 'ok'){
							inputWS = text;
							Ext.Ajax.request({
							method: 'POST',
							url: 'php/geoserverREST/WriteWS.php',
				           	params: { 
				           		nomeWorkspace: inputWS
				           	},
							success: function(response){
								Ext.Ajax.request({
									method: 'POST',									
									url: 'php/geoserverREST/ReadWS.php',
									success: function(response){						
										Ext.Msg.alert("Info","Workspace Added");  										
									},
									failure: function(response){									
										Ext.Msg.alert("Info","Problems in refreshing the WS");
						    		},
						    		callback: function(response){  
						    			Ext.getCmp('grigliaWS').getStore().load();    			
						    		}
						    		});								      										
							},
								failure: function(response){								
								Ext.Msg.alert("Info","Problems in creating the WS");
				    		},
				    		callback: function(response){  
				    			
				    		}
				    	});
							
						}
					}});			
				}
		},{
			text: 'Delete',
			handler: function(){
				var sm = gridWS.getSelectionModel(),
				sel = sm.getSelected();
				if (sm.hasSelection()){
				Ext.Msg.show({
					title:'Save Changes?',
  					msg: 'Your are deleting a workspace. Are you sure?',					
					buttons: Ext.MessageBox.YESNO,
					value: sel.get('name'),
					fn: function(btn,text){
						if (btn == 'yes'){
							Ext.Ajax.request({
								method: 'POST',
								url: 'php/geoserverREST/DeleteWS.php',
					           	params: { 
					           		//PROCEDURA DI SICUREZZA CHE AL MOMENTO CANCELLA SOLO UN WS CHIAMATO FAB
					           		nomeWorkspaceDel: 'fab'
					           		//PROCEDURA DI SICUREZZA CHE AL MOMENTO CANCELLA SOLO UN WS CHIAMATO FAB
					           	},
								success: function(response){
									Ext.Ajax.request({
									method: 'POST',									
									url: 'php/geoserverREST/ReadWS.php',
									success: function(response){						
										Ext.Msg.alert("Info","Workspace Deleted");  										
									},
									failure: function(response){									
										Ext.Msg.alert("Info","Problems in deleting the WS");
						    		},
						    		callback: function(response){  
						    			Ext.getCmp('grigliaWS').getStore().load();    			
						    		}
						    		});	
								},
								failure: function(response){									
									Ext.Msg.alert("Info","Problems in deleting the WS");
					    		},
					    		callback: function(response){  
					    			
					    		}
					    	});							
						}else{
							console.log('NISBA');
						}
					}
				});
				}
			}
		},{
			text: 'Refresh',
			handler: function(){
				Ext.Ajax.request({
				method: 'POST',					
					url: 'php/geoserverREST/ReadWS.php',
					success: function(response){						
						Ext.Msg.alert("Info","Workspaces up-to-date");  										
					},
					failure: function(response){
						console.log('fallimento');
						Ext.Msg.alert("Info","Problems in refreshng the WS");
		    		},
		    		callback: function(response){  
		    			Ext.getCmp('grigliaWS').getStore().load();    			
		    		}
				});
				  	
			}
		}]
	});
	
var storeDT= new Ext.data.JsonStore({
		url: URLDataStore,
		root:'dataStores.dataStore',		
		fields: ['name'],		
		autoLoad:true	
});
	
var inputDT;
var gridDT = new Ext.grid.GridPanel({		
		id: 'grigliaDT',		
		frame: false,
		//title: 'DataStores JSON',
		//height: 250,
		//width: 250,
		autoHeight: true,
		store: storeDT,
		bbar: [
		/*{
			text: 'Del',
			handler: function(){
				var sm = gridDT.getSelectionModel();
				var laRigaSelezionataDallaGriglia = sm.getSelected();
				var ilRecNome = laRigaSelezionataDallaGriglia.data.name;				
				if (sm.hasSelection()){
					Ext.Msg.show({
					title:'Save Changes?',
  					msg: 'Your are deleting a datastore. Are you sure?',					
					buttons: Ext.MessageBox.YESNO,
					value: ilRecNome,
					fn: function(btn,text){
						if (btn == 'yes'){
							Ext.Ajax.request({
								method: 'POST',
								url: 'php/geoserverREST/DeleteDT.php',
					           	params: {					           		
					           		nomeDatastoreDel: ilRecNome.toString()
					           	},
								success: function(response){
									Ext.Ajax.request({
									method: 'POST',									
									url: 'php/geoserverREST/ReadDT.php',
									success: function(response){						
										Ext.Msg.alert("Info","Datastore Deleted");  										
									},
									failure: function(response){									
										Ext.Msg.alert("Info","Problems in deleting the Datastore");
						    		},
						    		callback: function(response){  
						    			Ext.getCmp('grigliaDT').getStore().load();    			
						    		}
						    		});	
								},
								failure: function(response){									
									Ext.Msg.alert("Info","Problems in deleting the Datastore");
					    		},
					    		callback: function(response){  
					    			
					    		}
					    	});							
						}else{
							console.log('Annullata cancellazione Datastore');
						}
					}
				});
				}
			}
		},*/{
			text: 'Refresh',
			handler: function(){
				Ext.Ajax.request({
				method: 'POST',					
					url: 'php/geoserverREST/ReadDT.php',
					success: function(response){
						//console.log(response.responseText);
						Ext.Msg.alert("Info","Datastores up-to-date");  										
					},
					failure: function(response){
						console.log('fallimento');
						Ext.Msg.alert("Info","Problems in refreshng the Datastores");
		    		},
		    		callback: function(response){  
		    			Ext.getCmp('grigliaDT').getStore().load();    			
		    		}
				});
				  	
			}
		}	
		],//bbar finisce
		colModel: new Ext.grid.ColumnModel({
			defaultSortable: false,
			columns: [					
				{header: "name", dataIndex: 'name', width:150}							
			]
		}),
		sm: new Ext.grid.RowSelectionModel({
		singleSelect: true,
		listeners: {
			rowselect: function(sm, index, record) {
				inputDT = record.get('name');				
				Ext.Ajax.request({					
					method: 'POST',
        			waitMsg: 'Please Wait',
        			url: 'php/geoserverREST/writeSessionDT.php',
        			params: { 				           		
					 	nomeDTAttivo: inputDT
					},
					success: function(response){						
						storeLayers.reload();
						Ext.getCmp('grigliaLY').getView().refresh();							
					},
					failure: function(response){									
							Ext.Msg.alert("Info","Problems with DT name");
					},
					callback: function(response){  
					  		Ext.getCmp('grigliaLY').getView().refresh();
					}
				});			
			}
		}
		})
	});  
	
var storeLayers= new Ext.data.JsonStore({
		url: URLayers,
		root:'featureTypes.featureType',		
		fields: ['name'],		
		autoLoad:true 	
});
	
var gridLY = new Ext.grid.GridPanel({
		id: 'grigliaLY',		
		frame: false,
		//title: 'Layers JSON',
		//height: 350,
		//width: 250,
		autoHeight: true,
		store: storeLayers,
        bbar: [{
            text: "Add to map",
            handler: function() {               
				ilRecord = gridLY.getSelectionModel().getSelected();
				idRecord= ilRecord.id;
				nomeRecord = ilRecord.data.name;
				console.log("ID: " + idRecord + " / Nome Layer: " + nomeRecord );
				var layerSelezionato = new OpenLayers.Layer.WMS(nomeRecord.toString(),
					"/geoserver/wms", {
					layers : "gisplatform:" + nomeRecord,
					transparent : "true",
					format : "image/png",
					srs: "EPSG:4326"
				},{
					isBaseLayer : false,
					visibility : true
				});
				map.addLayers([layerSelezionato]);
            }
        }],
		colModel: new Ext.grid.ColumnModel({
			defaultSortable: false,
			columns: [					
				{header: "name", dataIndex: 'name', width:150}							
			]
			})
	});  
	
	
geoserverPanel = new Ext.Panel({
	id: 'pannelloGeoserver',
	//title: 'GeoServer Local',
	autoHeight:true,
	autoWidth:true,	
	hideBorders: true,
	//renderTo: Ext.getCmp('westId').items.first(),
	items:[
		{	
			xtype:"panel",
			title:"Worskpaces",	 
			id: 'wsSpace',
			autoHeight:true,
			width:true,
			collapsible : true,
			collapsed : false,
			hideBorders: true,
			items:[gridWS]
	    },{
		    xtype:"panel",
		    title:"Datastores",
		    id: 'dtSpace',
			autoHeight:true,
			autoWidth:true,
			collapsible : true,
			collapsed : true,
			hideBorders: true,
			items:[gridDT],
			listeners: {
				expand : function() {
    				
			}}
	    },{
		    xtype:"panel",
		    title:"Layers",
		    id: 'lySpace',
			autoHeight:true,
			autoWidth:true,
			collapsible : true,
			collapsed : true,
			hideBorders: true,
			items:[gridLY],
			listeners: {
				expand : function() {
    				
			}}
	 	}
	 ]  				  
});

westGeoserver.add(geoserverPanel);
westGeoserver.doLayout();

}

function distruggiPannelloGeoserver(){
	var f;
	while(f = westGeoserver.items.first()){
		westGeoserver.remove(f, true);		
	}
}