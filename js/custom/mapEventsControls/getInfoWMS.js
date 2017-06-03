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
                	console.log(event);
                	posizionePopup = event.xy;                  
                	posizioneGeografica = map.getLonLatFromPixel(event.xy).transform(P_900913, P_4326); 
                	posizioneGeograficaText = "Latitude: " + posizioneGeografica.lat.toFixed(2) + " Longitude: " + posizioneGeografica.lon.toFixed(2);
                	risposta = (event.features[0].attributes.country).replace(" ","");                	                	
                	addPopup(posizioneGeograficaText,posizionePopup,risposta);            
                }
            }
});
map.addControl(infoPopUPControl);    

}

function addPopup(posizioneGeograficaText,posizionePopup,risposta){	

valoriCalcolo 			= raccoltaDatiSettori();
colModelSectors			= valoriCalcolo.colModel;
storeSectors			= valoriCalcolo.store;

valoriInventory 		= raccoltaDatiInventory();
colModelInventory		= valoriInventory.colModel;
storeInventory			= valoriInventory.store;

if(!infoPopUPWindow){
	checckoSePopupAperto(colModelSectors,storeSectors,colModelInventory,storeInventory);
	}
else{
	infoPopUPWindow.destroy();
	checckoSePopupAperto(colModelSectors,storeSectors,colModelInventory,storeInventory);
	}
}

