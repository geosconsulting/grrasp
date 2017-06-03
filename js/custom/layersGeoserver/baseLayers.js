var map,mapextent;
var gsat,gphy,gmap,ghyb,osm_layer;

function addBaseLayers(P_4326,P_900913,P_2077) {    
    
map = new OpenLayers.Map({
		div : "map",
		allOverlays: false,
		//COSI VEDO I RSS DI USGS geographic/mercator WMS mercator/geographic
		projection : P_900913,
		displayProjection: P_4326,
		units: 'm',
		//importante altrimenti i WMS si vedono tagliati
		maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
		//maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90),
		eventListeners: {}
});  

//map extent EUROPA
//mapextent = new OpenLayers.Bounds(6.101065,46.007700, 15.707772,42.873371).transform(P_4326, P_900913);

//map extent Lombardia
mapextent = new OpenLayers.Bounds(8.50, 44.50, 11.25, 46.50).transform(P_4326, P_900913);

gsat = new OpenLayers.Layer.Google("Google Satellite",
		{
			sphericalMercator: true,		
			type : google.maps.MapTypeId.SATELLITE,
			numZoomLevels : 22		
		}
	);
	
gphy = new OpenLayers.Layer.Google("Google Physical", {
		sphericalMercator: true,
		type : google.maps.MapTypeId.TERRAIN,
		visibility : false		
		}
	);
	
gmap = new OpenLayers.Layer.Google(	"Google Streets", {
		sphericalMercator: true,
		numZoomLevels : 20,
		visibility : false
		}	
	);
	
ghyb = new OpenLayers.Layer.Google("Google Hybrid",{
		sphericalMercator: true,
		type : google.maps.MapTypeId.HYBRID,
		numZoomLevels : 22,
		visibility : false			
		}	
	);	

map.addLayers([gmap,ghyb,gsat, gphy]); 

var road = new OpenLayers.Layer.Bing({
    name: "Bing Road",
    key: apiKey,
    type: "Road"
});

var hybrid = new OpenLayers.Layer.Bing({
    name: "Bing Hybrid",
    key: apiKey,
    type: "AerialWithLabels"
});

var aerial = new OpenLayers.Layer.Bing({
    name: "Bing Aerial",
    key: apiKey,
    type: "Aerial"
});

map.addLayers([road, hybrid, aerial]);

osm_layer = new OpenLayers.Layer.OSM('OpenStreetMap');

var landsat = new OpenLayers.Layer.WMS(
		  "Landsat Imagery",
		  "http://t1.hypercube.telascience.org/cgi-bin/landsat7",
		  {layers: "MS"}
		);

arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
            "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
            "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
            "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg"];

arrayAerial = ["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"];

baseOSM = new OpenLayers.Layer.OSM("MapQuest", arrayOSM);
baseAerial = new OpenLayers.Layer.OSM("Open Aerial", arrayAerial);

map.addLayers([osm_layer,baseOSM,baseAerial]);
	
/*map.addControl(
    new OpenLayers.Control.MousePosition({
    prefix: '<a target="_blank" ' +
            'href="http://spatialreference.org/ref/epsg/4326/">' +
            'EPSG:4326</a> coordinates: ',
    separator: ' | ',
    numDigits: 3,
    emptyString: 'Mouse is not over map.'
     })
);*/

map.addControl(new OpenLayers.Control.MousePosition({numDigits: 3, emptyString: 'Mouse is not over map.'}));
    
var loadingpanel = new OpenLayers.Control.LoadingPanel();
map.addControl(loadingpanel);
	
return map;
};
