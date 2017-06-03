var RSSPanel;

var msg = function(title, msg){
    Ext.Msg.show({
        title: title,
        msg: msg,
        minWidth: 200,
        modal: true,
        icon: Ext.Msg.INFO,
        buttons: Ext.Msg.OK
    });
};

RSSPanel = new Ext.Panel({
	id : "areaJRC",
	//layout : "accordion",
	layoutConfig : {
		activeOnTop : false,
		animate : false,
		autoWidth : true			
	},
	items : [{
		    title : "GDACS",
		    autoHeight : true,
		    collapsible: true,
		    collapsed: true,
		    listeners: { 
		    	expand : function(){
		    		Ext.Ajax.request({
		    	        url: 'php/rss/rssGDACS.php',
		    	        success: function (r) {		    	        	
		    	        	RSSPanel.items.items[0].load('php/rss/rssGDACS.php');
		    	        },
		    	        failure : function() {		    	        	
		    	        }
		    	    });
		    	}
		    }		    
		  },{
		    title : "RAPID-N",
		    autoHeight : true,
		    collapsible: true,
		    html : "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
		  },{
		    title : "EFFIS Forest Fires",
		    autoHeight : true,
		    collapsible: true,
		    html : "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi."
		  },{
		    title : "Flood Hazard Map Europe",
		    autoHeight : true,
		    collapsible: true,
		    html : "Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat."
		  }]
});

