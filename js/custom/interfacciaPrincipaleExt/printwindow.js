var printWin;

function createPrintWindow() {
	
var printpanel = new Ext.Panel({
       title: 'My Panel',
       collapsible:true,
       bbar : [ {
		text : "Create PDF",
		handler : function() {
			// the PrintExtent plugin is the mapPanel's 1st plugin
			mapPanel.plugins[0].print();
		}
	} ]
});
	

printWin = new Ext.Window({
	id : 'print',
		name : 'printWin',
		title : "PrintWin panel",
		closeAction : "close",
		width : 200,
		height : 100,
		x: 1200,
		y: 100,
		items : [printpanel]
	});

	printExtent.addPage();
}
