var printProviderGRRASP;
var printExtent;

function parametriStampa() {

//The printProvider that connects us to the print service
printProviderGRRASP = new GeoExt.data.PrintProvider({
	method : "GET", // "POST" recommended for production use
	capabilities : printCapabilities, // from the info.json script in the html
	customParams : {
		mapTitle : "Printing Demo",
		comment : "This is a map printed from GeoExt."
	}
});


//The printExtent 
printExtent = new GeoExt.plugins.PrintExtent({
	printProvider : printProviderGRRASP
});

//printProviderGRRASP.hide();

};
