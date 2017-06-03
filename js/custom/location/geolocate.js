function preparaGeoLocation(map){

var styleVectorCircle = {
		fillColor: '#f00',
		strokeColor: '#F00',
		fillOpacity: 0.1,
		strokeWidth: 2,
		strokeDashstyle : 'dot'
};
	
var pulsate = function(feature) {
    var point = feature.geometry.getCentroid(),
      	bounds = feature.geometry.getBounds(),
		        radius = Math.abs((bounds.right - bounds.left)/2),
		        count = 0,
		        grow = 'up';

		    var resize = function(){
		        if (count>16) {
		            clearInterval(window.resizeInterval);
		        }
		        var interval = radius * 0.03;
		        var ratio = interval/radius;
		        switch(count) {
		            case 4:
		            case 12:
		                grow = 'down'; break;
		            case 8:
		                grow = 'up'; break;
		        }
		        if (grow!=='up') {
		            ratio = - Math.abs(ratio);
		        }
		        feature.geometry.resize(1+ratio, point);
		        vectorLayerCircle.drawFeature(feature);
		        count++;
		    };
		    window.resizeInterval = window.setInterval(resize, 50, point, radius);
		};

		
var firstGeolocation = true;

geolocate.events.register("locationupdated",geolocate,function(e) {
	vectorLayerCircle.removeAllFeatures();
    var circle = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.Polygon.createRegularPolygon(
            new OpenLayers.Geometry.Point(e.point.x, e.point.y),
            	e.position.coords.accuracy/2,
	            40,
	            0
	        ),
	        {},
	        styleVectorCircle
	    );
    vectorLayerCircle.addFeatures([
	        new OpenLayers.Feature.Vector(
	            e.point,
	            {},
	            {
	                graphicName: 'cross',
	                strokeColor: '#f00',
	                strokeWidth: 2,
	                fillOpacity: 0,
	                pointRadius: 10
	            }
	        ),
	        circle
	    ]);
	    if (firstGeolocation) {
	        map.zoomToExtent(vectorLayerCircle.getDataExtent());
		        pulsate(circle);
		        firstGeolocation = false;
		        this.bind = true;
		    }
		});

geolocate.events.register("locationfailed",this,function() {
	    OpenLayers.Console.log('Location detection failed');
});
	
	
}



