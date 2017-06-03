var btnEditaAttributi,btnTerminaEditing,layerEditabiliStore,comboLayerEditabili;

function creaComponentiEditing(){	
	
layerEditabiliStore = new Ext.data.ArrayStore({
		fields: ['type_id', 'id'],
		data : 	[['no','Nodes'],
				['li','Links'],
				]
});

comboLayerEditabili = new Ext.form.ComboBox({
	    id:'tipoLayerDaEditare',
	    labelWidth: 30,		
		fieldLabel: 'Data',
		tooltip : 'Selected the of node you want to be displayed',
		typeAhead: true,		
        triggerAction: 'all',       
        forceSelection:true,        
		mode: 'local',
		//value: 'no',
		emptyText: 'Select a dataset...', 
		store: layerEditabiliStore,
		displayField:'id',
		valueField:'type_id',
		width: 200,
		triggerAction:'all'		    
});	


btnLayerDaEditare = new Ext.Button({
	id: 	'btnCaricaLayerPerEditing',
	name: 	'btnCaricaLayerPerEditing',
    text: 	'Select Node/Links to Edit',    
    enableToggle: false,
    buttonAlign:'center',
    //toggleGroup: "edit/view",
    handler: function () {
    		var editareNodiOLinee = Ext.getCmp('tipoLayerDaEditare').value;    		
	    	if (editareNodiOLinee == 'no') {
	    		map.addLayer(wfs_layer_point);
	    		wfs_layer_point.setVisibility(true);
	    		applicaLegendaRulesNodiWFS();
	    		winAttributesNodesEditing.show();
			} 
	    	else if (editareNodiOLinee == 'li') {	
	    		map.addLayer(wfs_layer_point);
	    		wfs_layer_point.setVisibility(false);
	    		map.addLayer(wfs_layer_lines);
	    		wfs_layer_lines.setVisibility(true);
	    		winAttributesLinksEditing.show();
			}
	    	else {
	    		Ext.Msg.alert('Status', 'You must select a layer to edit');
				Ext.get('tipoLayerDaEditare').frame('ff0000', 3);
			}
					
    }   
}); 


}

