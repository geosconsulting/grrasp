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

valoriStarting 			= startingSectorsStore();
colModelStarting		= valoriStarting.colModel;
storeStarting			= valoriStarting.store;
	
valoriDisfunzioni 		= storeDisfunzioni(); 
colModelDysfunctioning 	= valoriDisfunzioni.colModel;
storeDysfunctioning 	= valoriDisfunzioni.store;

valoriRecovery    		= storeTempiDiRipresa();
colModelRecovery 		= valoriRecovery.colModel;
storeRecovery 			= valoriRecovery.store;

if(!infoPopUPWindow){
	checckoSePopupAperto(colModelDysfunctioning,storeDysfunctioning,colModelRecovery,storeRecovery,colModelStarting,storeStarting);
}
else{
	infoPopUPWindow.destroy();
	checckoSePopupAperto(colModelDysfunctioning,storeDysfunctioning,colModelRecovery,storeRecovery,colModelStarting,storeStarting);
}
}

function checckoSePopupAperto(colModelDysfunctioning,storeDysfunctioning,colModelRecovery,storeRecovery,colModelStarting,storeStarting){	
	
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
					items:[{
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
					xtype:"form",
					id:"pannelloRecovery",
					title:"Recovery Times per Sectors",
					autoWidth: true,
					autoHeight: true,
					items:[{
				         xtype: 'editorgrid',
				         id: 'gridSettoriRecovery',
				         height: 310,
				         stripeRows	: true, 
				         columnLines: true,
				         loadMask	: true,
				         clicksToEdit: 1,
				         ds: storeRecovery,
				         cm: colModelRecovery,
				         sm: new Ext.grid.RowSelectionModel({
				        	 singleSelect: true,
				        	 listeners: {
				        		rowselect: function(sm, row, rec) {     	
				        			
					          	}			         		
				        	 }
				        }),
				        autoExpandColumn: 'settoreRecovery',				        
				        border: false,
				        listeners: {
						     viewready: function(gR) {
						    	
						       } //Allow rows to be rendered.
						}					
				      }]
				},{
					xtype:"form",
					id:"pannelloCascading",
					autoWidth: true,
					autoHeight: true,
					title:"Cascading Dysfunctioning Sectors",
					items:[{
						xtype: 'editorgrid',
						id: 'gridDysfunctioning',
						height: 310,
						stripeRows	: true, 
						columnLines: true,
						loadMask	: true,	
						clicksToEdit: 1,
						ds: storeDysfunctioning,
						cm: colModelDysfunctioning,
						sm: new Ext.grid.RowSelectionModel({
			        	 singleSelect: true,
			        	 listeners: {
			        		rowselect: function(sm, row, rec) {
				          	}			         		
			        	 }
			        }),
			        autoExpandColumn: 'settore',			       
			        border: false,
			        listeners: {
					     viewready: function(gD) {
					         
					       } //Allow rows to be rendered.
					}					
			      }]
				}]
	}],
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
				
			var valTab1 = new Array();
			valTab1[0] = new Array();
			valTab1[1] = new Array();
			
			//var illo = Ext.getCmp('pannelloTabelle').getActiveTab();
						
			for ( var int = 0; int < storeStarting.modified.length; int++) {
				valTab1[0].push(storeStarting.modified[int].data.settoreID);
				valTab1[1].push(storeStarting.modified[int].data.sino);
			}		
			
			//progressWin();
			Ext.Ajax.request({
				method : 'POST',
				dataType : 'json',
				url : 'php/DB/DBIOM.php',
				params : {
					paese 		: risposta.toLowerCase(),
					valoriUpdate: Ext.encode(valTab1)
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
	        ['c1','Agriculture, Hunting, Forestry and Fishing',false],
			['c2','Mining and Quarrying',false],
			['c3','Food, Beverages and Tobacco',false],
			['c4','Textiles and Textile Products',false],
			['c5','Leather, Leather and Footwear',false],
			['c6','Wood and Products of Wood and Cork',false],
			['c7','Pulp, Paper, Paper , Printing and Publishing',false],
			['c8','Coke, Refined Petroleum and Nuclear Fuel',false],
			['c9','Chemicals and Chemical Products',false],
			['c10','Rubber and Plastics',false],
			['c11','Other Non-Metallic Mineral',false],
			['c12','Basic Metals and Fabricated Metal',false],
			['c13','Machinery, Nec',false],
			['c14','Electrical and Optical Equipment',false],
			['c15','Transport Equipment',false],
			['c16','Manufacturing, Nec; Recycling',false],
			['c17','Electricity, Gas and Water Supply',false],
			['c18','Construction',false],
			['c19','Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',false],
			['c20','Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',false],
			['c21','Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',false],
			['c22','Hotels and Restaurants',false],
			['c23','Inland Transport',false],
			['c24','Water Transport',false],
			['c25','Air Transport',false],
			['c26','Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',false],
			['c27','Post and Telecommunications',false],
			['c28','Financial Intermediation',false],
			['c29','Real Estate Activities',false],
			['c30','Renting of M&Eq and Other Business Activities',false],
			['c31','Public Admin and Defence; Compulsory Social Security',false],
			['c32','Education',false],
			['c33','Health and Social Work',false],
			['c34','Other Community, Social and Personal Services',false],
			['c35','Private Households with Employed Persons',false]
	];

	var storeStarting = new Ext.data.Store({
	     reader: new Ext.data.ArrayReader({}, [
	         {name: 'settoreID'},
	         {name: 'settoreStarting'},
	         {name: 'sino', type: 'bool'}
	        ])
	    });
	storeStarting.loadData(startingData);		
	
	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	var colModelStarting = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		{id:'settoreID',header: "Industrial Sector ID",setHidden:true,dataIndex:'settoreID'},
	    {id:'settoreStarting',header: "Industrial Sector", width: 40, sortable: true, locked:false, dataIndex: 'settoreStarting'},
	    {header: "Start", width: 80, sortable: true, dataIndex: 'sino',xtype: 'checkcolumn'}
	    ]);
	colModelStarting.setHidden(1,true);
	
	var valoriFunzioneStartingSettori			= new Array();	
	valoriFunzioneStartingSettori['store']		= storeStarting;
	valoriFunzioneStartingSettori['colModel']	= colModelStarting;
	
	return valoriFunzioneStartingSettori;	

}

