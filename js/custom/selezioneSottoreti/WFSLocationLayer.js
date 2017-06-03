function addVectorSelectionLayers() { 	

var styleBase = {
			strokeColor: "green", 
		    strokeOpacity: "0.7", 
		    strokeWidth: 2, 
		    fillColor: "blue", 
		    pointRadius: 3, 
		    cursor: "pointer"
};	        
var styleNonSelezionato = OpenLayers.Util.applyDefaults(styleBase, OpenLayers.Feature.Vector.style["default"]);

var styleEvidenziato = {
		label: '${gid}',
	    labelXOffset: 10,	
		labelYOffset: 10,
		fontColor: "red",
	    strokeColor: "red", 
	    fillColor: "red",
	    strokeOpacity: "0.7", 
	    strokeWidth: 2, 
	    pointRadius: 5};
		        
var styleNonSelezionato = OpenLayers.Util.applyDefaults(styleBase, OpenLayers.Feature.Vector.style["default"]);
var styleSelezionato = OpenLayers.Util.applyDefaults(styleEvidenziato, OpenLayers.Feature.Vector.style["select"]);

var stylemap = new OpenLayers.StyleMap({
		'default': styleNonSelezionato,
		'select':  styleSelezionato
});	

vectorLayerRegione = new OpenLayers.Layer.Vector("_Region", {
	styleMap: stylemap,
	displayInLayerSwitcher: false
});   
map.addLayer(vectorLayerRegione);
	
vectorLayerCircle = new OpenLayers.Layer.Vector("_Buffer", {
	styleMap: stylemap,
	displayInLayerSwitcher: false
});
map.addLayer(vectorLayerCircle);

layerPoligoni = new OpenLayers.Layer.Vector("_Polygon", {
	styleMap: stylemap,
	displayInLayerSwitcher: false
});
map.addLayer(layerPoligoni);

disegnoPoligono = new OpenLayers.Control.DrawFeature(
		layerPoligoni,		
		OpenLayers.Handler.Polygon
		);
map.addControl(disegnoPoligono);

OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
	  defaultHandlerOptions: {
	      'single': true,
	      'double': false,
	      'pixelTolerance': 0,
	      'stopSingle': false,
	      'stopDouble': false
	  },
	initialize: function(options) {		
	      this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
	      OpenLayers.Control.prototype.initialize.apply(this, arguments); 
	      this.handler = new OpenLayers.Handler.Click(this, {'click': this.trigger}, this.handlerOptions);	      
	},
	trigger: function(e) {
		  var lonlatpix = map.getLonLatFromPixel(e.xy);
		  disegnaCerchio(lonlatpix,buffer);	      
	  }
	});
clickCentroCerchio = new OpenLayers.Control.Click();
map.addControl(clickCentroCerchio);

};

