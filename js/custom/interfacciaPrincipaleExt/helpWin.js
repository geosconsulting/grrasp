var	helpwin;

function createHelpWindow() {
	helpwin = new Ext.Window(
			{
				id : 'helpWin',
				name : 'helpWin',
				layout : "fit",
				title : "GRRASP MANUAL",
				closeAction : "hide",
				width : 620,
				height : 800,
				x : 150,
				y : 50,
				items : [ {
					xtype : "tabpanel",
					defaults : {
						autoScroll : true
					},
					items : [
							{
								xtype : "panel",
								title : "Introduction",
								autoLoad : 'js/custom/interfacciaPrincipaleExt/help/intro.html'
							},
							{
								xtype : "panel",
								title : "GIS Platform",
								autoLoad : 'js/custom/interfacciaPrincipaleExt/help/itinfra.html'
							},
							{
								xtype : "panel",
								title : "Base tools",
								layout : "accordion",
								items : [
										{
											title : 'Interface',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/manual.html',
											autoScroll : true
										},
										{
											title : 'Data',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/data.html',
											autoScroll : true
										},
										{
											title : 'Map Viewer',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/mapviewer.html',
											autoScroll : true
										},
										{
											title : 'Map Server Viewer',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/mapserverviewer.html',
											autoScroll : true
										},
										{
											title : 'Toolbar',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/toolbar.html',
											autoScroll : true
										},
										{
											title : 'Layer Window',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/layerwin.html',
											autoScroll : true
										},
										{
											title : 'Legends, models and non-geographical data',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/legend.html',
											autoScroll : true
										},
										{
											title : 'Data viewer',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/dataview.html'
										} ]
							}, {
								xtype : "panel",
								title : "Advance tools",
								layout : "accordion",
								items : [
										{
											title : 'Network Topologies ',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/topo.html',
											autoScroll : true
										},
										{
											title : 'Spatial analyses and visualization',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/spatial.html',
											autoScroll : true
										},
										{
											title : 'Multi-Hazard Risk Assessment: Scenario Builder',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/scenario.html',
											autoScroll : true
										},
										{
											title : 'Dynamic Data Visualization',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/dvisual.html',
											autoScroll : true
										},
										{
											title : 'Non spatial analyses',
											autoLoad : 'js/custom/interfacciaPrincipaleExt/help/nosanalist.html',
											autoScroll : true
										}]
							} ],
					activeTab : 0
				} ]
			});
}
