function flashFeatures(features, index) {
	if (!index) {
		index = 0;
	}
	var current = features[index];
	if (current && current.layer === wfs_layer_lines) {
		wfs_layer_lines.drawFeature(features[index], "select");
	}
	var prev = features[index - 1];
	if (prev && prev.layer === wfs_layer_lines) {
		wfs_layer_lines.drawFeature(prev, "default");
	}
	++index;
	if (index <= features.length) {
		window.setTimeout(function() {
					flashFeatures(features, index);
				}, 75);
	}
}