var rules;
var styleNodeRules;

function applicaLegendaRulesNodiWFS(wfsEditingAttivo){
  
	rules = [
        new OpenLayers.Rule({
            title: "Node Type 1",
            //maxScaleDenominator: 3000000,
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: "type_id",
                value: 1
            }),
            symbolizer: {
                graphicName: "circle",
                pointRadius: 4,
                fillColor: "#99ccff",
                strokeColor: "#666666",
                strokeWidth: 1
            }
        }),
        new OpenLayers.Rule({
            title: "Node Type 2",
            //maxScaleDenominator: 3000000,
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: "type_id",
                value: 2
            }),
            symbolizer: {
                graphicName: "circle",
                pointRadius: 4,
                fillColor: "#6699cc",
                strokeColor: "#666666",
                strokeWidth: 1
            }
        }),
        new OpenLayers.Rule({
            title: "Node Type 3",
            //maxScaleDenominator: 3000000,
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: "type_id",
                value: 3
            }),
            symbolizer: {
                graphicName: "circle",
                pointRadius: 4,
                fillColor: "#bd2e28",
                strokeColor: "#666666",
                strokeWidth: 1
            }
        }),
        new OpenLayers.Rule({
            title: "Node Type 4",
            //maxScaleDenominator: 3000000,
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: "type_id",
                value: 4
            }),
            symbolizer: {
                graphicName: "circle",
                pointRadius: 4,
                fillColor: "#f3e009",
                strokeColor: "#666666",
                strokeWidth: 1
            }
        })
      ];    
    
styleNodeRules = new OpenLayers.StyleMap(
		new OpenLayers.Style({}, 
   	    	 {rules: rules})
);

wfsEditingAttivo.styleMap = styleNodeRules;   
wfsEditingAttivo.redraw();

};