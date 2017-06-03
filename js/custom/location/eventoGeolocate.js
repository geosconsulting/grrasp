var geolocate;

function eventoGeoLocation(map){

geolocate = new OpenLayers.Control.Geolocate({
   bind: false,
   geolocationOptions: {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: 7000
    }
});
map.addControl(geolocate);
	
}



