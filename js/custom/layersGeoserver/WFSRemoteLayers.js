var usgs;

function addRemoteVectorLayers(map,P_4326,P_900913,P_2077) { 	
	
var earthStyleSelect = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['select']);        
	OpenLayers.Util.extend(
			earthStyleSelect , 
			{strokeWidth: '1', 
			strokeColor: 'red',
			fillColor:'red',
			pointRadius: 3});
	
	var earthStyleUnselect = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['select']);        
	OpenLayers.Util.extend(
			earthStyleUnselect , 
			{strokeWidth: '1', 
			strokeColor: 'green',
			fillColor:'green',
			pointRadius: 3});
	
	var earthStyleMap = new OpenLayers.StyleMap({
		"default": earthStyleSelect,
		"select": earthStyleUnselect});
	
	usgs = new OpenLayers.Layer.Vector("Earthquakes", {
        projection: new OpenLayers.Projection("EPSG:4326"),
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.Script({
            url: "http://jsonpwrapper.com/?urls[]=http://earthquake.usgs.gov/earthquakes/catalogs/7day-M2.5.xml",
            format: new OpenLayers.Format.GeoRSS(),
            parseFeatures: function(data) {
                return this.format.read(data[0]['body']);
            }
        }),               
     	//projection: P_900913, // specified because it is different than the map 
     	visibility : false,
     	//extractAttributes: true,
     	styleMap: earthStyleMap	
    });    
	map.addLayer(usgs);
	
	
	gdacs = new OpenLayers.Layer.Vector("gdacs", {
        projection: new OpenLayers.Projection("EPSG:4326"),
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.Script({
            url: "http://jsonpwrapper.com/?urls[]=http://www.gdacs.org/xml/gdacs.kml",
            format: new OpenLayers.Format.GML(),
            parseFeatures: function(data) {
                return this.format.read(data[0]['body']);
            }
        }),               
     	//projection: P_900913, // specified because it is different than the map 
     	visibility : false,
     	//extractAttributes: true,
     	styleMap: earthStyleMap	
    });    
	//map.addLayers([gdacs]);
};

