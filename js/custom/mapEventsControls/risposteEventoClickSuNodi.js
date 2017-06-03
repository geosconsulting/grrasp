function raccogliInformazioniNodoSelezionatoPunto(eventClickNodi) {	
	
	//console.log(eventClickNodi);	
	nodeID_0Click 	= eventClickNodi.feature.attributes.id_0;	
	nodeNomeClick 	= eventClickNodi.feature.attributes.nome;
	nodeTipoClick 	= eventClickNodi.feature.attributes.tipo;
	nodeIDClick   	= eventClickNodi.feature.attributes.id;
	nodeFIDClick  	= eventClickNodi.feature.fid;
	
	winAttributesNodesEditing.items.item('id').setValue(nodeID_0Click);
	winAttributesNodesEditing.items.item('tipo').setValue(nodeTipoClick);
	winAttributesNodesEditing.items.item('nome').setValue(nodeNomeClick);	
	winAttributesNodesEditing.items.item('fid').setValue(nodeFIDClick);
};

function rilasciaInformazioniNodoSelezionatoPunto(eventClickNodi) {	
	
	winAttributesNodesEditing.items.item('id').setValue('');
	winAttributesNodesEditing.items.item('tipo').setValue('');
	winAttributesNodesEditing.items.item('nome').setValue('');
	winAttributesNodesEditing.items.item('fid').setValue('');
};

function raccogliInformazioniNodoSelezionatoLinea(eventClickSegment) {			
	
	linkID_0Click	= eventClickSegment.feature.attributes.id_0;
	linkNomeClick	= eventClickSegment.feature.attributes.nome;
	linkTipoClick	= eventClickSegment.feature.attributes.tipo;
	linkIDClick 	= eventClickSegment.feature.attributes.id;	
	linkFIDClick 	= eventClickSegment.feature.fid;	
	
	winAttributesLinksEditing.items.item('link_id0').setValue(linkID_0Click);
	winAttributesLinksEditing.items.item('link_tipo').setValue(linkNomeClick);
	winAttributesLinksEditing.items.item('link_nome').setValue(linkTipoClick);
	winAttributesLinksEditing.items.item('link_id').setValue(linkIDClick);
	winAttributesLinksEditing.items.item('link_fid').setValue(linkFIDClick);
				
};

function rilasciaInformazioniNodoSelezionatoLinea(eventClickSegment) {
	
	winAttributesLinksEditing.items.item('link_id0').setValue('');
	winAttributesLinksEditing.items.item('link_tipo').setValue('');
	winAttributesLinksEditing.items.item('link_nome').setValue('');
	winAttributesLinksEditing.items.item('link_id').setValue('');
	winAttributesLinksEditing.items.item('link_fid').setValue('');

};

function raccogliInformazioniNodoSelezionatoPoly(eventClickPoly) {			
	
	polyID_0Click	= eventClickPoly.feature.attributes.id_0;
	polyNomeClick	= eventClickPoly.feature.attributes.nome;
	polyTipoClick	= eventClickPoly.feature.attributes.tipo;
	polyIDClick 	= eventClickPoly.feature.attributes.id;	
	polyFIDClick 	= eventClickPoly.feature.fid;	
	
	winAttributesPolygonEditing.items.item('poly_id0').setValue(polyID_0Click);
	winAttributesPolygonEditing.items.item('poly_tipo').setValue(polyNomeClick);
	winAttributesPolygonEditing.items.item('poly_nome').setValue(polyTipoClick);
	winAttributesPolygonEditing.items.item('poly_id').setValue(polyIDClick);
	winAttributesPolygonEditing.items.item('poly_fid').setValue(polyFIDClick);			
};

function rilasciaInformazioniNodoSelezionatoPoly(eventClickPoly) {
	
	winAttributesPolygonEditing.items.item('poly_id0').setValue('');
	winAttributesPolygonEditing.items.item('poly_tipo').setValue('');
	winAttributesPolygonEditing.items.item('poly_nome').setValue('');
	winAttributesPolygonEditing.items.item('poly_id').setValue('');
	winAttributesPolygonEditing.items.item('poly_fid').setValue('');			

};

