Ext
		.onReady(function() {

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
										autoLoad : 'tests/help/intro.html'
									},
									{
										xtype : "panel",
										title : "GIS Platform",
										autoLoad : 'help/itinfra.html'
									},
									{
										xtype : "panel",
										title : "Base tools",
										layout : "accordion",
										items : [
												{
													title : 'Interface',
													autoLoad : 'help/manual.html',
													autoScroll : true
												},
												{
													title : 'Data',
													autoLoad : 'help/data.html',
													autoScroll : true
												},
												{
													title : 'Map Viewer',
													autoLoad : 'help/mapviewer.html',
													autoScroll : true
												},
												{
													title : 'Map Server Viewer',
													autoLoad : 'help/mapserverviewer.html',
													autoScroll : true
												},
												{
													title : 'Toolbar',
													autoLoad : 'help/toolbar.html',
													autoScroll : true
												},
												{
													title : 'Layer Window',
													autoLoad : 'help/layerwin.html',
													autoScroll : true
												},
												{
													title : 'Legends, models and non-geographical data',
													autoLoad : 'help/legend.html',
													autoScroll : true
												},
												{
													title : 'Data viewer',
													autoLoad : 'help/dataview.html'
												} ]
									}, {
										xtype : "panel",
										title : "Advance tools",
										layout : "accordion",
										items : [
												{
													title : 'Network Topologies ',
													autoLoad : 'help/topo.html',
													autoScroll : true
												},
												{
													title : 'Spatial analyses and visualization',
													autoLoad : 'help/spatial.html',
													autoScroll : true
												},
												{
													title : 'Multi-Hazard Risk Assessment: Scenario Builder',
													autoLoad : 'help/scenario.html',
													autoScroll : true
												},
												{
													title : 'Dynamic Data Visualization',
													autoLoad : 'help/dvisual.html',
													autoScroll : true
												},
												{
													title : 'Non spatial analyses',
													autoLoad : 'help/nosanalist.html',
													autoScroll : true
												}]
									} ],
							activeTab : 0
						} ]
					});
			helpwin.show();
		});
