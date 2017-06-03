var riskTuning,riskValues;	

function createRiskSimulatorWindow(){

	riskTuning = new Ext.form.FormPanel({
     width : 235,
     height: 120,             
	 bodyStyle  : 'padding: 2px;',     
     buttonAlign: 'center',  
     stateful: true,
     defaults: {      
       tipText: function(thumb){
           return String(thumb.value) + ' Million Euros';
        } 
      },
      items: [
      {
	    xtype : 'sliderfield',
	   	fieldLabel: 'Lower  Impact',
	   	value: 7,
	    minValue: 7,
	    maxValue: 15,
	    increment: 1,
	    id: 'sliderValMin',
	    listeners :{
	        drag: function(select,thumb,newval,oldval){
	        	console.log(thumb.value);
	         }
	     }
       },
       {
    	   xtype : 'sliderfield',
           fieldLabel: 'Maximum Impact',
           value: 15,
           minValue: 15,
           maxValue: 19,
           increment: 1,
           id: 'sliderValMax'
        },
        {
            xtype:"numberfield",            
            fieldLabel:"Million Euros",
            id:"textValMinimo",
            anchor:'96%'
        },{
            xtype:"numberfield",           
            fieldLabel:"Million Euros",
            id:"textValMassimo",
            anchor:'96%'
        }]
    });

   
riskWin = new Ext.Window({
		id: 'riskWin',
		name: 'riskWin',
		title: "Impact of Blackout",
		closeAction: "hide",			
		width: 250,
		height: 180,
		x: 500,
		y: 90,	
		items : [riskTuning],
        fbar: {
            xtype: 'toolbar',
            items: [{
                text: 'Apply',                
                handler: function(){  
                 	//Create an OpenLayers.Filter object from a CQL string
 					var cqlFormat = new OpenLayers.Format.CQL();
 					var illoMin = riskTuning.items.items[0].value;
 					var illoMax = riskTuning.items.items[1].value; 					
 					stringaFiltro = ("eco_imp>" + illoMin + " AND eco_imp<" + illoMax);
 					console.log(stringaFiltro);					
 					
 					var filter = cqlFormat.read(stringaFiltro);
 					
                   	ruleEconomicImpact = new OpenLayers.Rule({     
                   	    symbolizer: {
                   	        fillColor	: "#ff0000",
                   	        strokeColor	: "#ffcccc",
                   	        fillOpacity	: "0.5"
                   	    }    
                   	});

                   	regioniImpactStyle = new OpenLayers.StyleMap(
                   			new OpenLayers.Style({}, 
                   	   	    	 {rules: ruleEconomicImpact})
                   	);
 					
 					ruleEconomicImpact.filter = filter;
 					riskTuning.items.items[2].setValue(illoMin);
                   	riskTuning.items.items[3].setValue(illoMax);
                   	
                   	WFSEconomicImpact.styleMap = regioniImpactStyle;
                   	WFSEconomicImpact.redraw(); 
                }
            },
            {
                text: 'Close',                
                handler: function(){  
                	map.removeLayer(WFSEconomicImpact);
                 	Ext.getCmp("riskWin").hide();		
                }
            }
            ]
        }
	});	
}	
	