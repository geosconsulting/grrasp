function applicaFiltro(filtro,wfsEditingAttivo) {
	
//FILTRO DA APPLICARE AI NODI
var filter_nodes = new OpenLayers.Filter.Comparison({
	type: OpenLayers.Filter.Comparison.EQUAL_TO,
    property: 'type_id',
    value: filtro    		
});
    
//RULE A CUI APPLICARE IL FILTRO
var rule_nodes = new OpenLayers.Rule({
	 	title: "Selected Nodes",
    	filter: filter_nodes,
    	symbolizer: {
    		fillColor: '#ff0055', 
    		fillOpacity:.5,
    		pointRadius:5, 
    		strokeColor: '#990033',
    		strokeWidth:2
    	}
    });
    
var vector_style = new OpenLayers.Style();
vector_style.addRules([rule_nodes]);

var vector_style_map = new OpenLayers.StyleMap({
   	'default': vector_style
});
    
wfsEditingAttivo.styleMap = vector_style_map;
wfsEditingAttivo.redraw();

}