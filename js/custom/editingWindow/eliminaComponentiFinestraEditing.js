function distruggiComponenti(){
	var f;
	while(f = editWinToolsAreaImmutable.items.first()){
		editWinToolsAreaImmutable.remove(f, true);		
	}
	
	var g;
	while(g = editWinToolsArea.items.first()){
		editWinToolsArea.remove(g, true);		
	}
}