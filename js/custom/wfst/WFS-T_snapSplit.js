function snapSplit(map) {

//configure the snapping agent
snapLines = new OpenLayers.Control.Snapping({
  layer: wfs_layer_lines,
  targets: [wfs_layer_point,wfs_layer_lines],
  greedy: false
  });
snapLines.activate();

//configure split agent
split = new OpenLayers.Control.Split({
    layer: wfs_layer_lines,
    source: wfs_layer_lines,
    tolerance: 0.0001,
   eventListeners: {
   aftersplit: function(event) {
   flashFeatures(event.features);
          }
    }
});
map.addControl(split);
split.activate();
};

 