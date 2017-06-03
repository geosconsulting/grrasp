var	finestraServer_FILES;
var pannelloFileBrowser;

function createNavigaWindow() {
	
pannelloFileBrowser = new Ext.ux.FileBrowserPanel({
		width: 400,
		height: 400
});

finestraServer_FILES = new Ext.Window({
		id: 'serverWindow',
		name: 'serverWindow',
		layout: "fit",
		title: "Navigate Server",
		closeAction: "hide",			
		width: 640,
		height: 480,
		x: 400,
		y: 120,
		items : [pannelloFileBrowser]	
	});
}

function apriFinestraExplorer(){    
	serverWin = Ext.getCmp('serverWindow');
	serverWin.show();
}