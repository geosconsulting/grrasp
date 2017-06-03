function [] = mainGeomFinland()
% To invoke RINO using Data Base connetionn.
% ...

% DATA INPUT ....


ConnDB=DataBaseConnectionFinland;

[geomArray] = DataRetreivalGeomFinland(ConnDB);

geo_mag_currFinland(geomArray);

end