function checckoSePopupAperto(colModelSectors,storeSectors,colModelInventory,storeInventory){	
	
	
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
					height: 318,
					items:[{
						     xtype: 'editorgrid',
					         id: 'gridSettori',
					         height: 310,
					         stripeRows	: true, 
					         columnLines: true,
					         loadMask	: true,
					         clicksToEdit: 1,
					         ds: storeSectors,
					         cm: colModelSectors,
					         sm: new Ext.grid.RowSelectionModel({
					        	 singleSelect: true,
					        	 listeners: {
					        		rowselect: function(sm, row, rec) {     					        			 
						          	}			         		
					        	 }
					        }),
					        autoExpandColumn: 'settoreInventory',				        
					        border: false,
					        listeners: {},
					        bbar: [{
								text: 'Save Parameters',
								iconCls:'salvaParametri',
								tooltip: "Insert Data to Database",			
								handler: function(){
												
								var valoriUpdate = [];	
								for ( var int = 0; int < storeSectors.modified.length; int++) {
									valoriUpdate[int] = new Array(storeSectors.modified[int].data.settoreID, 		//0
									 	                          storeSectors.modified[int].data.settoreInventory,	//1
									 	                          storeSectors.modified[int].data.dayInop,			//2
									 	                          storeSectors.modified[int].data.iniprodino,		//3
									 	                          storeSectors.modified[int].data.assrectime,		//4
									 	                          storeSectors.modified[int].data.dysfunction);		//5
								}						
								
								//progressWin();
								Ext.Ajax.request({
									method : 'POST',
									dataType : 'json',
									url : 'php/DB/DBIOM_parameters.php',
									params : {
										paese 		: risposta.toLowerCase(),
										valoriUpdate: Ext.encode(valoriUpdate)
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
							}]					       
						}]
				},{			
					xtype:"form",
					id:"pannelloInventory",
					title:"Inventory per Sector",
					autoWidth: true,
					autoHeight: true,
					items:[{
				         xtype: 'editorgrid',
				         id: 'gridSettoriInventory',
				         height: 310,
				         stripeRows	: true, 
				         columnLines: true,
				         loadMask	: true,
				         clicksToEdit: 1,
				         ds: storeInventory,
				         cm: colModelInventory,
				         sm: new Ext.grid.RowSelectionModel({
				        	 singleSelect: true,
				        	 listeners: {
				        		rowselect: function(sm, row, rec) {}			         		
				        	 }
				        }),
				        autoExpandColumn: 'settoreInventory',				        
				        border: false,
				        listeners: {},
				        bbar: [{

				        	text: 'Save Inventory Data',
							iconCls:'salvaParametri',
							tooltip: "Insert Data to Database",			
							handler: function(){			
											
							var valoriUpdateInventory = [];	
							for ( var int = 0; int < storeInventory.modified.length; int++) {
								valoriUpdateInventory[int] = new Array(
										storeInventory.modified[int].data.settoreID, 	//0
										storeInventory.modified[int].data.inventoryValue);	//1
							}
							
							//progressWin();
							Ext.Ajax.request({
								method : 'POST',
								dataType : 'json',
								url : 'php/DB/DBIOM_inventory.php',
								params : {
									paese 				 : risposta.toLowerCase(),
									valoriUpdateInventory: Ext.encode(valoriUpdateInventory)
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
						}]
				      }]
				}]
	}],
	tbar:[
	    {
	      xtype:		"label",
	      text :		"Calculation Type (1/2)  "	     
	    },{
	      xtype:		"numberfield",
	      fieldLabel:	"Calculation 1/2",
	      name:			"algorithm",
	      id:			"algorithm",
	      width: 		100
		},{
		text: 'Calculate',
		iconCls:'calcolaIOM',
		tooltip: "Start calculations",			
		handler: function(){			
			progressWin();
			var algoritmo = Ext.getCmp('algorithm').value;			
			if (algoritmo===undefined) {
				algoritmo=1;				
			}
			//console.log(algoritmo);	
			Ext.Ajax.request({
				method : 'POST',
				dataType : 'json',
				url : 'php/matlabCalls/callCompiledIOM.php',
				params : {
					paese 		: risposta.toLowerCase(),	
					algoritmo 	: algoritmo
				},
				success : function(response) {
					Ext.Msg.show({
						   title:'Info',
						   msg: 'Files created. Do you want to download them?',
						   buttons: Ext.Msg.YESNO,
						   fn: function (btn){
						        if(btn=='yes'){     
						        	var win = new Ext.Window({
						      			title	: 'FileBrowser',
						      			layout	: 'fit',
						      			width	: 800,
						      			height	: 600,
						      			items	: [{xtype: 'ux-filebrowserpanel'}]
						    		});
						    	win.show();
						        }
						   },
						   icon: Ext.MessageBox.QUESTION
						});		
				},
				failure : function(response) {	
					console.log(response);
					//Ext.Msg.alert("Info","The server returned the following message <b>'" + response.statusText + "</b>");
					
					//FALSO AVVISO					
					/*Ext.Msg.show({
						   title:'Info',
						   msg: 'Files created. Do you want to download them?',
						   buttons: Ext.Msg.YESNO,
						   fn: function (btn){
						        if(btn=='yes'){     
						        	var win = new Ext.Window({
						      			title	: 'FileBrowser',
						      			layout	: 'fit',
						      			width	: 800,
						      			height	: 600,
						      			items	: [{xtype: 'ux-filebrowserpanel'}]
						    		});
						    	win.show();
						        }
						   },
						   icon: Ext.MessageBox.QUESTION
						});		*/			
					
				},
				callback : function(response) {
					//Ext.Msg.OKCANCEL("Info", "Files created. Do you want to download them?");
				}
			});			
		}
		}		
		]
	});
	infoPopUPWindow.doLayout();
	infoPopUPWindow.show();
}

function raccoltaDatiSettori(){
	
//shorthand alias
var formModifica = Ext.form;
	
// Define the Grid data and create the Grid
var sectorsData = [
	        ['c1','Agriculture, Hunting, Forestry and Fishing',0,0,0,0],
			['c2','Mining and Quarrying',0,0,0,0],
			['c3','Food, Beverages and Tobacco',0,0,0,0],
			['c4','Textiles and Textile Products',0,0,0,0],
			['c5','Leather, Leather and Footwear',0,0,0,0],
			['c6','Wood and Products of Wood and Cork',0,0,0,0],
			['c7','Pulp, Paper, Paper , Printing and Publishing',0,0,0,0],
			['c8','Coke, Refined Petroleum and Nuclear Fuel',0,0,0,0],
			['c9','Chemicals and Chemical Products',0,0,0,0],
			['c10','Rubber and Plastics',0,0,0,0],
			['c11','Other Non-Metallic Mineral',0,0,0,0],
			['c12','Basic Metals and Fabricated Metal',0,0,0,0],
			['c13','Machinery, Nec',0,0,0,0],
			['c14','Electrical and Optical Equipment',0,0,0,0],
			['c15','Transport Equipment',0,0,0,0],
			['c16','Manufacturing, Nec; Recycling',0,0,0,0],
			['c17','Electricity, Gas and Water Supply',0,0,0,0],
			['c18','Construction',0,0,0,0],
			['c19','Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',0,0,0,0],
			['c20','Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',0,0,0,0],
			['c21','Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',0,0,0,0],
			['c22','Hotels and Restaurants',0,0,0,0],
			['c23','Inland Transport',0,0,0,0],
			['c24','Water Transport',0,0,0,0],
			['c25','Air Transport',0,0,0,0],
			['c26','Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',0,0,0,0],
			['c27','Post and Telecommunications',0,0,0,0],
			['c28','Financial Intermediation',0,0,0,0],
			['c29','Real Estate Activities',0,0,0,0],
			['c30','Renting of M&Eq and Other Business Activities',0,0,0,0],
			['c31','Public Admin and Defence; Compulsory Social Security',0,0,0,0],
			['c32','Education',0,0,0,0],
			['c33','Health and Social Work',0,0,0,0],
			['c34','Other Community, Social and Personal Services',0,0,0,0],
			['c35','Private Households with Employed Persons',0,0,0,0]
	];

	var storeSectors = new Ext.data.Store({
	     reader: new Ext.data.ArrayReader({}, 
	    	[
	         {name: 'settoreID'					 },
	         {name: 'settoreInventory'			 },
	         {name: 'dayInop'		, type: 'int'},
	         {name: 'iniprodino'	, type: 'int'},
	         {name: 'assrectime'	, type: 'int'},
	         {name: 'dysfunction'	, type: 'int'}
	        ])
	    });
	storeSectors.loadData(sectorsData);		
	
	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	var colModelSectors = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		{	id:'settoreID',
			header: "Industrial Sector ID",
			setHidden:true,
			dataIndex:'settoreID'
		},{
			id:'settoreInventory',
			header: "Industrial Sector", 
			width: 40, sortable: true, 
			locked:false, 
			dataIndex: 'settoreInventory'
		},{	
			id:'dayInop',
			header: "Inoperability(days)", 
	    	width: 100, 
	    	sortable: true, 
	    	dataIndex: 'dayInop',
	    	editor: new formModifica.NumberField({
                allowBlank: false,
                allowNegative: false,
                minValue: 1,
                maxValue: 365
            })
	    },{
	    	id:'iniprodino',
			header: "Inoperability %", 
			width: 85, 
			sortable: true, 
			dataIndex: 'iniprodino',
	    	editor: new formModifica.NumberField({
                allowBlank: false,
                allowNegative: false,
                minValue: 1,
                maxValue: 100
            })
		},{	
			id:'assrectime',
	    	header: "Recovery %", 
            width: 70, 
            sortable: true, 
            dataIndex: 'assrectime',
	    	editor: new formModifica.NumberField({
                allowBlank: false,
                allowNegative: false,
                minValue: 1,
                maxValue: 100
            })
        },{
        	id:'dysfunction',
			header: "Dysfunction %", 
	    	width: 85, 
	    	sortable: true, 
	    	dataIndex: 'dysfunction',
	    	//renderer :  function(val) {
	             //return val+"%";
	        //},
	    	editor: new formModifica.NumberField({
                allowBlank: false,
                allowNegative: false,
                minValue: 1,
                maxValue: 100
            })
		}
	    ]);
	
	colModelSectors.setHidden(1,true);
	
	var valoriFunzioneSettori				= new Array();	
	valoriFunzioneSettori['store']			= storeSectors;
	valoriFunzioneSettori['colModel']		= colModelSectors;
	
	return valoriFunzioneSettori;	

}

