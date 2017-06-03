var infoPopUPControl;
var infoPopUPWindow;

function infoPopupWMS(map){	

infoPopUPControl = new OpenLayers.Control.WMSGetFeatureInfo({
            url: '/geoserver/wms', 
            hover: false,      
            queryVisible: true,
            //infoFormat: "text/plain",
            //infoFormat: "text/html",
            infoFormat: 'application/vnd.ogc.gml',
            layers : [european_countries],           
            eventListeners: {
                getfeatureinfo: function(event) {                  
                	posizionePopup = event.xy;                  
                	posizioneGeografica = map.getLonLatFromPixel(event.xy).transform(P_900913, P_4326); 
                	posizioneGeograficaText = "Latitude: " + posizioneGeografica.lat.toFixed(2) + " Longitude: " + posizioneGeografica.lon.toFixed(2);
                	risposta = event.features[0].attributes.country;                	                	
                	addPopup(posizioneGeograficaText,posizionePopup,risposta);            
                }
            }
});

map.addControl(infoPopUPControl);     

}

function addPopup(posizioneGeograficaText,posizionePopup,risposta){

valoriDisfunzioni 		= storeDisfunzioni(); 
colModelDysfunctioning 	= valoriDisfunzioni.colModel;
storeDysfunctioning 	= valoriDisfunzioni.store;


valoriRecovery    		= storeTempiDiRipresa();
colModelRecovery 		= valoriRecovery.colModel;
storeRecovery 			= valoriRecovery.store;

valoriStarting 			= startingSectorsStore();
colModelStarting		= valoriStarting.colModel;
console.log(colModelStarting);
storeStarting			= valoriStarting.store;
console.log(storeStarting);

if(!infoPopUPWindow){
	checckoSePopupAperto(colModelDysfunctioning,storeDysfunctioning,colModelRecovery,storeRecovery,colModelStarting,storeStarting);
}
else{
	infoPopUPWindow.destroy();
	checckoSePopupAperto(colModelDysfunctioning,storeDysfunctioning,colModelRecovery,storeRecovery,colModelStarting,storeStarting);
}
}

