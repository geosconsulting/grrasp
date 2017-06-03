/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function(){
   
    // second tabs built from JS
    var tabs2 = new Ext.TabPanel({
        renderTo: document.body,
        activeTab: 0,
        width:600,
        height:250,
        plain:true,
        defaults:{autoScroll: true},
        items:[{
                title: 'Criticality',
                autoLoad:'/gisplatform/php/00_criticability.php'
            },{
                title: 'Vulnerability',
                autoLoad:'/gisplatform/php/00_vulnerability.php'
            },{
                title: 'Path',
                listeners: {activate: handleActivate},
                autoLoad:'/gisplatform/php/00_path.php'
            },{
                title: 'Clustering',
                autoLoad:'/gisplatform/php/00_clustering.php'
            }
        ]
    });

    function handleActivate(tab){
        alert(tab.title + ' was activated.');
    }
});