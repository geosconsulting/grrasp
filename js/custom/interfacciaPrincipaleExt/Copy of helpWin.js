var	helpwin;

function createHelpWindow() {
helpwin = new Ext.Window({
		id: 'helpWin',
		name: 'helpWin',
		layout: "fit",
		title: "Help",
		closeAction: "hide",			
		width: 400,
		height: 250,
		x: 350,
		y: 200,
		items: [{
			  xtype : "tabpanel",
			  items : [    {
			      xtype : "panel",
			      title : "Introduction",
			      items : [        {
			          xtype : "textarea",
			          fieldLabel : "Text",
			          width : 400,
			          height : 250,
			          name : "textIntroduction"
			      }]
			  },    {
			      xtype : "panel",
			      title : "Manual",
			      items : [        {
			          xtype : "textarea",
			          fieldLabel : "Text",
			          width : 400,
			          height : 250,
			          name : "textManuale"
			      }]
			  },    {
			      xtype : "panel",
			      title : "FAQ",
			      items : [        {
			          xtype : "textarea",
			          fieldLabel : "Text",
			          name : "textarea",
			          width : 400,
			          height : 250
			      }]
			  }],
			  activeTab : 0
		}]
		});
}