function checckoSePopupAperto(colModelDysfunctioning,storeDysfunctioning,colModelRecovery,storeRecovery,colModelStarting,storeStarting){
	
	console.log(storeStarting);
	console.log(colModelStarting);
	
	infoPopUPWindow =	new GeoExt.Popup({
	    title: "IO Model for <font color=\"red\">" + risposta + "</font>" ,
	    autoScroll: true,
	    width: 700,
	    height: 425,
        maximizable: true,
        collapsible: true,
	    map: mapPanel.map,
	    anchored: true,
        listeners: {
            close: function() {
         	   infoPopUPWindow = null;
            }
        },
        location:posizionePopup
	});
	
	//add some content to the popup (this can be any Ext component)
	infoPopUPWindow.add(
			{
			xtype:"panel",
			autoWidth: true,
			autoHeight: true,			
			labelWidth: 200,
			layout:'form',
			items:[{			
				xtype:"tabpanel",
				id:"pannelloTabelle",
				activeTab:0,
				autoWidth: true,
				autoHeight: true,			
				items:[{
					xtype:"form",
					autoWidth: true,
					title:"Dysfunctioning Parameters",
					labelWidth: 150,
					height: 319,
					layout:'column',
					items:[{
						columnWidth: 0.6,
						//title:'Starting Sectors',
						layout: 'fit',
						items: [{
					         xtype: 'grid',
					         id: 'gridSettoriRecovery',
					         height: 310,
					         stripeRows	: true, 
					         columnLines: true,
					         loadMask	: true,
					         ds: storeStarting,
					         cm: colModelStarting,
					         sm: new Ext.grid.RowSelectionModel({
					        	 singleSelect: true,
					        	 listeners: {
					        		rowselect: function(sm, row, rec) {     	
					        			 
						          	}			         		
					        	 }
					        }),
					        autoExpandColumn: 'settoreStarting',				        
					        border: false,
					        listeners: {}
						}]
					},{
						columnWidth: 0.4,
						xtype: 'fieldset',
						labelWidth: 80,
						title:'Recovery details',
						defaults: {width: 160, border:false},    //Default config options for child items
						defaultType: 'textfield',
						autoHeight: true,
						bodyStyle: Ext.isIE ? 'padding:0 0 3px 7px;' : 'padding:5px 8px;',
						border: false,
						style: {
							"margin-left": "5px", // when you add custom margin in IE 6...
						     "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-5px" : "-8px") : "0"  // you have to adjust for it somewhere else
						},
						items: [{
					    	xtype:"datefield",
					    	fieldLabel:"Failure Start",
							name:"failureStart",
							id:"failureStart"
					    	},{
							xtype:"datefield",
							fieldLabel:"Failure End",
							name:"failureEnd",
							id:"failureEnd",
				            listeners: {
				                select: function (t,n,o) {
				                    primaData = Ext.getCmp('failureStart').value;
				                    if(typeof primaData === "undefined"){
				                    	Ext.MessageBox.show({
				                            title: 'Error',
				                            msg: 'Please the starting date',
				                            width:300,
				                            buttons: Ext.MessageBox.OKCANCEL
				                        });
				                    	Ext.getCmp('failureEnd').value;
				                    }else{
				                    	date1=Ext.getCmp('failureStart').value;
				                    	date2=Ext.getCmp('failureEnd').value;
				                    	var d1 = new Date(date1); 
				                    	var d2 = new Date(date2);
				                    	var diff = Math.abs(d1 - d2);
				                    	x = diff / 1000;
				                    	seconds = x % 60;
				                    	x /= 60;
				                    	minutes = x % 60;
				                    	x /= 60;
				                    	hours = x % 24;
				                    	x /= 24;
				                    	days = Math.floor(x);
				                    	Ext.getCmp('time').setValue(days);
				                    }
				                }
				            }
					    	},{
							xtype:"numberfield",
							fieldLabel:"Time",
							name:"time",
							id:"time",
							setDisabled:true
						}]
			    }]
				},{			
				xtype:"form",
				id:"pannelloRecovery",
				title:"Recovery Times per Sectors",
				autoWidth: true,
				autoHeight: true,
				layout:'column',
				items:[{
				       columnWidth: 0.6,
				       layout: 'fit',
				       items: {
				         xtype: 'grid',
				         id: 'gridSettoriRecovery',
				         height: 310,
				         stripeRows	: true, 
				         columnLines: true,
				         loadMask	: true,
				         ds: storeRecovery,
				         cm: colModelRecovery,
				         sm: new Ext.grid.RowSelectionModel({
				        	 singleSelect: true,
				        	 listeners: {
				        		rowselect: function(sm, row, rec) {     	
				        			 Ext.getCmp("pannelloRecovery").getForm().loadRecord(rec);
					          	}			         		
				        	 }
				        }),
				        autoExpandColumn: 'settoreRecovery',				        
				        border: false,
				        listeners: {
						     viewready: function(gR) {
						    	 gR.getSelectionModel().selectRow(0);
						       } //Allow rows to be rendered.
						}					
				      }
					},{
						columnWidth: 0.4,
						xtype: 'fieldset',
						labelWidth: 85,
						title:'Recovery details',
						defaults: {width: 160, border:false},    //Default config options for child items
						defaultType: 'textfield',
						autoHeight: true,
						bodyStyle: Ext.isIE ? 'padding:0 0 3px 7px;' : 'padding:5px 8px;',
						border: false,
						style: {
					      "margin-left": "5px", // when you add custom margin in IE 6...
					      "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-5px" : "-8px") : "0"  // you have to adjust for it somewhere else
					},
						items: [
					        {
					        	fieldLabel: 'Sector',
					        	name: 'settoreRecovery'
						    },{
						    	fieldLabel: 'Inoperability',
						        name: 'iniprodino'
						    },{
						    	fieldLabel: 'Recovery Time',
						        name: 'assrectime'
						    }
						    ]					            
						}]
		},{
		  	xtype:"form",
		   	id:"pannelloCascading",
		   	autoWidth: true,
			autoHeight: true,
		    title:"Cascading Dysfunctioning Sectors",
			layout:'column',
			items:[{
			       columnWidth: 0.6,
			       layout: 'fit',
			       items: {
			         xtype: 'grid',
			         id: 'gridDysfunctioning',
			         height: 310,
			         stripeRows	: true, 
			         columnLines: true,
			         loadMask	: true,	
			         ds: storeDysfunctioning,
			         cm: colModelDysfunctioning,
			         sm: new Ext.grid.RowSelectionModel({
			        	 singleSelect: true,
			        	 listeners: {
			        		rowselect: function(sm, row, rec) {     	
			        			 Ext.getCmp("pannelloCascading").getForm().loadRecord(rec);
				          	}			         		
			        	 }
			        }),
			        autoExpandColumn: 'settore',			       
			        border: false,
			        listeners: {
					     viewready: function(gD) {
					          gD.getSelectionModel().selectRow(0);
					       } //Allow rows to be rendered.
					}					
			      }
			},{
			    columnWidth: 0.4,
				xtype: 'fieldset',
				labelWidth: 70,
				title:'Dysfunctioning details',
				defaults: {width: 160, border:false},    // Default config options for child items
				defaultType: 'textfield',
				autoHeight: true,
				bodyStyle: Ext.isIE ? 'padding:0 0 3px 7px;' : 'padding:5px 8px;',
				border: false,
				style: {
				      "margin-left": "5px", // when you add custom margin in IE 6...
				      "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-5px" : "-8px") : "0"  // you have to adjust for it somewhere else
				},
				items: [
				        {
				        	fieldLabel: 'Sector',
				        	name: 'settore'
					    },{
					    	fieldLabel: 'Dysfunction',
					        name: 'percentuale'
					    }
					    ]					            
					}]
		}]	
	}
	],
	tbar:[
	    {		
		text: 'Add Inventory Data',		
		iconCls:'nuovaTabella',
		handler: addTab
		},{
		text: 'Save Parameters',
		iconCls:'salvaParametri',
		tooltip: "Insert Data to Database",			
		handler: function(){
			progressWin();
			Ext.Ajax.request({
				method : 'POST',
				dataType : 'json',
				url : 'php/DB/DBIOM.php',
				params : {
					paese : risposta.toLowerCase()							
				},
				success : function(response) {
					Ext.Msg.alert("Info", response.responseText);
				},
				failure : function(response) {	
					console.log(response);
					Ext.Msg.alert("Info","The server returned the following message <b>'" + response.statusText + "</b>");
				},
				callback : function(response) {
					//Ext.Msg.alert("Info", "Files created");
				}
			});			
		}
		},{
		text: 'Calculate',
		iconCls:'calcolaIOM',
		tooltip: "Start calculations",			
		handler: function(){			
			progressWin();
			Ext.Ajax.request({
				method : 'POST',
				dataType : 'json',
				url : 'php/matlabCalls/callMatlabMOlaf.php',
				params : {
					paese : risposta.toLowerCase()							
				},
				success : function(response) {
					Ext.Msg.alert("Info", "Chart successfully created");
				},
				failure : function(response) {	
					console.log(response);
					Ext.Msg.alert("Info","The server returned the following message <b>'" + response.statusText + "</b>");
				},
				callback : function(response) {
					//Ext.Msg.alert("Info", "Files created");
				}
			});			
		}
		}		
		]
	});
	infoPopUPWindow.doLayout();
	infoPopUPWindow.show();
}

