var	scenarioWin;

function createScenariosWindow() {	
	
var tipiHazardStore = new Ext.data.ArrayStore({
		fields: ['type_id', 'id'],
		data : 	[
		       	['eq','Earthquake'],
				['fl','Flooding'],
				['ls','Landslide'],
				['vs','Volcano'],
				['tc','Technological']
				]
});


var tipiInfrastruttureStore = new Ext.data.ArrayStore({
		fields: ['type_id', 'id'],
		data : 	[['pg','Power Grid'],
				['hg','Hydro Grid'],
				['tp','Transportation']
				]
});

var tipiReturnPeriodStore = new Ext.data.ArrayStore({
		fields: ['type_id', 'id'],
		data : 	[
				['ve','20 years'],
				['ci','50 years'],
				['ce','100 years'],
				['dc','200 years'],
				['dq','250 years'],
				['cq','500 years']
		]
});

var tipiFragilityCurves = new Ext.data.ArrayStore({
	fields: ['type_id', 'id'],
	data : 	[
			['ty1','Type 1'],
			['ty2','Type 2']
	]
});


var storeGrafico1 = new Ext.data.JsonStore({
    fields:['vulnerability', 'hazard', 'views'],
    data: [
        {vulnerability:0.0, hazard: 0, views: 2},
        {vulnerability:0.1, hazard: 2, views: 1},
        {vulnerability:0.2, hazard: 3, views: 2},
        {vulnerability:0.3, hazard: 4, views: 8},
        {vulnerability:0.4, hazard: 5, views: 3},
        {vulnerability:0.5, hazard: 6, views: 2},
        {vulnerability:0.6, hazard: 8, views: 6},
        {vulnerability:0.7, hazard: 8.5, views: 2},
        {vulnerability:0.8, hazard: 9, views: 8},
        {vulnerability:0.9, hazard: 9.5, views: 9},
        {vulnerability:1.0, hazard: 10, views: 10}
    ]
});

var storeGrafico2 = new Ext.data.JsonStore({
fields:['vulnerability', 'hazard', 'views'],
data: [
{vulnerability:0.0, hazard: 0, views: 2},
{vulnerability:0.1, hazard: 1, views: 1},
{vulnerability:0.2, hazard: 2, views: 2},
{vulnerability:0.3, hazard: 4, views: 8},
{vulnerability:0.4, hazard: 5, views: 3},
{vulnerability:0.5, hazard: 6, views: 2},
{vulnerability:0.6, hazard: 7, views: 6},
{vulnerability:0.7, hazard: 8, views: 2},
{vulnerability:0.8, hazard: 3, views: 8},
{vulnerability:0.9, hazard: 2, views: 9},
{vulnerability:1.0, hazard: 1, views: 10}
]
});

var numFeatureSelected = new Ext.form.NumberField({
    id:"numberFeatSelected",
    flex: 1,
    handler: function(){}
});

var composito = new Ext.form.CompositeField({
    fieldLabel: 'Number of elements selected',
    items: [
        numFeatureSelected,
        {
           xtype: 'button',
           text: 'Fetch Selected',
           handler: function() {
             illo=layerAttivo[0].selectedFeatures.length;
             Ext.getCmp('numberFeatSelected').setValue(illo);
           }
        }
    ]
});

var titolo= "Not Selected";

var fragilityCurveSelected = new Ext.form.ComboBox({
  	fieldLabel:"Fragility Curve",
  	id:"cmbFragilityCurve",
  	typeAhead: true,		
		triggerAction: 'all',       
		forceSelection:true,
		mode: 'local',
	store: tipiFragilityCurves,
	displayField:'id',
	valueField:'type_id',
	width: 150,
	triggerAction:'all',
	listeners: {
		'select' : function(combo,record){			
			if(this.getValue()=='ty1'){
				storeGrafico = storeGrafico1;
				titolo = "Type 1";
			}else{
				storeGrafico = storeGrafico2;
				titolo = "Type 2";
			}			
      }
	}
});

var compositoCurve = new Ext.form.CompositeField({
    fieldLabel: 'Fragility Curve',
    items: [
        fragilityCurveSelected,
        {
           xtype: 'button',
           text: 'Preview Curve',
           handler: function() {        
        	   var grafico = new Ext.Panel({
        		   iconCls:'chart',
        		   title: titolo,
        		   frame:true,
        		   width:500,
        		   height:300,
        		   layout:'fit',
        		   items: {
                    xtype: 'linechart',
                    store: storeGrafico,
                    url: '/grrasp/js/ext-3.3.1/resources/charts.swf',
                    xField: 'vulnerability',
                    yField: 'hazard',
                    yAxis: new Ext.chart.NumericAxis({
                        displayName: 'Hazard Intensity',
                        labelRenderer : Ext.util.Format.numberRenderer('0.0')
                    }),
                    tipRenderer : function(chart, record){
                        return Ext.util.Format.number(record.data.hazard, '0.0') + ' intensity ' + record.data.vulnerability;
                    }
        	     }
        	});
        	    
        	finestraCurva = new Ext.Window({
        	    	id: 'finestraCurva',
        	    	name: 'finestraCurva',	
        	    	layout:"fit",	   
        	    	title: "Fragility Curve",
        	    	closeAction: "close",			
        	    	width: 550,
        	    	height:350,
        	    	x: 400,
        	    	y: 120,	
        	    	items : [grafico]
        	});
        	
        	if(finestraCurva.rendered){
        		//finestraCurva.destroy();
        		//finestraCurva.show();
        	}else{
        	   finestraCurva.show();	
        	}
        	
           }
        }
    ]
});

scenarioWin = new Ext.Window({
	id: 'scenarioWin',
	name: 'scenarioWin',	
	layout:"fit",	   
	title: "Scenario Builder",
	closeAction: "hide",			
	width: 450,
	height: 500,
	x: 400,
	y: 120,	
	items : [{
	layout:"accordion",
	layoutConfig:{
  		activeOnTop:false,
  		animate:true,
  		autoWidth:true,
  		collapseFirst:false,
  		fill:false,
  		hideCollapseTool:false,
  		titleCollapse:true
	},
	items:[{
    title:"Hazard Assessment",
    html:"",
    items:[{
        xtype:"fieldset",
        title:"Select geo-hazard",
        autoHeight:true,
        items:[{
            xtype:"combo",
            fieldLabel:"Hazard Type",
            name:"cmbTipiHazard",
           	typeAhead: true,		
        	triggerAction: 'all',       
        	forceSelection:true,
        	mode: 'local',
			store: tipiHazardStore,
			displayField:'id',
			valueField:'type_id',
			width: 200,
			triggerAction:'all'	
          },{
            xtype:"tbbutton",
            name:"btnSelectRisk",
            text:"Select from Map"
          },{
            xtype:"textfield",
            text:"Selected ",
            name:"txtSelectedRisk"
          }]
      }]
  },{
    title:"Elements at risk",
    html:"",
    items:[{
        xtype:"fieldset",
        title:"Select the infratructure of interest",
        autoHeight:true,
        autowidth: true,
        labelWidth: 180,
        items:[{
            xtype:"combo",
            fieldLabel:"Infrastructure",
            name:"cmbTipiInfrastruttura",
            typeAhead: true,		
        	triggerAction: 'all',       
        	forceSelection:true,
        	mode: 'local',
			store: tipiInfrastruttureStore,
			displayField:'id',
			valueField:'type_id',
			width: 200,
			triggerAction:'all'	
            
          },{
            xtype:"numberfield",
            fieldLabel:"Distance from hazard Km",
            name:"numbervalue"
          }]
      }]
  },{
    title:"Vulnerability Assessment",
    items:[{
        xtype:"fieldset",
        title:"Exposure",
        labelWidth: 170,
        autoHeight:true,
        items:[composito,
               compositoCurve
        ]
      }]
  },{
    title:"Risk Analysis",
    html:"",
    items:[{
        xtype:"fieldset",
        title:"RS = PT * P L * V * A",
        autoHeight:true,
        items:[{
            xtype:"combo",
            fieldLabel:"PT",
            name:"cmbPT",
            typeAhead: true,		
        	triggerAction: 'all',       
        	forceSelection:true,
        	mode: 'local',
			store: tipiReturnPeriodStore,
			displayField:'id',
			valueField:'type_id',
			width: 200,
			triggerAction:'all',
			tooltip : ""
          },{
            xtype:"numberfield",
            fieldLabel:"PL",
            name:"numbervalue"
          },{
            xtype:"textfield",
            fieldLabel:"V",
            name:"textvalue"
          },{
            xtype:"textfield",
            fieldLabel:"A",
            name:"textvalue"
          },{
            xtype:"textarea",
            fieldLabel:"Rationale",
            name:"txaRationale",
            width:300,
            height: 200,
            html : "PT is the temporal (e.g. annual) probability of occurrence of a specific hazard scenario" +
    	 			" {Hs) with a given return period in an area" +
    	 			"\n\r" +
    	 			"PL is the locational or spatial probability of occurrence of a specific hazard scenario with a given " +
    	 			"return period in an area impacting the elements-at-risk." +
    	 			"\n\r" +
    				"V is the physical vulnerability, specified as the degree of damage to a specific element at risk " +
    				"Es given the local intensity caused due to the occurrence of hazard scenario HS " +
    				"\n\r" +    				
    				"A is the quantification of the specific type of element at risk evaluated. It is important to indicate" +
    				" here that the amount can be quantified in different ways, and that the way in which the amount is " +
    				"quantified also the risk is quantified. For instance the amount can be given in numbers, such as the" +
    				" number of buildings (e.g. number of buildings that might suffer damage), number of people " +
    				"(e.g. injuries/ casualties/affected), the number of pipeline breaks per kilometre network, etc. T" +
    				"he elements at risk can also be quantified in economic terms."
          }]
      }]
  }]
}]
	});
};

