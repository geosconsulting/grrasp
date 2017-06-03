function calcVincenty(geometry) {
   var dist = 0;
   for (var i = 1; i < geometry.components.length; i++) {
       var first = geometry.components[i-1];
       var second = geometry.components[i];
       dist += OpenLayers.Util.distVincenty(
              {lon: first.x, lat: first.y},
              {lon: second.x, lat: second.y}
         );
       }
       return dist;
}    