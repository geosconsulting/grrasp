var printWin;

function createPrintWindow() {
	
	/*var printPanel = new Ext.Panel({
		//html : '<h1>Select area and press for print</h1>',
        bbar : [ {
			text : "CREATE PDF",
			xtype:'button',
			handler : function() {
				// the PrintExtent plugin is the mapPanel's 1st plugin
				mapPanel.plugins[0].print();
			}
		}]
    });*/
	
	
	var printForm = new Ext.form.FormPanel({
	    width: 300,
	    height: 180,
	    defaults: {anchor: "100%"},
	    items: [{
	        xtype: "combo",
	        displayField: "name",
	        store: printProvider.layouts, // printProvider.layout
	        fieldLabel: "Layout",
	        typeAhead: true,
	        mode: "local",
	        forceSelection: true,
	        triggerAction: "all",
	        selectOnFocus: true,
	        plugins: new GeoExt.plugins.PrintProviderField({
	            printProvider: printProvider
	        })
	    }, {
	        xtype: "combo",
	        displayField: "name",
	        store: printProvider.dpis, // printProvider.dpi
	        fieldLabel: "Resolution",
	        typeAhead: true,
	        mode: "local",
	        forceSelection: true,
	        triggerAction: "all",
	        selectOnFocus: true,
	        plugins: new GeoExt.plugins.PrintProviderField({
	            printProvider: printProvider
	        })
	    },{
	        xtype: "textarea",
	        height: 25,
	        name: "mapTitle", // printProvider.customParams.mapTitle
	        fieldLabel: "Map Title",
	        plugins: new GeoExt.plugins.PrintProviderField({
	            printProvider: printProvider
	        })
	    },{
            xtype: "textarea",
            name: "comment",
            value: "",
            fieldLabel: "Comment",
            plugins: new GeoExt.plugins.PrintProviderField({
            	printProvider: printProvider
            })
        },{
		    text : "CREATE PDF",
			xtype:'button',
			handler : function() {
				// the PrintExtent plugin is the mapPanel's 1st plugin
				mapPanel.plugins[0].print(legendPanel);
			}
	    }]
	    
	});
	
printWin = new Ext.Window({
	id : 'print',
	name : 'printWin',
	title : "Print Panel",
	x: 200,
	y: 500,
	items : [printForm],
    listeners: {
    	close :  function() {
    		printExtent.removePage(printExtent.pages[0]);
    		printExtent.hide();
		},	
		show : function() {
			printExtent.show();
			printExtent.addPage();	
		},
		activate :  function() {
			//gmap.setVisibility(false);
			//osm_layer.setVisibility(true);
		}
    }
});
	
	
}