function addTab(){
	tabs = Ext.getCmp('pannelloTabelle');
    index = tabs.items.length;
	tabs.add({
        title: 'Inventory Data',
        iconCls: 'tabs',
        html: 'Inventory Data',
        closable:true
    }).show();
}


function startingSectorsStore(){
	
//  Define the Grid data and create the Grid
	var startingData = [
	        ['Agriculture, Hunting, Forestry and Fishing',false],
			['Mining and Quarrying',false],
			['Food, Beverages and Tobacco',false],
			['Textiles and Textile Products',false],
			['Leather, Leather and Footwear',false],
			['Wood and Products of Wood and Cork',false],
			['Pulp, Paper, Paper , Printing and Publishing',false],
			['Coke, Refined Petroleum and Nuclear Fuel',false],
			['Chemicals and Chemical Products',false],
			['Rubber and Plastics',false],
			['Other Non-Metallic Mineral',false],
			['Basic Metals and Fabricated Metal',false],
			['Machinery, Nec',false],
			['Electrical and Optical Equipment',false],
			['Transport Equipment',false],
			['Manufacturing, Nec; Recycling',false],
			['Electricity, Gas and Water Supply',true],
			['Construction',false],
			['Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',false],
			['Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',false],
			['Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',false],
			['Hotels and Restaurants',false],
			['Inland Transport',false],
			['Water Transport',false],
			['Air Transport',false],
			['Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',false],
			['Post and Telecommunications',false],
			['Financial Intermediation',false],
			['Real Estate Activities',false],
			['Renting of M&Eq and Other Business Activities',false],
			['Public Admin and Defence; Compulsory Social Security',false],
			['Education',false],
			['Health and Social Work',false],
			['Other Community, Social and Personal Services',false],
			['Private Households with Employed Persons',false]
	];

	var storeStarting = new Ext.data.Store({
	     reader: new Ext.data.ArrayReader({}, [
	         {name: 'settoreStarting'},
	         {name: 'sino', type: 'bool'}
	        ])
	    });
	storeStarting.loadData(startingData);		
	
	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	var colModelStarting = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
	    {id:'settoreStarting',header: "Industrial Sector", width: 180, sortable: true, locked:false, dataIndex: 'settoreStarting'},
	    {header: "Start", width: 40, sortable: true, dataIndex: 'sino',xtype: 'checkcolumn'}
	    ]);
	
	var valoriFunzioneStartingSettori			= new Array();	
	valoriFunzioneStartingSettori['store']		= storeStarting;
	valoriFunzioneStartingSettori['colModel']	= colModelStarting;
	
	return valoriFunzioneStartingSettori;	

}

