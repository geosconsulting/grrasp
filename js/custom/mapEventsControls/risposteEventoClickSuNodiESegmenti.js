function selected_feature_nodi(eventClickNodi) {	
	
	nodeIDClick 			= eventClickNodi.feature.attributes.node_id;
	//NON LO USO
	nodeGIDClick 			= eventClickNodi.feature.attributes.gid;
	nodeDescClick 			= eventClickNodi.feature.attributes.desc;
	nodeFIDClickeventClick 	= eventClickNodi.feature.fid;
	
	lon = eventClickNodi.feature.geometry.x;
	lat = eventClickNodi.feature.geometry.y;
	var lonlat = new OpenLayers.LonLat(lon, lat);	
    lonlat.transform(P_900913, P_4326);    
	nodeEastingClick = lonlat.lon;
	nodeNothingClick = lonlat.lat;
	
	nodeTypeClick = eventClickNodi.feature.attributes.node_type;
	
	winAttributesNodesEditing.items.item('gid').setValue(nodeIDClick);
	winAttributesNodesEditing.items.item('desc').setValue(nodeDescClick);
	winAttributesNodesEditing.items.item('fid').setValue(nodeFIDClickeventClick);	
	winAttributesNodesEditing.items.item('easting').setValue(nodeEastingClick);
	winAttributesNodesEditing.items.item('northing').setValue(nodeNothingClick);
	winAttributesNodesEditing.items.item('node_type').setValue(nodeTypeClick);
};

function unselected_feature_nodi(eventClickNodi) {	
	/*
	winAttributesNodesEditing.items.item('gid').setValue('');
	winAttributesNodesEditing.items.item('desc').setValue('');
	winAttributesNodesEditing.items.item('fid').setValue('');
	winAttributesNodesEditing.items.item('node_type').setValue('');
	winAttributesNodesEditing.items.item('easting').setValue('');
	winAttributesNodesEditing.items.item('northing').setValue('');*/
};

function selected_feature_segmenti(eventClickSegment) {			
	
	linkIDClick  			= eventClickSegment.feature.attributes.edge_id;
	linkSnodeIDClick   		= eventClickSegment.feature.attributes.start_node;
	linkEnodeIDClick   		= eventClickSegment.feature.attributes.end_node;
	linkDescClick 			= eventClickSegment.feature.attributes.link_desc;	
	linkTypeClick 			= eventClickSegment.feature.attributes.link_type;	
	linkFIDClickeventClick 	= eventClickSegment.feature.fid;	
	linkToClick 			= eventClickSegment.feature.attributes.link_to;	
	
	winAttributesLinksEditing.items.item('gid_seg').setValue(linkIDClick);
	winAttributesLinksEditing.items.item('pannelloNodiStartEnd').items.item('snode').setValue(linkSnodeIDClick);
	winAttributesLinksEditing.items.item('pannelloNodiStartEnd').items.item('enode').setValue(linkEnodeIDClick);
	winAttributesLinksEditing.items.item('link_desc').setValue(linkDescClick);
	winAttributesLinksEditing.items.item('link_type').setValue(linkTypeClick);
	winAttributesLinksEditing.items.item('link_fid').setValue(linkFIDClickeventClick);
	winAttributesLinksEditing.items.item('combovalueExistingNetwork').setValue(linkToClick);
				
};

function unselected_feature_segmenti(eventClickSegment) {
	/*
	winAttributesLinksEditing.items.item('gid_seg').setValue('');
	winAttributesLinksEditing.items.item('pannelloNodiStartEnd').items.item('snode').setValue('');
	winAttributesLinksEditing.items.item('pannelloNodiStartEnd').items.item('enode').setValue('');
	winAttributesLinksEditing.items.item('link_desc').setValue('');
	winAttributesLinksEditing.items.item('link_type').setValue('');
	winAttributesLinksEditing.items.item('link_fid').setValue('');
	winAttributesLinksEditing.items.item('combovalueExistingNetwork').setValue('');*/

};
