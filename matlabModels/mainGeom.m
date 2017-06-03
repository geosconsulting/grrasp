function [] = mainGeom()
% To invoke RINO using Data Base connetionn.
% ...

% DATA INPUT ....


ConnDB=DataBaseConnection;

[geomArray] = DataRetreivalGeom(ConnDB);

geo_mag_curr(geomArray);

end

