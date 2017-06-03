function [geomagneticalArray] = DataRetreivalGeomFinland(conn, lunghezza)

% Use the open (GIS) Data Base Connection to retrieve data
% in accord with the users choices.

SqlQueryGeom=['SELECT label_id,length FROM calc.finland_cables'];
cursGeom            = exec(conn, SqlQueryGeom);
geomagneticalArray  = fetch(cursGeom);

geomagneticalArray  = cell2mat(geomagneticalArray.Data);


end
