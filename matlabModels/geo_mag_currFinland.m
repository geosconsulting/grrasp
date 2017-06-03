function GIC = geo_mag_curr(line_length)

%   FUNCTION DESCRIPTION
%   The geo_mag_curr function compute the geomagnetic induced current (GIC) in every transmission line
%   of a power network induced by a magnetic field
%   Data in input are: the line length (expressed in km) and the line
%   resistance per unit length (expressed in Ohm/km)
%   R_loop is the resistance of the loop 


% DATA INPUT ....
% ...
% Transform from meters to km.
line_length(:,2)=line_length(:,2)/1000;


% DATA OUTPUT ....
GIC=[];

%Line and field parameters

%if line resistances are not known
%line_res =0.008;  %[Ohm/km]for 400 kV lines
line_res =0.022;  %[Ohm/km]for 220 kV lines (Finland)
%line_res =0.015;  %[Ohm/km]for 300-330 kV lines (Baltic countires and Norway)
%line_res =0.0185; %[Ohm/km]for 275 kV lines (UK)

earth_resistance = 0.50; %[Ohm]

mag_field = 10*10^(-9); %[T/s]
% mag_field = 1*10^(-9); %[T/s] 

pylon_height = 50; %[meter]

ground_depth= 100*10^3;%[meter] for resistive ground (Finland)
%ground_depth= 0;%[meter] for sea waters

for i=1:length(line_length(:,1))
    
    %   Total resistance of the line
    R_loop = line_res *  line_length(i,2) + 2 * earth_resistance;
    
    %   Geomagnetical induced current [A]
    GIC(i,2) = [mag_field*(line_length(i,2)*10^3*(pylon_height + ground_depth)/R_loop)];
end
GIC(:,1)=line_length(:,1);

csvwrite('GIC_finland.csv',GIC);

