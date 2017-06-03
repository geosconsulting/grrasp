function cancellaLayer(map,layerNome) {	
			
	var numLayers = map.layers.length;
	var stringaRicerca = layerNome.toString();
	var illo = map.getLayersByName(stringaRicerca);
		
	Ext.Msg.show({
		title:'Save Changes?',
		msg: "Your are removing <b>" + illo[0].name + "</b> from current map. Continue?",					
		buttons: Ext.MessageBox.YESNO,		
		fn: function(btn,text){
			if (btn == 'yes'){
				map.removeLayer(illo[0]);						
			}else{
				Ext.Msg.alert('Status', 'Removing <b>' + illo[0].name + "</b> cancelled");
			}
		}
	});
	
}	
