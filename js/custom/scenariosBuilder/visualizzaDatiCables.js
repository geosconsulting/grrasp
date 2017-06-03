var gridWindowCablesSelezionati;
var modelloStore;
var id,snode,enode;

function riempiGriglia(storeModel){		
	
recordSingolo = Ext.data.Record.create([
        {name: id, 		type: "string"},
        {name: snode, 	type: "string"},
        {name: enode, 	type: "string"}                               
]);	
	
for(var i=0 ; i  < max ; i++){ 
	recordsDelloStore = new recordSingolo({
			id: 	layerAttivo[0].selectedFeatures[i].data[id],
			snode:  layerAttivo[0].selectedFeatures[i].data[snode],
			enode:  layerAttivo[0].selectedFeatures[i].data[enode]
	});
	
modelloStore.add(recordsDelloStore);
modelloStore.commitChanges();	
}	
}

function creaGriglia(){

modelloStoreCables = new Ext.data.JsonStore({
    	id:'storeRecordSelezionati',
    	totalProperty:'totalcount',
		root:'root',					  
    	fields:[
    	   'id',
    	   'length'
    	]
});
					
modelloColonneCables = new Ext.grid.ColumnModel([
					{header:'ID',			width: 80, sortable:true },
					{header:'Length Node',	width: 80, sortable:true }	            	
]);


modelloSelezione = new GeoExt.grid.FeatureSelectionModel({
		singleSelect: true,
		autoLoad: true,
		listeners: {
			rowselect: {
				fn: function(sm,index,record) {																
					numRecordSel = layerAttivo[0].selectedFeatures.length;	
					console.log(record.data.id);
				}
			}
		}
});

gridFeatureSelezionati = new Ext.grid.GridPanel({
	    //title	: 'Selected Data',
	    autoScroll: true,
	    autoHeight : true,
	    width : 250,
	    stripeRows: true, 
	    loadMask: true,    
	    store      : modelloStore,
	    colModel   : modelloColonne,                                       
	    selModel   : modelloSelezione,
	    bbar: []
});

    
gridWindowSelezionati = new Ext.Window({
	layout: "fit",	
	modal:true,
	title: "Selected Elements",	
	closeAction: 'close',			
	autoWidth: true,
	height: 250,
	id:'gridSelWin',
	x: 400,
	y: 120,
	items : [{		
		xtype : "panel",
		bodyStyle: 'padding: 2px;',
		autoWidth: true,
		autoScroll: true,
		layout:'form',		
		items : [
		   gridFeatureSelezionati
		]
	}]
});	 
	
}