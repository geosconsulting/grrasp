var infoNodeInterdependency;
var infoNodePopUPWindow;

function infoNodeInterdependencyWMS(map){	
	
infoNodeInterdependency = new OpenLayers.Control.WMSGetFeatureInfo({
        url: '/geoserver/wms', 
        hover: false,      
        queryVisible: true,
        //infoFormat: "text/plain",
        //infoFormat: "text/html",
        infoFormat: 'application/vnd.ogc.gml',
        queryVisible: true,
        eventListeners: {
            "getfeatureinfo": function(event) {                	
            	posizionePopup = event.xy;                  
            	posizioneGeografica = map.getLonLatFromPixel(event.xy).transform(P_900913, P_4326); 
            	posizioneGeograficaText = "Latitude: " + posizioneGeografica.lat.toFixed(2) + " Longitude: " + posizioneGeografica.lon.toFixed(2);
            	risposta = (event.features[0].attributes.gid).replace(" ","");                	                	
            	console.log(risposta);
            	addNodePopup(risposta);        
                }
            }
});
map.addControl(infoNodeInterdependency);
}

function addNodePopup(risposta){

	if(!infoNodePopUPWindow){
		checckoSePopupNodeAperto(risposta);
	}
	else{
		infoNodePopUPWindow.destroy();
		checckoSePopupNodeAperto(risposta);
	}
}

function checckoSePopupNodeAperto(risposta){
	
	infoNodePopUPWindow =	new GeoExt.Popup({
	    title: "Node Selected: <font color=\"red\">" + risposta + "</font>" ,
	    autoScroll: true,
	    width: 200,
	    height: 105,
        maximizable: true,
        collapsible: true,
	    map: mapPanel.map,
	    anchored: true,
        listeners: {
            close: function() {
            	infoNodePopUPWindow = null;
            }
        },
        location:posizionePopup
	});


	//add some content to the popup (this can be any Ext component)
	infoNodePopUPWindow.add(
		{
		xtype:"panel",
		//title: "Description",
		autoWidth: true,
		autoHeight: true,
		labelWidth: 90,
		layout:'form',
		items:[{
			 xtype:"numberfield",
			 fieldLabel:"Node Selected",
			 id:"nodeStartingSystemFailure",
			 width: 50,
			 value: risposta
			}],
		bbar:[{
		text: 'Start Matlab Model',
		iconCls:'calcolaIOM',
		tooltip: "Start calculations",			
		handler: function(){			
			progressWin();
			Ext.Ajax.request({
				method : 'POST',
				dataType : 'json',
				url : 'php/matlabCalls/callMatlabMSystemConstruction.php',
				params : {
					nodoSelezionato : risposta							
				},
				success : function(response) {
					Ext.Msg.alert("Info", "Modeling successfully started...");
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
	infoNodePopUPWindow.doLayout();
	infoNodePopUPWindow.show();

}
