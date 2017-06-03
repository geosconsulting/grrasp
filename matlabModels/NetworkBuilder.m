function [NeBuOut] = NetworkBuilder(NetworkParameters)

% Function description:

% This function ....

% INPUT
% See below.

% OUTPUT
% NeBuOut   Temporary: -1 an error occur;
%                       1 no error;
NeBuOut=-1;


% NOTES
% 1. The words 'System' and 'Network' are used here like synonymous.

% 2. The network nodes and subsystems, can be found in:
% Figure 1.     The PoLLi Node.
% Figure 2.     The PoLLi Node SubSystem.
% Figure 3.     The PoLLi Network Prototype.

% 3. The MATLAB function are in
% \PoLLiMatlabFunction.

% 4. In MATLAB Help search 'Block-Specific Parameters'
% It is very useful


% Bibliographical references:

% [1]  P. Trucco n, E.Cagno, M.DeAmbroggi, "Dynamic functional modelling of
%      vulnerabilityandinteroperability of CriticalInfrastructures".

% Parameter of Simulator
% function: simset


% Variables Initialization.

% FUNCTION INPUT

% NetworkParameters fields description:

% The node in the network.

% Number Of Nodes;
NumberOfNodes=NetworkParameters.NumberOfNodes;

% Will be used in future.

% ID nodes
% ID=NetworkParameters.ID;

% ID infrastructure Type
% IDtype=NetworkParameters.IDtype;

% Nodes Capacity
Capacity=NetworkParameters.Capacity;

% Standard Demand of Nodes
Dstd=NetworkParameters.Dstd;
TimeOfDstd=NetworkParameters.TimeOfDstd;

% Nodes Time Behaviour.
NodeBe=NetworkParameters.NodeBe;

% Initiali nodes functional integrity 
F0=NetworkParameters.F0;

% Initial Nodes Functional Integrity
I0=NetworkParameters.I0;


% Matrix for the network interconnection and interdependency.

% CdT (coefficient of logical transfer) Matrix definition.
CdTvalue=NetworkParameters.CdTvalue;

% Functional adjacency Matrix
AFvalue=NetworkParameters.AFvalue;

% Logical time delay Matrix definition
TLvalue=NetworkParameters.TLvalue;

% Functional time delay Matrix definition
TFvalue=NetworkParameters.TFvalue;

% Simulation step size. It used also to define the Signal Delay
Step=NetworkParameters.Step;

%Threat definition
TimeOfThreat=NetworkParameters.TimeOfThreat;
ValueOfThreat=NetworkParameters.ValueOfThreat;
ChangeOfThreat=NetworkParameters.ChangeOfThreat;

% Snapshot of file open (if exist) by other MATLAB
% programs.
ListOFileOpen=fopen('all');

% Open simulink

simulink;

% Define the name of the model.

InputSystem = 'PoLiFirstPrototipe';

% Create the new simulink model.
new_system(InputSystem);

% Open the simulink model (now is empty).
open_system(InputSystem);

% BUILD THE SIMULINK MODULES THAT REPRESENT THE NODES OF THE SYSTEM.
% We assume a standard behaviour for each nodes [1].

% POsition BOx.
PoBo=[];
Offset=0;

