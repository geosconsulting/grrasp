var winMapFields;
var storeMappatura;

function creaMappatura(){

arrayCampi = layerAttivo[0].features[0].attributes;
var arrayCampiChiavi = _.keys(arrayCampi);

storeMappatura = new Ext.data.ArrayStore({
    fields: ['fldName']    
});
storeMappatura.loadData(arrayCampiChiavi);

btnPreviewData = new Ext.Button({
	text: 'Preview Selected Data',
	id: 'vediDati',
	enableToggle: false,	
	handler: function () {		
		//gridFeatureSelected.store.clearData();
		id 		= winMapFields.getComponent(0).items.items[0].value;
		snode 	= winMapFields.getComponent(0).items.items[1].value;
		enode 	= winMapFields.getComponent(0).items.items[2].value;
		
		creaGriglia();	
		riempiGriglia(modelloStore);
		gridWindowSelezionati.show();
	}
});

btnInviaMatlab = new Ext.Button({
	text: 'Send Data to Matlab',
	id: 'inviaDati',	
	enableToggle: false,	
	handler: function () {				
		numeroNodi = layerAttivo[0].selectedFeatures.length;
		
			
		Ext.Ajax.request({
			method : 'POST',
			url : 'php/matlabCalls/callMatlabMSystemConstructionNumeroNodi.php',
			params : {
				numeroNodiSimulazione : numeroNodi				
			},
			success : function(response) {			
			Ext.Msg.show({ 
					title : 'Success',
					msg : "System Simulation Staring....",
					buttons : Ext.Msg.OK,
					fn: function(){}
					
				});	
			},
			failure : function(response) {										
				//winAdd.hide();
				Ext.Msg.show({ 
					title : 'Failure',
					msg : response.responseText,
					buttons : Ext.Msg.OK
				});
			},
			callback : function(response) {	}
		});	
		
	}
});

btnEsciMappatura = new Ext.Button({
	text: 'Cancel',
	width:65,
	enableToggle: false,	
	handler: function () {	
		winMapFields.hide();
	}
});

winMapFields = new Ext.Window({
	layout: "form",	
	title: "Map Fields",	
	closeAction: "hide",			
	autoWidth: true,
	height: 145,
	x: 200,
	y: 80,
	items : [{		
		xtype : "panel",
		bodyStyle: 'padding: 2px;',
		autoWidth: true,
		autoScroll: true,
		layout:'form',		
		items : [
			{
			    xtype:"combo",
			    store: arrayCampiChiavi,
			    displayField: 'fldName',
		        valueField: 'fldName',
			    fieldLabel:"Link ID",
			    mode: 'local',
			    triggerAction : 'all'
			  },{
			    xtype:"combo",
			    store: arrayCampiChiavi,
			    displayField: 'fldName',
		        valueField: 'fldName',
			    fieldLabel:"Link ID",
			    mode: 'local',
			    fieldLabel:"Start Node",
			    triggerAction : 'all'
			  },{
			    xtype:"combo",
			    store: arrayCampiChiavi,
			    displayField: 'fldName',
		        valueField: 'fldName',
			    fieldLabel:"Link ID",
			    mode: 'local',
			    name:"enode",
			    triggerAction : 'all'
			  },{		
					xtype : "panel",
					autoWidth: true,
					layout:'hbox',
					layoutConfig: {
		                align:'stretchmax',
		                //padding:'5',
                        //pack:'start',
                        //align:'middle'
		            },
					items : [
			  	         btnPreviewData,
			  	         btnInviaMatlab,
			  	         btnEsciMappatura
			  	    ]},
		]
	}]
});	 

winMapFields.show();
}