function storeTempiDiRipresa(){
	
	 // shorthand alias
    var fmRecovery = Ext.form;
	
    //Define the Grid data and create the Grid
	var ripresaData = [
	        ['c1','Agriculture, Hunting, Forestry and Fishing',0,0],
			['c2','Mining and Quarrying',0,0],
			['c3','Food, Beverages and Tobacco',0,0],
			['c4','Textiles and Textile Products',0,0],
			['c5','Leather, Leather and Footwear',0,0],
			['c6','Wood and Products of Wood and Cork',0,0],
			['c7','Pulp, Paper, Paper , Printing and Publishing',0,0],
			['c8','Coke, Refined Petroleum and Nuclear Fuel',0,0],
			['c9','Chemicals and Chemical Products',0,0],
			['c10','Rubber and Plastics',0,0],
			['c11','Other Non-Metallic Mineral',0,0],
			['c12','Basic Metals and Fabricated Metal',0,0],
			['c13','Machinery, Nec',0,0],
			['c14','Electrical and Optical Equipment',0,0],
			['c15','Transport Equipment',0,0],
			['c16','Manufacturing, Nec; Recycling',0,0],
			['c17','Electricity, Gas and Water Supply',0,0],
			['c18','Construction',0,0],
			['c19','Sale, Maintenance and Repair of Motor Vehicles and Motorcycles; Retail Sale of Fuel',0,0],
			['c20','Wholesale Trade and Commission Trade, Except of Motor Vehicles and Motorcycles',0,0],
			['c21','Retail Trade, Except of Motor Vehicles and Motorcycles; Repair of Household Goods',0,0],
			['c22','Hotels and Restaurants',0,0],
			['c23','Inland Transport',0,0],
			['c24','Water Transport',0,0],
			['c25','Air Transport',0,0],
			['c26','Other Supporting and Auxiliary Transport Activities; Activities of Travel Agencies',0,0],
			['c27','Post and Telecommunications',0,0],
			['c28','Financial Intermediation',0,0],
			['c28','Real Estate Activities',0,0],
			['c30','Renting of M&Eq and Other Business Activities',0,0],
			['c31','Public Admin and Defence; Compulsory Social Security',0,0],
			['c32','Education',0,0],
			['c33','Health and Social Work',0,0],
			['c34','Other Community, Social and Personal Services',0,0],
			['c35','Private Households with Employed Persons',0,0]
	];

	var storeRipresa = new Ext.data.Store({
	     reader: new Ext.data.ArrayReader({}, [
	         {name: 'settoreID'},
	         {name: 'settoreRecovery'},
	         {name: 'iniprodino', type: 'int'},
	         {name: 'assrectime', type: 'int'}
	        ])
	    });
	storeRipresa.loadData(ripresaData);	

	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	var colModelRipresa = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		{   
			id:'settoreID',
			header: "Industrial Sector ID",
			dataIndex:'settoreID'
		}, {	
			id:'settoreRecovery',
			header: "Industrial Sector", 
			width: 120, 
			sortable: true, 
			locked:true, 
			dataIndex: 'settoreRecovery'
		},{
			header: "Inoperability", 
			width: 80, 
			sortable: true, 
			dataIndex: 'iniprodino',
	    	editor: new fmRecovery.NumberField({
                allowBlank: false,
                allowNegative: false,
                maxValue: 365
            })
		},{	
			header: "Recovery", 
            width: 80, 
            sortable: true, 
            dataIndex: 'assrectime',
	    	editor: new fmRecovery.NumberField({
                allowBlank: false,
                allowNegative: false,
                maxValue: 365
            })
        }
	    ]);
	colModelRipresa.setHidden(1,true);

	var valoriFunzioneRicovery			= new Array();	
	valoriFunzioneRicovery['store']		= storeRipresa;
	valoriFunzioneRicovery['colModel']	= colModelRipresa;
	
	return valoriFunzioneRicovery;	

}