for n = 1:NumberOfNodes
    
    
    % BUILT THE NODES BLOCKS ... in accord with Figure 1 and 2.
    
    % Leggend:      SimulinkName_ -> No space and with _!
    
    
    %   1. -  C (carattTemporaliNodo_).
    %   2. -  C (carattTemporaliMinaccia_).
    %   3. -  Clock1 (ClockOne_).
    
    %   4. -  fFt (fFt_).
    %         \PoLLiMatlabFunction\f1.txt
    
    %   5. -  Data Store Memory2(DSMtwo_), Data store name B.
    % 5.1 Data Store Read from B (dsrTwo_).
    % 5.2 Data Store Write from B (dswTwo_).
    
    %  6. -  Initial Nodes Functional Integrity (FO_).
    
    %  7. - fFM (fFM_).
    %       \PoLLiMatlabFunction\f2.txt
    
    %  8. - Integrity Modulation (IntegrityModulation_).
    %       \PoLLiMatlabFunction\f3.txt
    
    %  9. - Maximum Service (MaximumService_).
    %       \PoLLiMatlabFunction\f4.txt
    
    %  10. - Cmax (Cmax_).
    
    %  11. - Actual Service (ActualService_).
    %        \PoLLiMatlabFunction\f5.txt
    
    %  12. - Dissevice (Disservice_).
    %        \PoLLiMatlabFunction\f6.txt
    
    %  13. - T Inizio Disservizio (TinitDiss_)
    %        \PoLLiMatlabFunction\f7.txt
    
    %  14. - T Disservizio (Tdiss_)
    %        \PoLLiMatlabFunction\f8.txt
    
    %  15. - Transport Delay1 (TrDe1_).
    %  16. - Clock2 (ClockTwo_).
    %  17. -  Data Store Memory1(DSMone_), Data store name A.
    %       17.1 Data Store Read from A (dsrOne_), and 17.1.1             
    %       17.2 Data Store Write from A (dswOne_).
    
    %  18. - Inoperability Modulation (InoperabilityModulation_).
    %        \PoLLiMatlabFunction\f9.txt
    
    %  19. - Actual Demand (ActualDemand_).
    %        \PoLLiMatlabFunction\f10.txt
    
    %  20. - Logic Switch (LogicSwitch_)
    %        \PoLLiMatlabFunction\f11.txt
    
    %  21. - fIdiss (fIdiss_)
    %        \PoLLiMatlabFunction\f12.txt
    
    %  22. - Initial Nodes Inoperability  (I0_).
    
    %  23. - fIt (fIt_)
    %        \PoLLiMatlabFunction\f13.txt
    
    %  24. - IDnodo (IDnodo_).
    %  25. - Signal Standard Demand (StandardDemand_)
    %  26. - Transport Delay2 (TrDe2_).
    %  27. - Disservice To Workspace (SaveDisservice_).
    %  28. - Inoperability To Workspace (SaveDisservice_).
    
    
    NoF=fopen('all');
    
    FidFileToclose=-1;
    
    
    for i=1:length(NoF)
            if isempty(find(ListOFileOpen==NoF(i)))
                fclose(NoF(i));
            end
           
    end
        
    
    % The node label processed at the present.
    Node_Name=num2str(n);
    
    
    % 1.
    % Specify the block position and size.
    x = 50;
    y = 50;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    % Block Construction.
    add_block('built-in/Constant',[InputSystem '/carattNodo_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    % Block Initialization.
    set_param([InputSystem '/carattNodo_',Node_Name],'Value',['[',num2str(NodeBe(n,:)),']']);
    hilite_system([InputSystem,'/carattNodo_',Node_Name], 'red');
    
    % 2.
    x = 50;
    y = 100;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/Constant',[InputSystem '/carattTemporaliMinaccia_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/carattTemporaliMinaccia_',Node_Name],'Value',['[',num2str(ChangeOfThreat),']']);
    hilite_system([InputSystem,'/carattTemporaliMinaccia_',Node_Name], 'red');
    
    % 3.
    x = 50;
    y = 150;
    w = 15;
    h = 15;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/Clock',[InputSystem '/ClockOne_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    
    % 4.
    x = 200;
    y = 50;
    w = 75;
    h = 85;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/fFt_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['fFt_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f01.txt');
    B.Script = fscanf(fid,'%c');
    hilite_system([InputSystem,'/fFt_',Node_Name], 'red');
    
    % 5.
    x = 750;
    y = 550;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/DataStoreMemory',[InputSystem '/DSMtwo_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/DSMtwo_',Node_Name],'Datastorename','B');
    
    % 5.1
    x = 50;
    y = 200;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/DataStoreRead',[InputSystem '/dsrTwo_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/dsrTwo_',Node_Name],'Datastorename','B');
    
    % 5.2.
    x = 370;
    y = 290;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/DataStoreWrite',[InputSystem '/dswTwo_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/dswTwo_',Node_Name],'Datastorename','B');
    
    % 6.
    x = 95;
    y = 220;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/Constant',[InputSystem '/F0_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/F0_',Node_Name],'Value',num2str(F0(n)));
    hilite_system([InputSystem,'/F0_',Node_Name], 'red');
    
    % 7.
    x = 95;
    y = 280;
    w = 40;
    h = 40;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/fFM_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['fFM_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f02.txt');
    B.Script = fscanf(fid,'%c');
    hilite_system([InputSystem,'/fFM_',Node_Name], 'red');
    
    % 8.
    x = 220;
    y = 170;
    w = 80;
    h = 120;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/IntegrityModulation_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    
    S = sfroot;
    B = S.find('Name',['IntegrityModulation_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f03.txt');
    B.Script = fscanf(fid,'%c');
    
    % 9.
    x = 350;
    y = 170;
    w = 80;
    h = 90;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/MaximumService_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['MaximumService_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f04.txt');
    B.Script = fscanf(fid,'%c');
    
    % 10.
    x = 350;
    y = 100;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/Constant',[InputSystem '/Cmax_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/Cmax_',Node_Name],'Value',num2str(Capacity(n)));
    hilite_system([InputSystem,'/Cmax_',Node_Name], 'red');
    
    % 11.
    x = 500;
    y = 170;
    w = 60;
    h = 60;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/ActualService_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['ActualService_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f05.txt');
    B.Script = fscanf(fid,'%c');
    
    % 12.
    x = 600;
    y = 180;
    w = 120;
    h = 80;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/Disservice_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['Disservice_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f06.txt');
    B.Script = fscanf(fid,'%c');
    
    % 13.
    x = 900;
    y = 100;
    w = 100;
    h = 90;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/TinitDiss_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['TinitDiss_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f07.txt');
    B.Script = fscanf(fid,'%c');
    
    
    % 14.
    x = 1100;
    y = 100;
    w = 100;
    h = 70;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/Tdiss_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['Tdiss_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f08.txt');
    B.Script = fscanf(fid,'%c');
    
    % 15.
    x = 800;
    y = 100;
    w = 30;
    h = 30;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/TransportDelay',[InputSystem '/TrDeOne_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/TrDeOne_',Node_Name],'DelayTime',num2str(Step));
    
    % 16.
    x = 800;
    y = 250;
    w = 15;
    h = 15;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/Clock',[InputSystem '/ClockTwo_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    
    % 17.
    x = 810;
    y = 550;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/DataStoreMemory',[InputSystem '/DSMone_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/DSMone_',Node_Name],'Datastorename','A');
    
    % 17.1
    x = 780;
    y = 200;
    w = 30;
    h = 30;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/DataStoreRead',[InputSystem '/dsrOne_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/dsrOne_',Node_Name],'Datastorename','A');
    
   
    % 17.1.1 
    x = 1050;
    y = 200;
    w = 30;
    h = 30;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/DataStoreRead',[InputSystem '/dsrOneDuplicate_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/dsrOneDuplicate_',Node_Name],'Datastorename','A');
    
    
    % 17.2.
    x = 1030;
    y = 90;
    w = 30;
    h = 30;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/DataStoreWrite',[InputSystem '/dswOne_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/dswOne_',Node_Name],'Datastorename','A');
       
        
    % 18.
    x = 200;
    y = 370;
    w = 130;
    h = 120;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/InoperabilityModulation_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['InoperabilityModulation_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f09.txt');
    B.Script = fscanf(fid,'%c');
    
    
    % 19.
    x = 500;
    y = 360;
    w = 150;
    h = 150;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/ActualDemand_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['ActualDemand_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f10.txt');
    B.Script = fscanf(fid,'%c');
    
    % 20.
    x = 800;
    y = 350;
    w = 150;
    h = 100;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/LogicSwitch_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['LogicSwitch_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f11.txt');
    B.Script = fscanf(fid,'%c');
    
    % 21.
    x = 95;
    y = 360;
    w = 35;
    h = 35;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/fIdiss_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['fIdiss_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f12.txt');
    B.Script = fscanf(fid,'%c');
    hilite_system([InputSystem,'/fIdiss_',Node_Name], 'red');
    
    % 22.
    x = 30;
    y = 400;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/Constant',[InputSystem '/I0_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/I0_',Node_Name],'Value',num2str(I0(n)));
    hilite_system([InputSystem,'/I0_',Node_Name], 'red');
    
    % 23.
    x = 130;
    y = 500;
    w = 50;
    h = 70;
    PoBo = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/fIt_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    S = sfroot;
    B = S.find('Name',['fIt_',Node_Name],'-isa','Stateflow.EMChart');
    fid = fopen('PoLLiMatlabFunction\f13.txt');
    B.Script = fscanf(fid,'%c');
    hilite_system([InputSystem,'/fIt_',Node_Name], 'red');
    
    
    % 24.
    x = 50;
    y = 570;
    w = 20;
    h = 20;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/Constant',[InputSystem '/IDnodo_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/IDnodo_',Node_Name],'Value',Node_Name);
    hilite_system([InputSystem,'/IDnodo_',Node_Name], 'red');
    
    % 25.
    x = 350;
    y = 330;
    w = 90;
    h = 35;
    PoBo = [x y x+w y+h];
    
    SDtime = TimeOfDstd;
    SDdata = Dstd(:,n);
    signalbuilder([InputSystem,'/StandardDemand_',Node_Name],'create',SDtime,SDdata,'SDsignal');
    set_param([InputSystem,'/StandardDemand_',Node_Name],'Position',PoBo);
    hilite_system([InputSystem,'/StandardDemand_',Node_Name], 'red');
    close hidden
    
    % 26.
    x = 900;
    y = 300;
    w = 30;
    h = 30;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/TransportDelay',[InputSystem '/TrDeTwo_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/TrDeTwo_',Node_Name],'DelayTime',num2str(Step));
    
    % 27.
    x = 760;
    y = 300;
    w = 30;
    h = 30;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/ToWorkspace',[InputSystem '/SaveDisservice_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/SaveDisservice_',Node_Name],'VariableName',['Disservice_',Node_Name],'MaxDataPoints','inf','SampleTime','-1');
    
    % 28.
    x = 355;
    y = 550;
    w = 30;
    h = 30;
    PoBo = [x y x+w y+h];
    
    add_block('built-in/ToWorkspace',[InputSystem '/SaveInoperability_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
    set_param([InputSystem '/SaveInoperability_',Node_Name],'VariableName',['Inoperability_',Node_Name],'MaxDataPoints','inf','SampleTime','-1');
    
    
    %     % CONNECT THE BLOCKS INSIDE THE NODES ... in accord with Figure 1 and
    %     % 2.
    %
    % Leggend:      SimulinkName_ -> No space and with _!
    %
    %   1. -  C (carattTemporaliNodo_).
    %   2. -  C (carattTemporaliMinaccia_).
    %   3. -  Clock1 (ClockOne_).
    
    %   4. -  fFt (fFt_).
    %         \PoLLiMatlabFunction\f1.txt
    
    %   5. -  Data Store Memory2(DSMtwo_), Data store name B.
    % 5.1 Data Store Read from B (dsrTwo_).
    % 5.2 Data Store Write from B (dswTwo_).
    
    %  6. -    F0 (F0_).
    
    %  7. - fFM (fFM_).
    %       \PoLLiMatlabFunction\f2.txt
    
    %  8. - Integrity Modulation (IntegrityModulation_).
    %       \PoLLiMatlabFunction\f3.txt
    
    %  9. - Maximum Service (MaximumService_).
    %       \PoLLiMatlabFunction\f4.txt
    
    %  10. - Cmax (Cmax_).
    
    %  11. - Actual Service (ActualService_).
    %        \PoLLiMatlabFunction\f5.txt
    
    %  12. - Dissevice (Disservice_).
    %        \PoLLiMatlabFunction\f6.txt
    
    %  13. - T Inizio Disservizio (TinitDiss_)
    %        \PoLLiMatlabFunction\f7.txt
    
    %  14. - T Disservizio (Tdiss_)
    %        \PoLLiMatlabFunction\f8.txt
    
    %  15. - Transport Delay (TrDe_).
    %  16. - Clock2 (ClockTwo_).
    %  17. -  Data Store Memory1(DSMone_), Data store name A.
        % 17.1 Data Store Read from A (dsrOne_), and 17.1.1          
        % 17.2 Data Store Write from A (dswOne_).
    
    %  18. - Inoperability Modulation (InoperabilityModulation_).
    %        \PoLLiMatlabFunction\f9.txt
    
    %  19. - Actual Demand (ActualDemand_).
    %        \PoLLiMatlabFunction\f10.txt
    
    %  20. - Logic Switch (LogicSwitch_).
    %        \PoLLiMatlabFunction\f11.txt
    
    %  21. - fIdiss (fIdiss_)
    %        \PoLLiMatlabFunction\f12.txt
    
    %  22. - I0 (I0_).
    
    %  23. - fIt (fIt_)
    %        \PoLLiMatlabFunction\f13.txt
    
    %  24. - IDnodo (IDnodo_).
    %  25. - Signal Standard Demand (StandardDemand_).
    %  26. - Transport Delay2 (TrDe2_).   
    %  27. - Disservice To Workspace (SaveDisservice_).
    %  28. - Inoperability To Workspace (SaveDisservice_).
    
    
    
    % Block 1.
    % Connection 1. -> 4.
    add_line(InputSystem,['carattNodo_',Node_Name,'/1'],['fFt_',Node_Name,'/1'],'autorouting','on');
    add_line(InputSystem,['carattNodo_',Node_Name,'/1'],['fIdiss_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 2.
    % Connection 2. -> 4.
    add_line(InputSystem,['carattTemporaliMinaccia_',Node_Name,'/1'],['fFt_',Node_Name,'/2'],'autorouting','on');
    % -------------------
    
    % Block 3.
    % Connection 3. -> 4.
    add_line(InputSystem,['ClockOne_',Node_Name,'/1'],['fFt_',Node_Name,'/4'],'autorouting','on');
    % -------------------
    
    % Block 4.
    % Connection 4. -> 8.
    add_line(InputSystem,['fFt_',Node_Name,'/1'],['IntegrityModulation_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 5.1.
    % Connection 5.1. -> 4.
    add_line(InputSystem,['dsrTwo_',Node_Name,'/1'],['fFt_',Node_Name,'/3'],'autorouting','on');
    % Connection 5.1. -> 8.
    add_line(InputSystem,['dsrTwo_',Node_Name,'/1'],['IntegrityModulation_',Node_Name,'/5'],'autorouting','on');
    % Connection 5.1. -> 7.
    add_line(InputSystem,['dsrTwo_',Node_Name,'/1'],['fFM_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 6.
    % Connection 6. -> 8.
    add_line(InputSystem,['F0_',Node_Name,'/1'],['IntegrityModulation_',Node_Name,'/2'],'autorouting','on');
    % -------------------
    
    % Block 7.
    % Connection 7. -> 8.
    add_line(InputSystem,['fFM_',Node_Name,'/1'],['IntegrityModulation_',Node_Name,'/3'],'autorouting','on');
    % -------------------
    
    % Block 8.
    % Connection 8. -> 9.
    add_line(InputSystem,['IntegrityModulation_',Node_Name,'/1'],['MaximumService_',Node_Name,'/2'],'autorouting','on');
    % Connection 8. -> 5.2
    add_line(InputSystem,['IntegrityModulation_',Node_Name,'/2'],['dswTwo_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 9.
    % Connection 9. -> 11.
    add_line(InputSystem,['MaximumService_',Node_Name,'/1'],['ActualService_',Node_Name,'/1'],'autorouting','on');
    % Connection 9. -> 20.
    add_line(InputSystem,['MaximumService_',Node_Name,'/1'],['LogicSwitch_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 10.
    % Connection 10. -> 9.
    add_line(InputSystem,['Cmax_',Node_Name,'/1'],['MaximumService_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 11.
    % Connection 11. -> 12.
    add_line(InputSystem,['ActualService_',Node_Name,'/1'],['Disservice_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 12.
    % Connection 12. -> 13.
    add_line(InputSystem,['Disservice_',Node_Name,'/1'],['TinitDiss_',Node_Name,'/2'],'autorouting','on');
    % Connection 12. -> 14.
    add_line(InputSystem,['Disservice_',Node_Name,'/1'],['Tdiss_',Node_Name,'/1'],'autorouting','on');
    % Connection 12. -> 15.
    add_line(InputSystem,['Disservice_',Node_Name,'/1'],['TrDeOne_',Node_Name,'/1'],'autorouting','on');
    %Connection 12. -> 26.
    add_line(InputSystem,['Disservice_',Node_Name,'/1'],['SaveDisservice_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 13.
    % Connection 13. -> 17.2
    add_line(InputSystem,['TinitDiss_',Node_Name,'/1'],['dswOne_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 14.
    % Connection 14. -> 26
    add_line(InputSystem,['Tdiss_',Node_Name,'/2'],['TrDeTwo_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 15.
    % Connection 15. -> 13
    add_line(InputSystem,['TrDeOne_',Node_Name,'/1'],['TinitDiss_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 16.
    % Connection 16. -> 13.
    add_line(InputSystem,['ClockTwo_',Node_Name,'/1'],['TinitDiss_',Node_Name,'/3'],'autorouting','on');
    % Connection 16. -> 14.
    add_line(InputSystem,['ClockTwo_',Node_Name,'/1'],['Tdiss_',Node_Name,'/2'],'autorouting','on');
    % -------------------
    
    % Block 17.1 and 17.1.1
    % Connection 17.1 -> 13.
    add_line(InputSystem,['dsrOne_',Node_Name,'/1'],['TinitDiss_',Node_Name,'/4'],'autorouting','on');
    % Connection 17.1.1 -> 14.
    add_line(InputSystem,['dsrOneDuplicate_',Node_Name,'/1'],['Tdiss_',Node_Name,'/3'],'autorouting','on');
    % -------------------
    
    % Block 18.
    % Connection 18. -> 9.
    add_line(InputSystem,['InoperabilityModulation_',Node_Name,'/1'],['MaximumService_',Node_Name,'/3'],'autorouting','on');
    % Connection 18. -> 28.
    add_line(InputSystem,['InoperabilityModulation_',Node_Name,'/1'],['SaveInoperability_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 19.
    % Connection 19. -> 11.
    add_line(InputSystem,['ActualDemand_',Node_Name,'/1'],['ActualService_',Node_Name,'/2'],'autorouting','on');
    % Connection 19. -> 12.
    add_line(InputSystem,['ActualDemand_',Node_Name,'/1'],['Disservice_',Node_Name,'/2'],'autorouting','on');
    % -------------------
    
    % Block 20.
    % Connection 20. -> 19.
    add_line(InputSystem,['LogicSwitch_',Node_Name,'/1'],['ActualDemand_',Node_Name,'/6'],'autorouting','on');
    % -------------------
    
    % Block 21.
    % Connection 21. -> 18.
    add_line(InputSystem,['fIdiss_',Node_Name,'/1'],['InoperabilityModulation_',Node_Name,'/1'],'autorouting','on');
    % -------------------
    
    % Block 22.
    % Connection 22. -> 18.
    add_line(InputSystem,['I0_',Node_Name,'/1'],['InoperabilityModulation_',Node_Name,'/2'],'autorouting','on');
    % -------------------
    
    % Block 23.
    % Connection 23. -> 18.
    add_line(InputSystem,['fIt_',Node_Name,'/1'],['InoperabilityModulation_',Node_Name,'/7'],'autorouting','on');
    % -------------------
    
    % Block 24.
    % Connection 24. -> 18.
    add_line(InputSystem,['IDnodo_',Node_Name,'/1'],['InoperabilityModulation_',Node_Name,'/4'],'autorouting','on');
    % Connection 24. -> 19.
    add_line(InputSystem,['IDnodo_',Node_Name,'/1'],['ActualDemand_',Node_Name,'/7'],'autorouting','on');
    % Connection 24. -> 23.
    add_line(InputSystem,['IDnodo_',Node_Name,'/1'],['fIt_',Node_Name,'/3'],'autorouting','on');
    % -------------------
    
    % Block 25.
    % Connection 25. -> 19.
    add_line(InputSystem,['StandardDemand_',Node_Name,'/1'],['ActualDemand_',Node_Name,'/1'],'autorouting','on');
    % Connection 24. -> 20.
    add_line(InputSystem,['StandardDemand_',Node_Name,'/1'],['LogicSwitch_',Node_Name,'/2'],'autorouting','on');
    % -------------------
    
    % Block 26.
    % Connection 26. -> 19.
    add_line(InputSystem,['TrDeTwo_',Node_Name,'/1'],['ActualDemand_',Node_Name,'/8'],'autorouting','on');
        
%end


% CREATION OF SUBSYSTEM FOR EACH NETWORK NODE
x = 130;
y = 50;
w = 200;
h = 210;
PoSu = [x y x+w y+h];

%Offset=0;

%for i = 1:NumberOfNodes
    
    % Create the subsystem for node 'i'.
    
    Node_Name=num2str(n);
    
    Sub_System_Elements={};
    NodeObjectHandle = [];
    
    Sub_System_Elements= find_system(InputSystem,'Regexp','on', 'SearchDepth', '1','Name',['\<*._',Node_Name,'\>']);
    NodeObjectHandle = cell2mat(get_param(Sub_System_Elements, 'handle'));
    
    Simulink.BlockDiagram.createSubSystem(NodeObjectHandle);
    
    % Only for visualization, will be changed.
    
    if n==1
    end
    
    if n==2
        x = 650;
        y = 50;
        PoSu = [x y x+w y+h];
    end
    
    if n>=3
        x = 450+Offset;
        y = 400+Offset;
        PoSu = [x y x+w y+h];
    end
    set_param([InputSystem '/Subsystem'],'Name',['NODE',Node_Name],'Position',PoSu);
    Offset=Offset+20;
    
   % Set the "Input Port" (12) name.
   % ---------------------------------------------------------------------------
    set_param([InputSystem '/','NODE',Node_Name,'/In1'],'ForegroundColor','red');
    set_param([InputSystem '/','NODE',Node_Name,'/In1'],'Name','Minaccia01');
    
    set_param([InputSystem '/','NODE',Node_Name,'/In2'],'ForegroundColor','red');
    set_param([InputSystem '/','NODE',Node_Name,'/In2'],'Name','Minaccia02');
    % ---------------------------------------------------------------------------
    
    set_param([InputSystem '/','NODE',Node_Name,'/In3'],'ForegroundColor','blu');
    set_param([InputSystem '/','NODE',Node_Name,'/In3'],'Name','DisservizioIN');
    
    set_param([InputSystem '/','NODE',Node_Name,'/In4'],'ForegroundColor','blu');
    set_param([InputSystem '/','NODE',Node_Name,'/In4'],'Name','DeltaDlogica');
    
    set_param([InputSystem '/','NODE',Node_Name,'/In5'],'ForegroundColor','red');
    set_param([InputSystem '/','NODE',Node_Name,'/In5'],'Name','CdT');
    
    set_param([InputSystem '/','NODE',Node_Name,'/In6'],'ForegroundColor','red');
    set_param([InputSystem '/','NODE',Node_Name,'/In6'],'Name','AdiacenzaFunzionale');
     
    % ---------------------------------------------------------------------------
    set_param([InputSystem '/','NODE',Node_Name,'/In7'],'ForegroundColor','blu');
    set_param([InputSystem '/','NODE',Node_Name,'/In7'],'Name','Tdisservizio01');
    
    set_param([InputSystem '/','NODE',Node_Name,'/In10'],'ForegroundColor','blu');
    set_param([InputSystem '/','NODE',Node_Name,'/In10'],'Name','Tdisservizio02');
    
    set_param([InputSystem '/','NODE',Node_Name,'/In11'],'ForegroundColor','blu');
    set_param([InputSystem '/','NODE',Node_Name,'/In11'],'Name','Tdisservizio03');
    % ---------------------------------------------------------------------------
    
    % ---------------------------------------------------------------------------
    set_param([InputSystem '/','NODE',Node_Name,'/In8'],'ForegroundColor','red');
    set_param([InputSystem '/','NODE',Node_Name,'/In8'],'Name','TdelayFunzionale01');
    
    set_param([InputSystem '/','NODE',Node_Name,'/In12'],'ForegroundColor','red');
    set_param([InputSystem '/','NODE',Node_Name,'/In12'],'Name','TdelayFunzionale02');
    % ---------------------------------------------------------------------------
    
    set_param([InputSystem '/','NODE',Node_Name,'/In9'],'ForegroundColor','red');
    set_param([InputSystem '/','NODE',Node_Name,'/In9'],'Name','TdelayLogico');
    
    

    % Set the "Output Port" 3) name.
    set_param([InputSystem '/','NODE',Node_Name,'/Out1'],'ForegroundColor','blu');
    set_param([InputSystem '/','NODE',Node_Name,'/Out1'],'Name','TdisservizioOUT');
    
    set_param([InputSystem '/','NODE',Node_Name,'/Out2'],'ForegroundColor','blu')
    set_param([InputSystem '/','NODE',Node_Name,'/Out2'],'Name','DisservizioOUT');
    
    set_param([InputSystem '/','NODE',Node_Name,'/Out3'],'ForegroundColor','blu')
    set_param([InputSystem '/','NODE',Node_Name,'/Out3'],'Name','deltaDlogicaMaxNode');
   
end



% NETWORK CONNECTION (CONNECTION BETWEEN NODES)

% Threat definition.

for i = 1:NumberOfNodes

    Node_Name=num2str(i);
    
    switch i
        case 1

            x = 10;
            y = 10;
            w = 70;
            h = 40;
            PoBo = [x y x+w y+h];

            SDtime =  TimeOfThreat;
            SDdata = ValueOfThreat;
            signalbuilder([InputSystem,'/M_',Node_Name],'create',SDtime,SDdata,'SDsignal');
            set_param([InputSystem,'/M_',Node_Name],'Position',PoBo);
            hilite_system([InputSystem,'/M_',Node_Name], 'red');
            
            add_line(InputSystem,['M_',Node_Name,'/1'],['NODE', Node_Name,'/1'],'autorouting','on');
            add_line(InputSystem,['M_',Node_Name,'/1'],['NODE', Node_Name,'/2'],'autorouting','on');
            close hidden
        otherwise

            x = 350;
            y = 400;
            w = 20;
            h = 20;
            PoBo = [x y x+w y+h];

            % Block Construction.
            add_block('built-in/Constant',[InputSystem '/M_',Node_Name],'MAKENAMEUNIQUE','on','Position',PoBo);
            % Block Initialization.
            set_param([InputSystem '/M_',Node_Name],'Value','0');
            hilite_system([InputSystem,'/M_',Node_Name], 'red');
            
            add_line(InputSystem,['M_',Node_Name,'/1'],['NODE', Node_Name,'/1'],'autorouting','on');
            add_line(InputSystem,['M_',Node_Name,'/1'],['NODE', Node_Name,'/2'],'autorouting','on');
            close hidden
    end
end


% Matrix for the network interconnectio and interdependency.

% CdT (coefficient of logical transfer) Matrix definition.
x = 10;
y = 300;
w = 40;
h = 40;
PoBo = [x y x+w y+h];
add_block('built-in/Constant',[InputSystem '/CdTMatrix'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem '/CdTMatrix'],'Value',CdTvalue);
hilite_system([InputSystem,'/CdTMatrix'], 'red');


% Functional adjacency Matrix definition
x = 10;
y = 370;
w = 40;
h = 40;
PoBo = [x y x+w y+h];
add_block('built-in/Constant',[InputSystem '/Adiacenzafunzionale'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem '/Adiacenzafunzionale'],'Value',AFvalue);
hilite_system([InputSystem,'/Adiacenzafunzionale'], 'red');


% Logical time delay Matrix definition
x = 10;
y = 440;
w = 40;
h = 40;
PoBo = [x y x+w y+h];
add_block('built-in/Constant',[InputSystem '/TritardoLogica'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem '/TritardoLogica'],'Value',TLvalue);
hilite_system([InputSystem,'/TritardoLogica'], 'red');

% Functional time delay Matrix definition
x = 10;
y = 510;
w = 40;
h = 40;
PoBo = [x y x+w y+h];
add_block('built-in/Constant',[InputSystem '/TritardoFunzionale'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem '/TritardoFunzionale'],'Value',TFvalue);
hilite_system([InputSystem,'/TritardoFunzionale'], 'red');



% Network Node Output Management.

MuxInput=ones(1,NumberOfNodes)*(-1);
 
% Disservice Syntesis + Delay.
% Disservice Syntesis
x = 500;
y = 250;
w = 30;
h = 35;
PoBo = [x y x+w y+h];

add_block('built-in/mux',[InputSystem '/CollectDisservice'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem,'/CollectDisservice'],'Inputs',['[',num2str(MuxInput),']']);
hilite_system([InputSystem,'/CollectDisservice'], 'blu');


% Delay.
x = 570;
y = 250;
w = 25;
h = 35;
PoBo = [x y x+w y+h];

add_block('built-in/TransportDelay',[InputSystem '/TrDe1'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem '/TrDe1'],'DelayTime',num2str(Step));
add_line(InputSystem,'CollectDisservice/1','TrDe1/1','autorouting','on');
% -------------------------------------

% TimeDisservice Syntesis + Delay.

% TimeDisservice Syntesis 
x = 500;
y = 340;
w = 30;
h = 35;
PoBo = [x y x+w y+h];

add_block('built-in/mux',[InputSystem '/CollectTimeDisservice'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem,'/CollectTimeDisservice'],'Inputs',['[',num2str(MuxInput),']']);
hilite_system([InputSystem,'/CollectTimeDisservice'], 'blu');

% Delay.
x = 570;
y = 340;
w = 25;
h = 35;
PoBo = [x y x+w y+h];

add_block('built-in/TransportDelay',[InputSystem '/TrDe2'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem '/TrDe2'],'DelayTime',num2str(Step));
add_line(InputSystem,'CollectTimeDisservice/1','TrDe2/1','autorouting','on');
% -------------------------------------

% Switch Domanda Logica Syntesis + Delay.
% Switch Domanda Logica Syntesis.
x = 660;
y = 300;
w = 30;
h = 35;
PoBo = [x y x+w y+h];

add_block('built-in/mux',[InputSystem '/CollectDeltaDLogicalMax'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem,'/CollectDeltaDLogicalMax'],'Inputs',['[',num2str(MuxInput),']']);
hilite_system([InputSystem,'/CollectDeltaDLogicalMax'], 'blu');

% Delay.
x = 750;
y = 300;
w = 25;
h = 35;
PoBo = [x y x+w y+h];

add_block('built-in/TransportDelay',[InputSystem '/TrDe3'],'MAKENAMEUNIQUE','on','Position',PoBo);
set_param([InputSystem '/TrDe3'],'DelayTime',num2str(Step));
add_line(InputSystem,'CollectDeltaDLogicalMax/1','TrDe3/1','autorouting','on');
% -------------------------------------


% Build the final network interconnections.
for i = 1:NumberOfNodes
    Node_Name=num2str(i);
    
    % From network to nodes.
    add_line(InputSystem,'CdTMatrix/1',['NODE', Node_Name,'/5'],'autorouting','on');
    add_line(InputSystem,'Adiacenzafunzionale/1',['NODE', Node_Name,'/6'],'autorouting','on');
    add_line(InputSystem,'TritardoLogica/1',['NODE', Node_Name,'/9'],'autorouting','on');
    add_line(InputSystem,'TritardoFunzionale/1',['NODE', Node_Name,'/8'],'autorouting','on');
    add_line(InputSystem,'TritardoFunzionale/1',['NODE', Node_Name,'/12'],'autorouting','on');
    
    add_line(InputSystem,'TrDe1/1',['NODE', Node_Name,'/3'],'autorouting','on');
    add_line(InputSystem,'TrDe2/1',['NODE', Node_Name,'/7'],'autorouting','on');
    add_line(InputSystem,'TrDe2/1',['NODE', Node_Name,'/10'],'autorouting','on');
    add_line(InputSystem,'TrDe2/1',['NODE', Node_Name,'/11'],'autorouting','on');
    add_line(InputSystem,'TrDe3/1',['NODE', Node_Name,'/4'],'autorouting','on');
     
    % From nodes to network.
    add_line(InputSystem,['NODE', Node_Name,'/1'],['CollectTimeDisservice/',Node_Name],'autorouting','on');
    add_line(InputSystem,['NODE', Node_Name,'/2'],['CollectDisservice/',Node_Name],'autorouting','on');
    add_line(InputSystem,['NODE', Node_Name,'/3'],['CollectDeltaDLogicalMax/',Node_Name],'autorouting','on');
    
    
end

% Simulation

% get simulation parameters
% configSet = getActiveConfigSet('PoliFirstPrototipe')
% configSetNames = get_param(configSet, 'ObjectParameters') 


NeBuOut=1;


