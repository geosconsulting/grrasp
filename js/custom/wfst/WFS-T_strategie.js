var saveStrategyPoint,saveStrategyLine,saveStrategyPoly;

function strategieDiSalvataggioPerINodiESegmenti() { 
	
//set up a save strategy
saveStrategyPoint = new OpenLayers.Strategy.Save();
//saveStrategyPoint.events.register("success", '',alert("cancellato con successo"));
//saveStrategyPoint.events.register("fail", '', showFailureMsg);

saveStrategyLine = new OpenLayers.Strategy.Save();
//saveStrategyLine.events.register("success", '', showSuccessMsg);
//saveStrategyLine.events.register("fail", '', showFailureMsg);

saveStrategyPoly = new OpenLayers.Strategy.Save();
//saveStrategyPoly.events.register("success", '', showSuccessMsg);
//saveStrategyPoly.events.register("fail", '', showFailureMsg);

}
 
 