var infoInterdependency;

function infoInterdependencyWMS(map){	

infoInterdependency = new OpenLayers.Control.WMSGetFeatureInfo({
            url: '/geoserver/wms', 
            hover: false,      
            queryVisible: true,
            //infoFormat: "text/plain",
            //infoFormat: "text/html",
            infoFormat: 'application/vnd.ogc.gml',
            queryVisible: true,
            eventListeners: {
                "getfeatureinfo": function(event) {                	
                	//console.log(event);
                	var illo =Ext.getCmp('textvalueIDExistingNetwork').setValue(event.features[0].attributes.gid);                	
                }
            }
});
map.addControl(infoInterdependency);
}