function storeDisfunzioni(){
	
	 // shorthand alias
    var fmDisfunzioni = Ext.form;
	
    //Define the Grid data and create the Grid
	var disfunzioniData = [
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

	var storeDisfunzioni = new Ext.data.Store({
	     reader: new Ext.data.ArrayReader({}, [
	         {name: 'settoreID'},
	         {name: 'settore'},
	         {name: 'percentuale', type: 'int'}        
	        ])
	    });
	storeDisfunzioni.loadData(disfunzioniData);	

	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	var colModelDisfunzioni = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		{   id:'settoreID',
			header: "Industrial Sector ID",
			dataIndex:'settoreID'			
		},{	id:'settore',
			header: "Industrial Sector", 
			width: 120, 
			sortable: true, 
			locked:false, 
			dataIndex: 'settore'
		},{
			header: "Dysfunction %", 
	    	width: 85, sortable: true, 
	    	dataIndex: 'percentuale',
	    	renderer :  function(val) {
	             return val+"%";
	        },
	    	editor: new fmDisfunzioni.NumberField({
                allowBlank: false,
                allowNegative: false,
                maxValue: 365
            })
		}
	]);
	colModelDisfunzioni.setHidden(1,true);

	var valoriFunzioneDisfunzioni			= new Array();	
	valoriFunzioneDisfunzioni['store']		= storeDisfunzioni;
	valoriFunzioneDisfunzioni['colModel']	= colModelDisfunzioni;
	
	return valoriFunzioneDisfunzioni;	

}