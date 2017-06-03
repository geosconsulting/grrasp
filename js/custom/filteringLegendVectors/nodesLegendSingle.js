var styleNodeSingleValue;

function applicaLegendaNodiUnique(wfsEditingAttivo) {

var defStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);        
OpenLayers.Util.extend(defStyle ,
			{
			cursor: 'crosshair',
			strokeWidth: 2,		
			strokeColor : 'black',
			fillColor :'white',
			pointRadius: 4});	
    
var selStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['select']);        
	OpenLayers.Util.extend(selStyle , 
			{
			label: 'Editing node ${id}',
			labelXOffset:8,
			labelYOffset: 9,
            fontColor: "red",
            fontSize: "12px",
            fontFamily: "Courier New, monospace",
            fontWeight: "bold",              
            labelOutlineColor: "white",
            labelOutlineWidth: 3,
			cursor: 'crosshair',
			strokeWidth: '2', 
			strokeColor: 'white',
			fillColor:'red',
			pointRadius: 6	});	
	
styleNodeSingleValue = new OpenLayers.StyleMap({
        "default": defStyle,
        "select": selStyle
    });
    
wfsEditingAttivo.styleMap = styleNodeSingleValue;   
wfsEditingAttivo.redraw();

}