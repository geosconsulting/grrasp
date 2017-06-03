var styles;

function stiliVettori() {

styles = new OpenLayers.StyleMap({
              	"default": new OpenLayers.Style(null, {
                    rules: [
                        new OpenLayers.Rule({
                            symbolizer: {
                                "Point": {
                                    pointRadius: 6,
                                    graphicName: "circle",
                                    fillColor: "blue",
                                    fillOpacity: 0.6,
                                    strokeWidth: 1,
                                    strokeOpacity: 0.75,
                                    strokeColor: "#C7D8D6"
                                },
                                "Line": {
                                    strokeWidth: 2,
                                    strokeOpacity: 1,
                                    strokeColor: "#6666aa"
                                },
                                "Polygon": {
                                    strokeWidth: 1,
                                    strokeOpacity: 1,
                                    fillColor: "#9999aa",
                                    strokeColor: "#6666aa"
                                }
                            }
                        })
                    ]
                }),
                "select": new OpenLayers.Style(null, {
                    rules: [
                        new OpenLayers.Rule({
                            symbolizer: {
                                "Point": {
                                    pointRadius: 8,
                                    graphicName: "circle",
                                    fillColor: "red",
                                    fillOpacity: 0.25,
                                    strokeWidth: 2,
                                    strokeOpacity: 1,
                                    strokeColor: "yellow"
                                },
                                "Line": {
                                    strokeWidth: 3,
                                    strokeOpacity: 1,
                                    strokeColor: "red"
                                },
                                "Polygon": {
                                    strokeWidth: 2,
                                    strokeOpacity: 1,
                                    fillColor: "red",
                                    strokeColor: "red"
                                }
                            }
                        })
                    ]
                }),
                "temporary": new OpenLayers.Style(null, {
                    rules: [
                        new OpenLayers.Rule({
                            symbolizer: {
                                "Point": {
                                    graphicName: "square",
                                    pointRadius: 5,
                                    fillColor: "white",
                                    fillOpacity: 0.25,
                                    strokeWidth: 2,
                                    strokeColor: "#0000ff"
                                },
                                "Line": {
                                    strokeWidth: 3,
                                    strokeOpacity: 1,
                                    strokeColor: "#0000ff"
                                },
                                "Polygon": {
                                    strokeWidth: 2,
                                    strokeOpacity: 1,
                                    strokeColor: "#0000ff",
                                    fillColor: "#0000ff"
                                }
                            }
                        })
                    ]
                })
            });

}
 
 