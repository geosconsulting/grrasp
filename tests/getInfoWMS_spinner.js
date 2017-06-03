var infoPopUPControl;
var infoPopUPWindow;
var startingSectorStore;
var storeP0;

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

// example of custom renderer function
function change(val){
   if(val > 0){
        return '<span style="color:red;">' + val + '%</span>';
   }else if(val = 0){
        return '<span style="color:green;">' + val + '%</span>';
   }
return val;
}
	
//  Define the Grid data and create the Grid
var p0Data = [
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

storeP0 = new Ext.data.Store({
     reader: new Ext.data.ArrayReader({}, [
         {name: 'settore'},
         {name: 'percentuale', type: 'int'}        
        ])
    });
storeP0.loadData(p0Data);	

// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
var colModel = new Ext.grid.ColumnModel([
	new Ext.grid.RowNumberer(),
    {id:'company',header: "Industrial Sector", width: 160, sortable: true, locked:false, dataIndex: 'settore'},    
    {header: "Dysf.", width: 55, sortable: true, renderer: change, dataIndex: 'percentuale'}
    ]);

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

comboSettori = new Ext.form.ComboBox({
	    id:'settoreScelto',
	    labelWidth: 120,		
		fieldLabel: 'Starting Sector',		
		typeAhead: true,		
        triggerAction: 'all',       
        forceSelection:true,
        mode: 'local',
		store: startingSectorStore,
		displayField:'settoreInizio',
		valueField:'numeroSettore',
		width:430,
		listeners: {
		    select: function(combo, record, index) {
		    	str = record.data.numeroSettore;		        
		        console.log(str);
		    }
		  }
});	

if(!infoPopUPWindow){
	dopoCheck();
}
else{
	infoPopUPWindow.destroy();
	dopoCheck();
}

function dopoCheck(){
	
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
	{xtype:"panel",
	 autoWidth: true,
	 autoHeight: true,
	 //title:"Model Parameters",
	 labelWidth: 200,
	 layout:'form',
	 items:[
			{			
			xtype:"tabpanel",
			id:"pannelloTabelle",
			activeTab:0,
			autoWidth: true,
			autoHeight: true,			
			items:[
			    {
				xtype:"panel",
				autoWidth: true,
				title:"Dysfunctioning Parameters",
				labelWidth: 150,
				height: 318,
				layout:'form',
				items:[				       
					{
					    xtype:'compositefield',
					    layout:'hbox',
					    items:[comboSettori,
					        {
					        xtype:'button',
					        text: 'Add Selected',
					        handler: function(){
					        	areaListaSettori = Ext.getCmp('settoriInizio');
					        }
					    }]
					},{
			            xtype: 'textarea',
			            grow: true,
			            id: 'settoriInizio',
			            fieldLabel: 'Chosen Sectors',
			            anchor: '100%'				    	
				    },{
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
					}
					]
				},{			
				xtype:"panel",
				id:"pannelloRecovery",
				title:"Recovery Times per Sectors",
				autoScroll: true,
				activeTab:0,
				autoWidth: true,				
				items:[{
					xtype:"panel",					
					layout:'accordion',
					items:[
					       {
					    xtype:"fieldset",
					    title:"Mining Sector",
					    autoHeight:true,
					    labelWidth: 200,
					    layout: 'form',
					    items:[
					         {
						    	xtype:"spinnerfield",
						    	fieldLabel:"Initial production inoperability",
						    	name:"recoveryTime",
						    	minValue: 1,
						    	maxValue: 365,
						    	allowDecimals: true,
						    	decimalPrecision: 0,
						    	incrementValue: 1,
						    	alternateIncrementValue: 5,
						    	accelerate: true
						    },{
						        xtype:"spinnerfield",
								fieldLabel:"Assumed recovery time",
								name:"recoveryTime",
								minValue: 1,
						        maxValue: 365,
						        allowDecimals: true,
						        decimalPrecision: 0,
						        incrementValue: 1,
						        alternateIncrementValue: 5,
						        accelerate: true
						     }
						 ]
					},{
					    xtype:"fieldset",
					    title:"Petroleum Industry",
					    autoHeight:true,
					    labelWidth: 200,
					    layout: 'form',
					    items:[
					         {
						    	xtype:"spinnerfield",
						    	fieldLabel:"Initial production inoperability",
						    	name:"recoveryTime",
						    	minValue: 1,
						    	maxValue: 365,
						    	allowDecimals: true,
						    	decimalPrecision: 0,
						    	incrementValue: 1,
						    	alternateIncrementValue: 5,
						    	accelerate: true
						    },{
						        xtype:"spinnerfield",
								fieldLabel:"Assumed recovery time",
								name:"recoveryTime",
								minValue: 1,
						        maxValue: 365,
						        allowDecimals: true,
						        decimalPrecision: 0,
						        incrementValue: 1,
						        alternateIncrementValue: 5,
						        accelerate: true
						     }
						 ]
					},{
					    xtype:"fieldset",
					    title:"Chemical Products",
					    autoHeight:true,
					    labelWidth: 200,
					    items:[{
				            	xtype:"spinnerfield",
								fieldLabel:"Initial production inoperability",
								name:"recoveryTime",
								minValue: 1,
				            	maxValue: 365,
				            	allowDecimals: true,
				            	decimalPrecision: 0,
				            	incrementValue: 1,
				            	alternateIncrementValue: 5,
				            	accelerate: true
				          },{
				            
				            	xtype:"spinnerfield",
								fieldLabel:"Assumed recovery time",
								name:"recoveryTime",
								minValue: 1,
				            	maxValue: 365,
				            	allowDecimals: true,
				            	decimalPrecision: 0,
				            	incrementValue: 1,
				            	alternateIncrementValue: 5,
				            	accelerate: true
				           
				          }]
					 },{
						 xtype:"fieldset",
						 title:"Electrical and Optical Equipment",
						 autoHeight:true,
						 labelWidth: 200,
						 items:[{
				            	xtype:"spinnerfield",
								fieldLabel:"Initial production inoperability",
								name:"recoveryTime",
								minValue: 1,
				            	maxValue: 365,
				            	allowDecimals: true,
				            	decimalPrecision: 0,
				            	incrementValue: 1,
				            	alternateIncrementValue: 5,
				            	accelerate: true
				          },{
				            
				            	xtype:"spinnerfield",
								fieldLabel:"Assumed recovery time",
								name:"recoveryTime",
								minValue: 1,
				            	maxValue: 365,
				            	allowDecimals: true,
				            	decimalPrecision: 0,
				            	incrementValue: 1,
				            	alternateIncrementValue: 5,
				            	accelerate: true
				           
				          }]
					},{
					    xtype:"fieldset",
					    title:"Electricity, Gas and Water Supply",
					    autoHeight:true,
					    labelWidth: 200,
					    items:[{
				           	xtype:"spinnerfield",
							fieldLabel:"Initial production inoperability",
							name:"recoveryTime",
							minValue: 1,
				           	maxValue: 365,
				           	allowDecimals: true,
				           	decimalPrecision: 0,
				           	incrementValue: 1,
				           	alternateIncrementValue: 5,
				           	accelerate: true
				         },{
				           	xtype:"spinnerfield",
							fieldLabel:"Assumed recovery time",
							name:"recoveryTime",
							minValue: 1,
				           	maxValue: 365,
				           	allowDecimals: true,
				           	decimalPrecision: 0,
				           	incrementValue: 1,
				           	alternateIncrementValue: 5,
				           	accelerate: true
				          }]
				},{
				    xtype:"fieldset",
				    title:"Inland Transport",
				    autoHeight:true,
				    labelWidth: 200,
				    items:[{
				       	xtype:"spinnerfield",
						fieldLabel:"Initial production inoperability",
						name:"recoveryTime",
						minValue: 1,
				       	maxValue: 365,
				       	allowDecimals: true,
				       	decimalPrecision: 0,
				       	incrementValue: 1,
				       	alternateIncrementValue: 5,
				       	accelerate: true
				       },{
				       	xtype:"spinnerfield",
						fieldLabel:"Assumed recovery time",
					    name:"recoveryTime",
						minValue: 1,
				        maxValue: 365,
				        allowDecimals: true,
				        decimalPrecision: 0,
				        incrementValue: 1,
				        alternateIncrementValue: 5,
				        accelerate: true
				     }]
				},{
				    xtype:"fieldset",
				    title:"Water Transport",
				    autoHeight:true,
				    labelWidth: 200,
				    items:[{
				       	xtype:"spinnerfield",
						fieldLabel:"Initial production inoperability",
						name:"recoveryTime",
						minValue: 1,
				       	maxValue: 365,
				       	allowDecimals: true,
				       	decimalPrecision: 0,
				       	incrementValue: 1,
				       	alternateIncrementValue: 5,
				       	accelerate: true
				       },{
				       	xtype:"spinnerfield",
						fieldLabel:"Assumed recovery time",
					    name:"recoveryTime",
						minValue: 1,
				        maxValue: 365,
				        allowDecimals: true,
				        decimalPrecision: 0,
				        incrementValue: 1,
				        alternateIncrementValue: 5,
				        accelerate: true
				     }]
				},{
				    xtype:"fieldset",
				    title:"Air Transport",
				    autoHeight:true,
				    labelWidth: 200,
				    items:[{
				       	xtype:"spinnerfield",
						fieldLabel:"Initial production inoperability",
						name:"recoveryTime",
						minValue: 1,
				       	maxValue: 365,
				       	allowDecimals: true,
				       	decimalPrecision: 0,
				       	incrementValue: 1,
				       	alternateIncrementValue: 5,
				       	accelerate: true
				       },{
				       	xtype:"spinnerfield",
						fieldLabel:"Assumed recovery time",
					    name:"recoveryTime",
						minValue: 1,
				        maxValue: 365,
				        allowDecimals: true,
				        decimalPrecision: 0,
				        incrementValue: 1,
				        alternateIncrementValue: 5,
				        accelerate: true
				     }]
				},{
				    xtype:"fieldset",
				    title:"Post and Telecommunications",
				    autoHeight:true,
				    labelWidth: 200,
				    items:[{
				       	xtype:"spinnerfield",
						fieldLabel:"Initial production inoperability",
						name:"recoveryTime",
						minValue: 1,
				       	maxValue: 365,
				       	allowDecimals: true,
				       	decimalPrecision: 0,
				       	incrementValue: 1,
				       	alternateIncrementValue: 5,
				       	accelerate: true
				       },{
				       	xtype:"spinnerfield",
						fieldLabel:"Assumed recovery time",
					    name:"recoveryTime",
						minValue: 1,
				        maxValue: 365,
				        allowDecimals: true,
				        decimalPrecision: 0,
				        incrementValue: 1,
				        alternateIncrementValue: 5,
				        accelerate: true
				     }]
				},{
				    xtype:"fieldset",
				    title:"Financial Intermediation",
				    autoHeight:true,
				    labelWidth: 200,
				    items:[{
				       	xtype:"spinnerfield",
						fieldLabel:"Initial production inoperability",
						name:"recoveryTime",
						minValue: 1,
				       	maxValue: 365,
				       	allowDecimals: true,
				       	decimalPrecision: 0,
				       	incrementValue: 1,
				       	alternateIncrementValue: 5,
				       	accelerate: true
				       },{
				       	xtype:"spinnerfield",
						fieldLabel:"Assumed recovery time",
					    name:"recoveryTime",
						minValue: 1,
				        maxValue: 365,
				        allowDecimals: true,
				        decimalPrecision: 0,
				        incrementValue: 1,
				        alternateIncrementValue: 5,
				        accelerate: true
				     }]
				},{
				    xtype:"fieldset",
				    title:"Health and Social Work",
				    autoHeight:true,
				    labelWidth: 200,
				    items:[{
				       	xtype:"spinnerfield",
						fieldLabel:"Initial production inoperability",
						name:"recoveryTime",
						minValue: 1,
				       	maxValue: 365,
				       	allowDecimals: true,
				       	decimalPrecision: 0,
				       	incrementValue: 1,
				       	alternateIncrementValue: 5,
				       	accelerate: true
				       },{
				       	xtype:"spinnerfield",
						fieldLabel:"Assumed recovery time",
					    name:"recoveryTime",
						minValue: 1,
				        maxValue: 365,
				        allowDecimals: true,
				        decimalPrecision: 0,
				        incrementValue: 1,
				        alternateIncrementValue: 5,
				        accelerate: true
				     }]
				},{
				    xtype:"fieldset",
				    title:"Compensation of employees (workforce)",
				    autoHeight:true,
				    labelWidth: 200,
				    items:[{
				       	xtype:"spinnerfield",
						fieldLabel:"Initial production inoperability",
						name:"recoveryTime",
						minValue: 1,
				       	maxValue: 365,
				       	allowDecimals: true,
				       	decimalPrecision: 0,
				       	incrementValue: 1,
				       	alternateIncrementValue: 5,
				       	accelerate: true
				       },{
				       	xtype:"spinnerfield",
						fieldLabel:"Assumed recovery time",
					    name:"recoveryTime",
						minValue: 1,
				        maxValue: 365,
				        allowDecimals: true,
				        decimalPrecision: 0,
				        incrementValue: 1,
				        alternateIncrementValue: 5,
				        accelerate: true
				     }]
				}]
			}]
		},{
		  	xtype:"form",
		   	id:"pannelloForm",
		   	autoWidth: true,
			autoHeight: true,
		    title:"Cascading Dysfunctioning Sectors",
			layout:'column',
			items:[{
			       columnWidth: 0.6,
			       layout: 'fit',
			       items: {
			         xtype: 'grid',
			         id: 'gridSettori',
			         height: 310,
			         stripeRows	: true, 
			         columnLines: true,
			         loadMask	: true,	
			         ds: storeP0,
			         cm: colModel,
			         sm: new Ext.grid.RowSelectionModel({
			        	 singleSelect: true,
			        	 listeners: {
			        		rowselect: function(sm, row, rec) {     	
			        			 Ext.getCmp("pannelloForm").getForm().loadRecord(rec);
				          	}			         		
			        	 }
			        }),
			        autoExpandColumn: 'company',
			        //title:'List of Sectors',
			        border: false,
			        listeners: {
					     viewready: function(g) {
					          g.getSelectionModel().selectRow(0);
					       } // Allow rows to be rendered.
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


}
