var infopopup;

function infoPopup(map){	

	infopopup = new OpenLayers.Control.WMSGetFeatureInfo({
	            url: '/geoserver/wms', 
	            hover: false,
	            maxFeatures: 3,
	            autoActivate: true,
	            queryVisible: true,
	            //infoFormat: "text/plain",
	            //infoFormat: "text/html",
	            infoFormat: 'application/vnd.ogc.gml',          
	            eventListeners: {

	                "getfeatureinfo": function(e) {
	                    var items = [];
	                    Ext.each(e.features, function(feature) {
	                        items.push({
	                            xtype: "propertygrid",
	                            title: feature.fid,
	                            source: feature.attributes
	                        });
	                    });
	                    new GeoExt.Popup({
	                        title: "Feature Info",
	                        width: 250,
	                        height: 250,
	                        layout: "accordion",
	                        map: mapPanel,
	                        location: e.xy,
	                        items: items
	                    }).show();
	                }	            	
	            }
	});
	map.addControl(infopopup);    

}
