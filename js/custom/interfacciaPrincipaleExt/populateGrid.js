var rawAttributeData;

function popolaGriglia(layer,layerLAYERS,url) {	
	
console.log(layer,layerLAYERS,url);
	
var read = OpenLayers.Format.WFSDescribeFeatureType.prototype.read;
OpenLayers.Format.WFSDescribeFeatureType.prototype.read = function() {
    rawAttributeData = read.apply(this, arguments);    
    return rawAttributeData;
};
	
//RECONFIGURE E' UNA CARATTERISTICA DELLE GRID EXTJS    
gridFeatureSelected.reconfigure(new Ext.data.Store(), new Ext.grid.ColumnModel([]));	

var schema = new GeoExt.data.AttributeStore({
      url: url,      
      baseParams: {
        "SERVICE": "WFS",
        "REQUEST": "DescribeFeatureType",
        "VERSION": "1.1.0",
        "TYPENAME": layerLAYERS      
      },
      autoLoad: true,
      listeners: {
         "load": function(store) {           	
             reconfigure(store, url);
        }
      }
    });
}

function reconfigure(store, url) {	
    
	var fields = [], columns = [], geometryName, geometryType;
    // regular expression to detect the geometry column
    var geomRegex = /gml:(Multi)?(Point|Line|Polygon|Surface|Geometry).*/;
    
    var types = {
        // mapping of xml schema data types to Ext JS data types
        "xsd:int": "int",
        "xsd:short": "int",
        "xsd:long": "int",
        "xsd:string": "string",
        "xsd:dateTime": "string",
        "xsd:double": "float",
        "xsd:decimal": "float",
        // mapping of geometry types
        "Point": "Point",
        "Line": "Path",
        "Surface": "Polygon"
    };
    
    store.each(function(rec) {
        var type = rec.get("type");
        var name = rec.get("name");        
        var match = geomRegex.exec(type);
        if (match) {
            // we found the geometry column
            geometryName = name;            
        } else {
            // we have an attribute column
            fields.push({
                name: name,
                type: types[type]
            });
            columns.push({
                xtype: types[type] == "string" ?
                    "gridcolumn" :
                    "numbercolumn",
                dataIndex: name,
                header: name
            });
        }
    });
    
    gridFeatureSelected.reconfigure(new GeoExt.data.FeatureStore({
        autoLoad: true,
        proxy: new GeoExt.data.ProtocolProxy({
            protocol: new OpenLayers.Protocol.WFS({
                url: url,
                version: "1.1.0",
                featureType: rawAttributeData.featureTypes[0].typeName,
                featureNS: rawAttributeData.targetNamespace,
                //srsName: "EPSG:4326",
                geometryName: geometryName,
                maxFeatures: 250
            })
        }),
        fields: fields
    }), new Ext.grid.ColumnModel(columns));    
}