function storeTempiDiRipresa(){
	
//Define the Grid data and create the Grid
	var ripresaData = [
	        ['Agriculture, Hunting, Forestry and Fishing',0,0],
			['Mining and Quarrying',0,0],
			['Food, Beverages and Tobacco',0,0],
			['Textiles and Textile Products',0,0],
			['Leather, Leather and Footwear',0,0],
			['Wood and Products of Wood and Cork',0,0],
			['Pulp, Paper, Paper , Printing and Publishing',0,0],
			['Coke, Refined Petroleum and Nuclear Fuel',0,0],
			['Chemicals and Chemical Products',0,0],
			['Rubber and Plastics',0,0],
			['Other Non-Metallic Mineral',0,0],
			['Basic Metals and Fabricated Metal',0,0],
			['Machinery, Nec',0,0],
			['Electrical and Optical Equipment',0,0],
			['Transport Equipment',0,0],
			['Manufacturing, Nec; Recycling',0,0],
			['Electricity, Gas and Water Supply',0,0],
			['Construction',0,0],
			['Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',0,0],
			['Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',0,0],
			['Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',0,0],
			['Hotels and Restaurants',0,0],
			['Inland Transport',0,0],
			['Water Transport',0,0],
			['Air Transport',0,0],
			['Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',0,0],
			['Post and Telecommunications',0,0],
			['Financial Intermediation',0,0],
			['Real Estate Activities',0,0],
			['Renting of M&Eq and Other Business Activities',0,0],
			['Public Admin and Defence; Compulsory Social Security',0,0],
			['Education',0,0],
			['Health and Social Work',0,0],
			['Other Community, Social and Personal Services',0,0],
			['Private Households with Employed Persons',0,0]
	];

	var storeRipresa = new Ext.data.Store({
	     reader: new Ext.data.ArrayReader({}, [
	         {name: 'settoreRecovery'},
	         {name: 'iniprodino', type: 'int'},
	         {name: 'assrectime', type: 'int'}
	        ])
	    });
	storeRipresa.loadData(ripresaData);	

	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	var colModelRipresa = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
	    {id:'settoreRecovery',header: "Industrial Sector", width: 160, sortable: true, locked:false, dataIndex: 'settoreRecovery'},    
	    {header: "IPI", width: 40, sortable: true, dataIndex: 'iniprodino'},
	    {header: "ART", width: 40, sortable: true, dataIndex: 'assrectime'}
	    ]);
	

	var valoriFunzioneRicovery			= new Array();	
	valoriFunzioneRicovery['store']		= storeRipresa;
	valoriFunzioneRicovery['colModel']	= colModelRipresa;
	
	return valoriFunzioneRicovery;	

}

