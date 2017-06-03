function [geomagneticalArray] = DataRetreivalGeom(conn, lunghezza)

% Use the open (GIS) Data Base Connection to retrieve data
% in accord with the users choices.

SqlQueryGeom=['SELECT label_id,length FROM ele_net.elect_network'];
cursGeom            = exec(conn, SqlQueryGeom);
geomagneticalArray  = fetch(cursGeom);
geomagneticalArray  = cell2mat(geomagneticalArray.Data);


end
