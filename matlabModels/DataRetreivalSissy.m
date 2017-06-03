function [Links] = DataRetreivalSissy(conn)


SqlQueryLinks=['SELECT edge_data.edge_id,edge_data.start_node, edge_data.end_node FROM lombardy_topo.edge_data'];

cursLinks = exec(conn, SqlQueryLinks);
Links = fetch(cursLinks);
Links=cell2mat(Links.Data);


end