function raccoltaDatiInventory(){
	
//shorthand alias
var formInventory = Ext.form;	
	
//  Define the Grid data and create the Grid
	var inventoryData = [
	        ['c1','Agriculture, Hunting, Forestry and Fishing',0],
			['c2','Mining and Quarrying',0],
			['c3','Food, Beverages and Tobacco',0],
			['c4','Textiles and Textile Products',0],
			['c5','Leather, Leather and Footwear',0],
			['c6','Wood and Products of Wood and Cork',0],
			['c7','Pulp, Paper, Paper , Printing and Publishing',0],
			['c8','Coke, Refined Petroleum and Nuclear Fuel',0],
			['c9','Chemicals and Chemical Products',0],
			['c10','Rubber and Plastics',0],
			['c11','Other Non-Metallic Mineral',0],
			['c12','Basic Metals and Fabricated Metal',0],
			['c13','Machinery, Nec',0],
			['c14','Electrical and Optical Equipment',0],
			['c15','Transport Equipment',0],
			['c16','Manufacturing, Nec; Recycling',0],
			['c17','Electricity, Gas and Water Supply',0],
			['c18','Construction',0],
			['c19','Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',0],
			['c20','Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',0],
			['c21','Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',0],
			['c22','Hotels and Restaurants',0],
			['c23','Inland Transport',0],
			['c24','Water Transport',0],
			['c25','Air Transport',0],
			['c26','Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',0],
			['c27','Post and Telecommunications',0],
			['c28','Financial Intermediation',0],
			['c29','Real Estate Activities',0],
			['c30','Renting of M&Eq and Other Business Activities',0],
			['c31','Public Admin and Defence; Compulsory Social Security',0],
			['c32','Education',0],
			['c33','Health and Social Work',0],
			['c34','Other Community, Social and Personal Services',0],
			['c35','Private Households with Employed Persons',0]
	];

	var storeInventory = new Ext.data.Store({
	     reader: new Ext.data.ArrayReader({}, [
	         {name: 'settoreID'},
	         {name: 'settoreInventory'},
	         {name: 'inventoryValue'}
	        ])
	    });
	storeInventory.loadData(inventoryData);		
	
	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	var colModelInventory = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		{	id:'settoreID',
			header: "Industrial Sector ID",
			setHidden:true,
			dataIndex:'settoreID'
		},{
			id:'settoreInventory', 
			header: "Sector", 
			sortable: true, 
			locked:false, 
			dataIndex: 'settoreInventory'
		},{
			id:'inventoryValue',
			header: "Inventory", 
			width: 90, 
			sortable: true, 
			dataIndex: 'inventoryValue',
	    	editor: new formInventory.NumberField({
                allowBlank: false,
                allowNegative: false,
                maxValue: 365
            })
		}
	    ]);
	colModelInventory.setHidden(1,true);
	
	var valoriFunzioneInventorySettori			= new Array();	
	valoriFunzioneInventorySettori['store']		= storeInventory;
	valoriFunzioneInventorySettori['colModel']	= colModelInventory;
	
	return valoriFunzioneInventorySettori;	

}


