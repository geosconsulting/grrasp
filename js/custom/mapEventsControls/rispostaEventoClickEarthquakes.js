var select_earthquakes_control;

function creaEventoLayerEarthquake(map) {
	
select_earthquakes_control = new OpenLayers.Control.SelectFeature(
	usgs,
		{
			multiple :false,
			toggle:true,				
			hover:false
		}
);
map.addControl(select_earthquakes_control);

usgs.events.register('featureselected',this,selected_earthQuake);
usgs.events.register('featureunselected',this,unselected_earthQuake);

select_earthquakes_control.activate(); 
	
}

function selected_earthQuake(eventClickEarthquake) {				
	Ext.Msg.alert('Earthquake Details', eventClickEarthquake.feature.attributes.title);
};

function unselected_earthQuake(eventClick) {	
	
};

