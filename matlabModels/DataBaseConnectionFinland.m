function [conn] = DataBaseConnectionFinland()

% Connection to GIS data Base.

jdbcjarfile = 'postgresql-9.2-1003.jdbc4.jar';
javaaddpath(['D:\xampp\htdocs\grrasp\matlabModels\' jdbcjarfile]);

conn = database('gas_elec_ntwk', 'postgres', 'GIS', 'org.postgresql.Driver', 'jdbc:postgresql://localhost:5433/gas_elec_ntwk');

end