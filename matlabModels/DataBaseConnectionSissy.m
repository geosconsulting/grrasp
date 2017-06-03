function [conn] = DataBaseConnectionSissy()

% Connection to GIS data Base.

jdbcjarfile = 'postgresql-9.2-1003.jdbc4.jar';
javaaddpath(['D:\xampp\htdocs\grrasp\matlabModels\' jdbcjarfile]);

conn = database('grid', 'postgres', 'GIS', 'org.postgresql.Driver', 'jdbc:postgresql://localhost:5432/grid');

end

