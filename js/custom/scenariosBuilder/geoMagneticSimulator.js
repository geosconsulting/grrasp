var geoMagneticTuningPanel,geoMagneticWin;	
var decodedString;

function createGeomagneticSimulatorWindow(){	
	
	// the DefaultColumnModel expects this blob to define columns. It can be extended to provide custom or reusable ColumnModels
	colModel = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
	    {id:'paese',header: "Country", width: 160, sortable: true, locked:false, dataIndex: 'paese'},    
	    {header: "iso", width: 55, sortable: true, dataIndex: 'iso'}
	    ]);
	URLPaesi = "php/DB/selectCountries.php";

	countryStore = new Ext.data.JsonStore({
	    id:'settoriStore',
	    url: URLPaesi,
	    root: '',
	    fields: ['nuts_id','country', 'iso']
	});
	countryStore.load();  
	
	var ilPrescelto = '';
	
	comboPaesi = new Ext.form.ComboBox({
		    id:'paeseScelto',
		    labelWidth: 100,		
			fieldLabel: 'Country',
			//tooltip : 'xxx',
			typeAhead: true,		
	        triggerAction: 'all',       
	        forceSelection:true,
			store: countryStore,
			displayField:'country',
			valueField:'iso',
			triggerAction:'all',
			width:190,
			listeners: {
			    select: function(combo, record, index) {
			    	ilPrescelto = record.data.country;
			    	Ext.Ajax.request({
						method : 'POST',
						dataType : 'json',
						url : 'php/DB/selezionaNodiSegmentiPerPaese.php',
						params : {
							paese : ilPrescelto							
						},
						success : function(response) {
							codedString = response.responseText;
							decodedString = Ext.decode(response.responseText); 
							illo = Ext.getCmp('geomagneticWin');
							illo.setTitle("Geomagnetical Field - " + decodedString.length + " selected");		
						},
						failure : function(response) {								
							Ext.Msg.alert("Info","The server returned the following message <b>'" + response.statusText + "</b>");
						},
						callback : function(response) {
							//Ext.Msg.alert("Info", "Files created");
						}
					});		
			    }
			  }
	});
	
	sezionePerVerificarePaese = {
		    xtype:'compositefield',
		    layout:'hbox',
		    items:[comboPaesi,
		        {
		        xtype:'button',
		        text: 'View Selected',
		        handler: function(){
		        	//Ext.Msg.alert("Info", decodedString);
		        	//for ( var elemento in decodedString-1) {
		        	//console.log(_.values(decodedString[elemento]));
					//}
		        	console.log(_.isArray(decodedString));
		        	console.log(decodedString[2].id);
		        }
		    }]
		};
	
	var tipiCavi = new Ext.data.ArrayStore({
		fields: ['line_res', 'kv'],
		data : 	[
		       	['0.008','[Ohm/km]for 400 kV lines'],
				['0.022','[Ohm/km]for 220 kV lines (Finland)'],
				['0.015','[Ohm/km]for 300-330 kV lines (Baltic countires and Norway)'],
				['0.018','[Ohm/km]for 275 kV lines (UK)']
				]
	});

	geoMagneticTuningPanel = new Ext.form.FormPanel({
     width : 420,
     height: 420,             
	 bodyStyle  : 'padding: 2px;',     
     buttonAlign: 'center',  
     stateful: true,
     labelWidth: 100,
     defaults: {},
     items: [
      sezionePerVerificarePaese	
	  ,{
	    xtype:"combo",
	    fieldLabel:"Line Resistances",
	    name:"cmbTipiHazard",
	  	typeAhead: true,		
	   	triggerAction: 'all',       
	   	forceSelection:true,
	   	mode: 'local',
		store: tipiCavi,
		displayField:'kv',
		valueField:'line_res',
		width: 270,
		triggerAction:'all'	
	  },{
	    xtype:"textfield",
	    fieldLabel:"Earth Resistance",
	    name:"textvalue",
	    value:"0.50"
	  },{
	    xtype:"textfield",
	    fieldLabel:"Magnetic Field",
	    name:"textvalue"
	  },{
	   	xtype : 'sliderfield',
	    fieldLabel: 'Pylon Height',
	    value: 15,
	    minValue: 15,
	    maxValue: 55,
	    increment: 5,
	    width: 275,
	    id: 'sliderPylonHeight',
	    listeners :{
	        drag: function(select,thumb,newval,oldval){
	        	
	         }
	     }
	   },{
	    xtype:"textfield",
	    fieldLabel:"Ground Depth",
	    name:"textvalue"
	  }]
});

   
geoMagneticWin = new Ext.Window({
		id: 'geomagneticWin',
		name: 'geomagneticWin',
		title: "Geomagnetical Field",
		closeAction: "close",			
		width: 400,
		height: 250,
		x: 500,
		y: 110,	
		items : [geoMagneticTuningPanel],
        fbar: {
            xtype: 'toolbar',
            items: [{
                text: 'Apply',                
                handler: function(){  
                 	
                }
            },
            {
                text: 'Close',                
                handler: function(){
                 	Ext.getCmp("geomagneticWin").destroy();		
                }
            }
            ]
        }
	});	
}	
	