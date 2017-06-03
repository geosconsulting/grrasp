function [conn] = DataBaseConnection()

% Connection to GIS data Base.

jdbcjarfile = 'postgresql-9.2-1003.jdbc4.jar';
javaaddpath([pwd '\' jdbcjarfile]);

conn = database('grid', 'postgres', 'GIS', 'org.postgresql.Driver', 'jdbc:postgresql://localhost:5433/grid');

end