function storeDisfunzioni(){
	
//  Define the Grid data and create the Grid
	var disfunzioniData = [
	        ['Agriculture, Hunting, Forestry and Fishing',0],
			['Mining and Quarrying',0],
			['Food, Beverages and Tobacco',0],
			['Textiles and Textile Products',0],
			['Leather, Leather and Footwear',0],
			['Wood and Products of Wood and Cork',0],
			['Pulp, Paper, Paper , Printing and Publishing',0],
			['Coke, Refined Petroleum and Nuclear Fuel',0],
			['Chemicals and Chemical Products',0],
			['Rubber and Plastics',0],
			['Other Non-Metallic Mineral',0],
			['Basic Metals and Fabricated Metal',0],
			['Machinery, Nec',0],
			['Electrical and Optical Equipment',0],
			['Transport Equipment',0],
			['Manufacturing, Nec; Recycling',0],
			['Electricity, Gas and Water Supply',0],
			['Construction',0],
			['Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',0],
			['Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',0],
			['Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',0],
			['Hotels and Restaurants',0],
			['Inland Transport',0],
			['Water Transport',0],
			['Air Transport',0],
			['Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',0],
			['Post and Telecommunications',0],
			['Financial Intermediation',0],
			['Real Estate Activities',0],
			['Renting of M&Eq and Other Business Activities',0],
			['Public Admin and Defence; Compulsory Social Security',0],
			['Education',0],
			['Health and Social Work',0],
			['Other Community, Social and Personal Services',0],
			['Private Households with Employed Persons',0]
	];

	var storeDisfunzioni = new Ext.data.Store({
	     reader: new Ext.data.ArrayReader({}, [
	         {name: 'settore'},
	         {name: 'percentuale', type: 'int'}        
	        ])
	    });
	storeDisfunzioni.loadData(disfunzioniData);	

	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	var colModelDisfunzioni = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
	    {id:'settore',header: "Industrial Sector", width: 160, sortable: true, locked:false, dataIndex: 'settore'},    
	    {header: "Dysf.", width: 55, sortable: true, dataIndex: 'percentuale'}
	    ]);
	

	var valoriFunzioneDisfunzioni			= new Array();	
	valoriFunzioneDisfunzioni['store']		= storeDisfunzioni;
	valoriFunzioneDisfunzioni['colModel']	= colModelDisfunzioni;
	
	return valoriFunzioneDisfunzioni;	

}

function storeSettoriInizio(){
	
	//Define the Grid data and create the Grid
	var startingSectorData = [
	        ['Mining Sector',2],
	        ['Petroleum Industry',8],
	        ['Chemical Products',9],
	        ['Electrical and Optical Equipment',14],
	        ['Electricity, Gas and Water Supply',17],
	        ['Inland Transport',23],
	        ['Water Transport',24],
	        ['Air Transport',25],
	        ['Post and Telecommunications',27],
	        ['Financial Intermediation',28],
	        ['Health and Social Work',33],
	        ['Compensation of employees (workforce)',36]
	];

	startingSectorStore = new Ext.data.Store({
		reader: new Ext.data.ArrayReader({}, [
		        {name: 'settoreInizio'},
		        {name: 'numeroSettore', type: 'int'}        
		])
	});
	startingSectorStore.loadData(startingSectorData); 
	
}
