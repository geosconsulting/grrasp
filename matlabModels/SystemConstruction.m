function [NePa] = SystemConstruction(Links,AffectedNodeName)

% Function description:

% This function ....

% INPUT
% ...

% OUTPUT
% NePa      Struct: cointain some network paremeter usefull to simulate the
%           network.

% NePa field are:
% 1. Node.
% 2. Adjacency_Matrix.
% 3. AffectedNode


% NOTES
% The words 'System' and 'Network' are used here like synonymous ...

% Bibliographical references:

% [1]   Georgios Giannopoulus et al. "A combined systems engineering - economic
%       model for the assessment of critical infrastructure disruption.


% VARIABLES INITIALIZATION

% Input ...
% Links.
% AffectedNodeName.

% Nodes ...
Node_List=[];
Node_Name='';

NumberOfNodes=[];

% Edges ...
Start_Node_List=[];
Start_Node_Name='';

End_Node_List=[];
End_Node_Name='';

NumberOfEdges=[];


% Adjacency Matrix ...
Adjacency_Matrix=[];


% The information position (logical) in the input data base file ...
EdgeIdPosition=1;
StartNodePosition=2;
EndNodePosition=3;


% Simulink Block Position and Size ...
x = -1;
y = -1;
w = -1;
h = -1;

% % VARIBLE FOR THE AFFECTED NODE
% AffectedNodeName = '';

% Visualize the Network Topologyv(0 or 1).
ViNeTo=1;


SystemSEnodes=Links(:,StartNodePosition:EndNodePosition);


% NODES PROCESSING ...
% Obtain from the network edge ... the list of network nodes (connected) ...

RelativeIndex=1;
Node_List(RelativeIndex)=SystemSEnodes(1,1);
RelativeIndex=RelativeIndex+1;

for i=1:2
    for j=1:length(SystemSEnodes);
        NoIdTemp=SystemSEnodes(j,i);
        if isempty(find(NoIdTemp==Node_List))
            Node_List(RelativeIndex)=SystemSEnodes(j,i);
            RelativeIndex=RelativeIndex+1;
        end
    end
end

Node_List=Node_List';
% Sort the node list.
Node_List=sort(Node_List);

Node_List=num2str(Node_List);
NumberOfNodes=length(Node_List);


% Remouve space from input ... and build the 'NODEnn' list ...
for i=1:NumberOfNodes
    for j=1:length(Node_List(i,:))
        if isspace(Node_List(i,j))
            Node_List(i,j)='0';
        end
    end
    Node_Name(i,:) = ['NODE',Node_List(i,:)];
end


% EDGES PROCESSING ...
Start_Node_List=num2str(Links(:,StartNodePosition));
End_Node_List= num2str(Links(:,EndNodePosition));

NumberOfEdges=length(Start_Node_List); % Or NumberOfEdges=length(End_Node_List);

% Remouve space from input ... and build the 'NODEnn' list ...
for i=1:NumberOfEdges
    for j=1:length(Start_Node_List(i,:))
        if isspace(Start_Node_List(i,j))
            Start_Node_List(i,j)='0';
        end
    end
    Start_Node_Name(i,:) = ['NODE',Start_Node_List(i,:)];
end

for i=1:NumberOfEdges
    for j=1:length(End_Node_List(i,:))
        if isspace(End_Node_List(i,j))
            End_Node_List(i,j)='0';
        end
    end
    End_Node_Name(i,:) = ['NODE',End_Node_List(i,:)];
end


% ADJACENCY MATRIX COMPUTATION ...

System_Temp=Links(:,StartNodePosition:EndNodePosition);
System_Temp(isnan(System_Temp))=0;

Adjacency_Matrix=zeros(NumberOfNodes,NumberOfNodes);

for i=1:NumberOfEdges
    if System_Temp(i,1)==0 || System_Temp(i,2)==0
        continue;
    else
        Adjacency_Matrix(System_Temp(i,1),System_Temp(i,2))=1;
    end
end

% % THE AFFECTED NODE SELECTION
% 
% global Node_List_Temp;
% Node_List_Temp=Node_List;
% 
% global SelectedNode;
% SelectedNode='';
% 
% uiwait(AffectedNodeLabel);
% 
% AffectedNodeName=SelectedNode;


% Visualize Network Topology.
if ViNeTo
    addpath('Plot Graph\graphViz4Matlab');
    % Plot network ...
    NodeLabelString={};
    
    for i=1:NumberOfNodes
        if strcmp(Node_List(i,:),AffectedNodeName)
            NodeLabelString{i}='Collapsed Node';
        else
            NodeLabelString{i}=Node_List(i,:);
        end
    end
    
    NodeColors={};
    for i=1:NumberOfNodes
        if strcmp(Node_List(i,:),AffectedNodeName)
            NodeColors=[NodeColors 'r'];
        else
            NodeColors=[NodeColors 'w'];
        end
    end
    
    Gh=graphViz4Matlab('-adjMat',Adjacency_Matrix,'-nodeLabels',NodeLabelString,'-nodeColors',NodeColors);
    
    rmpath('Plot Graph\graphViz4Matlab');
end

% The NePa Structure
NePa.Node=Node_Name;
NePa.Adjacency_Matrix=Adjacency_Matrix;
NePa.AffectedNode=AffectedNodeName;


% Open simulink
simulink;

% Define the name of the model.
InputSystem='Lombardy';

disp(' ');
disp(['Default System Name is: ', InputSystem]);


% Create the new simulink model.
new_system(InputSystem);

% Open the simulink model (now is empty).
open_system(InputSystem);

% BUILD THE SIMULINK MODULES THAT REPRESENT THE NODES OF THE SYSTEM.
% We assume a standard behaviour for each nodes [1].


% This portion of code, fix the beahaviour of each node in a input network.
% See Figure 3 a), in [1].

% keyboard

for j = 1:NumberOfNodes
    
    % BUILT THE NODES BLOCKS ... in accord with Figure 3 a) and b) in [1].
    
    % Leggend:
    
    %   1. -    ProductIn_
    %   2. -    Set-off1_
    %   3. -    Sum1_
    %   4. -    Gain1_
    %   5. -    Gain2_
    %   6. -    Sum2_
    %   7. -    Product1_
    %   8. -    Sum3_
    %   9. -    Int1_
    %   10. -   EMF_
    %   11. -   ServiceThr1_
    %   12. -   Out1_
    %   13. -   WorkSpaceOut_
    %   14. -   WorkSpaceState_
    
    % 1.
    % Copies the block 'built-in/Product' in InputSystem/Productn_NODEn ...
    
    % Specify the block position and size.
    x = 30;
    y = 50;
    w = 30;
    h = 30;
    PoBo1 = [x y x+w y+h];
    
    add_block('built-in/Product',[InputSystem '/ProductIn_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo1 );
    % Fix the Output Data Type for the above block ...
    set_param([InputSystem '/ProductIn_',Node_Name(j,:)],'OutDataTypeStr','Inherit: Inherit via internal rule');
    
    
    % 2.
    % Specify the block position and size.
    x = 110;
    y = 150;
    w = 30;
    h = 30;
    PoBo2 = [x y x+w y+h];
    
    add_block('built-in/Constant',[InputSystem '/Set-off1_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo2);
    % The value constant in output is set to be 1.
    set_param([InputSystem '/Set-off1_',Node_Name(j,:)],'Value','1');
    
    
    % 3.
    % From this poit we omit the comments similar at the comment in points
    % 1. and 2. ...
    x = 150;
    y = 50;
    w = 10;
    h = 10;
    PoBo3 = [x y x+w y+h];
    
    add_block('built-in/Sum',[InputSystem '/Sum1_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position', PoBo3);
    set_param([InputSystem '/Sum1_',Node_Name(j,:)],'Inputs','|-+');
    set_param([InputSystem '/Sum1_',Node_Name(j,:)],'IconShape','round');
    set_param([InputSystem '/Sum1_',Node_Name(j,:)],'OutDataTypeStr','Inherit: Inherit via internal rule');
    
    
    % 4.
    x = 250;
    y = 50;
    w = 15;
    h = 15;
    PoBo4 = [x y x+w y+h];
    
    add_block('built-in/Gain',[InputSystem '/Gain1_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo4);
    set_param([InputSystem '/Gain1_',Node_Name(j,:)],'Gain',['-f_',Node_Name(j,:)]);
    
    % 5.
    x = 150;
    y = 300;
    w = 15;
    h = 15;
    PoBo5 = [x y x+w y+h];
    
    add_block('built-in/Gain',[InputSystem '/Gain2_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo5);
    set_param([InputSystem '/Gain2_',Node_Name(j,:)],'Gain',['-r_',Node_Name(j,:)]);
    
    % 6.
    x = 330;
    y = 50;
    w = 10;
    h = 10;
    PoBo6 = [x y x+w y+h];
    
    add_block('built-in/Sum',[InputSystem '/Sum2_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position', PoBo6);
    set_param([InputSystem '/Sum2_',Node_Name(j,:)],'Inputs','|++');
    set_param([InputSystem '/Sum2_',Node_Name(j,:)],'IconShape','round');
    set_param([InputSystem '/Sum2_',Node_Name(j,:)],'OutDataTypeStr','Inherit: Inherit via internal rule');
    
    % 7.
    x = 450;
    y = 50;
    w = 30;
    h = 30;
    PoBo7 = [x y x+w y+h];
    
    add_block('built-in/Product',[InputSystem '/Product1_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo7);
    set_param([InputSystem '/Product1_',Node_Name(j,:)],'OutDataTypeStr','Inherit: Inherit via internal rule');
    
    % 8.
    x = 550;
    y = 50;
    w = 10;
    h = 10;
    PoBo8 = [x y x+w y+h];
    
    add_block('built-in/Sum',[InputSystem '/Sum3_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo8);
    set_param([InputSystem '/Sum3_',Node_Name(j,:)],'Inputs','|+-');
    set_param([InputSystem '/Sum3_',Node_Name(j,:)],'IconShape','round');
    set_param([InputSystem '/Sum3_',Node_Name(j,:)],'OutDataTypeStr','Inherit: Inherit via internal rule');
    
    % 9.
    x = 650;
    y = 50;
    w = 30;
    h = 30;
    PoBo9 = [x y x+w y+h];
    
    add_block('built-in/Integrator',[InputSystem '/Int1_',Node_Name(j,:)], 'MAKENAMEUNIQUE','on','Position',PoBo9);
    set_param([InputSystem '/Int1_',Node_Name(j,:)],'InitialCondition','1');
    
    
    %10.
    x = 550;
    y = 350;
    w = 50;
    h = 50;
    PoBo10 = [x y x+w y+h];
    
    add_block('Simulink/User-Defined Functions/MATLAB Function',[InputSystem '/EMF_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo10);
    S = sfroot;
    B = S.find('Name',['EMF_',Node_Name(j,:)],'-isa','Stateflow.EMChart');
    Step_function='function y = step(u,  u0)\n if u > u0 \n y=1; \n else \n y=0; \n end';
    B.Script = sprintf(Step_function);
    
    % 11.
    x = 500;
    y = 450;
    w = 30;
    h = 30;
    PoBo11 = [x y x+w y+h];
    
    add_block('built-in/Constant',[InputSystem '/ServiceThr1_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo11);
    set_param([InputSystem '/ServiceThr1_',Node_Name(j,:)],'Value',['th_',Node_Name(j,:)]);
    
    % 12.
    x = 650;
    y = 350;
    w = 10;
    h = 10;
    PoBo12 = [x y x+w y+h];
    add_block('built-in/Outport',[InputSystem '/Out1_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo12);
    
    % 13.
    x = 650;
    y = 250;
    w = 65;
    h = 20;
    PoBo13 = [x y x+w y+h];
    add_block('built-in/To Workspace',[InputSystem '/WorkSpaceOut_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo13);
    set_param([InputSystem '/WorkSpaceOut_',Node_Name(j,:)],'VariableName',['Out_',Node_Name(j,:)]);
    
    
    % 14.
    x = 750;
    y = 120;
    w = 75;
    h = 20;
    PoBo14 = [x y x+w y+h];
    add_block('built-in/To Workspace',[InputSystem '/WorkSpaceState_',Node_Name(j,:)],'MAKENAMEUNIQUE','on','Position',PoBo14);
    set_param([InputSystem '/WorkSpaceState_',Node_Name(j,:)],'VariableName',['State_',Node_Name(j,:)]);
    
    
    
    
    % CONNECT THE BLOCKS INSIDE THE NODES ... in accord with Figure 3 a) and
    % b) in [1].
    
    % Leggend:
    
    %   1. -    ProductIn_
    %   2. -    Set-off1_
    %   3. -    Sum1_
    %   4. -    Gain1_
    %   5. -    Gain2_
    %   6. -    Sum2_
    %   7. -    Product1_
    %   8. -    Sum3_
    %   9. -    Int1_
    %   10. -   EMF_
    %   11. -   ServiceThr1_
    %   12. -   Out1_
    %   13. -   WorkSpaceOut_
    %   14. -   WorkSpaceState_
    

    % Connection 1. -> 3.
    add_line(InputSystem,['ProductIn_',Node_Name(j,:),'/1'],['Sum1_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 2. -> 3.
    add_line(InputSystem,['Set-off1_',Node_Name(j,:),'/1'],['Sum1_',Node_Name(j,:),'/2'],'autorouting','on');
    
    % Connection 3. -> 4.
    add_line(InputSystem,['Sum1_',Node_Name(j,:),'/1'],['Gain1_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 1. -> 5.
    add_line(InputSystem,['ProductIn_',Node_Name(j,:),'/1'],['Gain2_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 1. -> 6.
    add_line(InputSystem,['Gain1_',Node_Name(j,:),'/1'],['Sum2_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 5. -> 6.
    add_line(InputSystem,['Gain2_',Node_Name(j,:),'/1'],['Sum2_',Node_Name(j,:),'/2'],'autorouting','on');
    
    % Connection 6. -> 7.
    add_line(InputSystem,['Sum2_',Node_Name(j,:),'/1'],['Product1_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 7. -> 8.
    add_line(InputSystem,['Product1_',Node_Name(j,:),'/1'],['Sum3_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 5. -> 8.
    add_line(InputSystem,['Gain2_',Node_Name(j,:),'/1'],['Sum3_',Node_Name(j,:),'/2'],'autorouting','on');
    
    % Connection 9. -> 7.
    add_line(InputSystem,['Int1_',Node_Name(j,:),'/1'],['Product1_',Node_Name(j,:),'/2'],'autorouting','on');
    
    % Connection 8. -> 9.
    add_line(InputSystem,['Sum3_',Node_Name(j,:),'/1'],['Int1_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 9. -> 10.
    add_line(InputSystem,['Int1_',Node_Name(j,:),'/1'],['EMF_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 11. -> 10.
    add_line(InputSystem,['ServiceThr1_',Node_Name(j,:),'/1'],['EMF_',Node_Name(j,:),'/2'],'autorouting','on');
    
    % Connection 10. -> 11.
    add_line(InputSystem,['EMF_',Node_Name(j,:),'/1'],['Out1_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 10. -> 13.
    add_line(InputSystem,['EMF_',Node_Name(j,:),'/1'],['WorkSpaceOut_',Node_Name(j,:),'/1'],'autorouting','on');
    
    % Connection 10. -> 14.
    add_line(InputSystem,['Int1_',Node_Name(j,:),'/1'],['WorkSpaceState_',Node_Name(j,:),'/1'],'autorouting','on');
 
end

% Creation of subsystems for each NODE inside the network.
x = 50;
y = 50;
w = 30;
h = 30;
PoSu = [x y x+w y+h];

for i = 1:NumberOfNodes
    
    rIndex=1;
    Sub_System_ElementsTemp={};
    Sub_System_Elements={};
    NodeObjectHandle = [];
    
    Sub_System_ElementsTemp= find_system(InputSystem,'Regexp','on','Name',['NODE',Node_List(i,:)]);
    
    % Put the 'ProductIn_' block out the subsystem.
    for k=1:length(Sub_System_ElementsTemp)
        if isempty(~(strfind(Sub_System_ElementsTemp{k},'ProductIn_')))
            Sub_System_Elements{rIndex}=Sub_System_ElementsTemp{k};
            rIndex=rIndex+1;
        end
    end
    Sub_System_Elements=Sub_System_Elements';
    
    NodeObjectHandle = cell2mat(get_param(Sub_System_Elements, 'handle'));
    Simulink.BlockDiagram.createSubSystem(NodeObjectHandle);
    
    set_param([InputSystem '/ProductIn_',Node_Name(i,:)],'Position',PoSu);
    
    x=x+250;
    w = 80;
    h = 30;
    PoSu = [x y x+w y+h];
    set_param([InputSystem '/Subsystem'],'Name',['NODE',Node_List(i,:)],'Position',PoSu);
    
    x=x+400;
    w = 15;
    h = 15;
    PoSu = [x y x+w y+h];
    set_param ([InputSystem '/Out1_',Node_Name(i,:)],'Position',PoSu);
    
    x=50;
    y=y+50;
    w = 30;
    h = 30;
    PoSu = [x y x+w y+h];
    
end


% Connection of the above network nodes according to the adjacency matrix (the
% network topology).
% The affected node is not connected, it is replaced with a specific the model.

% Define the numbers of input for each node in a network.
for k = 1:NumberOfNodes
    NumberOfInput = sum(Adjacency_Matrix(:,k));
    if NumberOfInput ~= 0
        set_param([InputSystem '/ProductIn_',Node_Name(k,:)],'Inputs',num2str(NumberOfInput));
    else
        set_param([InputSystem '/ProductIn_',Node_Name(k,:)],'Inputs','1');
        
        % Add input constant block for the head nodes in a network.
        x=50;
        y=10;
        w = 20;
        h = 20;
        LeHiCoPo = [x y x+w y+h];
        
        add_block('built-in/Constant',[InputSystem '/External_Input_',Node_Name(k,:)],'MAKENAMEUNIQUE','on','Position',LeHiCoPo)
        set_param([InputSystem '/External_Input_',Node_Name(k,:)],'Value','1');
        add_line(InputSystem,['External_Input_',Node_Name(k,:),'/1'],['ProductIn_',Node_Name(k,:),'/1'],'autorouting','on');
    end
end


% Build the simulink model for the affected node (s).

% Create the blocks ...
x = 900;
y = 300;
w = 60;
h = 60;
PoPuGE = [x y x+w y+h];

add_block('built-in/DiscretePulseGenerator',[InputSystem '/Pulse Generator_NODE',AffectedNodeName],'MAKENAMEUNIQUE','on','Position',PoPuGE);
set_param([InputSystem '/Pulse Generator_NODE',AffectedNodeName],'PulseType','Time based');
set_param([InputSystem '/Pulse Generator_NODE',AffectedNodeName],'PulseWidth','60');
set_param([InputSystem '/Pulse Generator_NODE',AffectedNodeName],'Amplitude','1');
set_param([InputSystem '/Pulse Generator_NODE',AffectedNodeName],'Period','1');
set_param([InputSystem '/Pulse Generator_NODE',AffectedNodeName],'PhaseDelay','0.4');

% Create a sub system for the Affected node model.
Simulink.BlockDiagram.createSubSystem(get_param([InputSystem '/Pulse Generator_NODE',AffectedNodeName], 'handle'));
set_param([InputSystem '/Subsystem'],'Name','AffectedNodeSubSystem');

hilite_system([InputSystem,'/AffectedNodeSubSystem'],'blue');
set_param([InputSystem,'/AffectedNodeSubSystem'],'ForegroundColor','blue');

hilite_system([InputSystem,'/NODE', AffectedNodeName],'red');
set_param([InputSystem,'/NODE', AffectedNodeName],'ForegroundColor','red');
set_param([InputSystem '/ProductIn_NODE',AffectedNodeName],'ForegroundColor','red');


% Memorize the progressive port number on end node.
NodePortNumber=zeros(1,NumberOfNodes);

% Connection ...
for i =1:NumberOfNodes      % Start node.
    for j =1:NumberOfNodes  % End node.
        % No input for the affected node ...
        if (j==str2num(AffectedNodeName))
            continue;
        end
        if Adjacency_Matrix(i,j) ~= 0
            if (i==str2num(AffectedNodeName))
                NodePortNumber(j) = NodePortNumber(j) + 1;
                add_line(InputSystem,['AffectedNodeSubSystem/1'],['ProductIn_',Node_Name(j,:),'/',num2str(NodePortNumber(j))],'autorouting','on');
            else
                NodePortNumber(j) = NodePortNumber(j) + 1;
                add_line(InputSystem,[Node_Name(i,:),'/1'],['ProductIn_',Node_Name(j,:),'/',num2str(NodePortNumber(j))],'autorouting','on');
            end
        end
    end
end

% Simulation Time ...
set_param(InputSystem, 'StopTime', '1');

% Rename the existent model of the node.
set_param([InputSystem '/NODE',AffectedNodeName],'Name',['NODEaff']);


cd ('..');
cd('_FILES');
save_system(InputSystem);
delete('AffectedNode.mat');
save('AffectedNode.mat', 'AffectedNodeName');
close_system(InputSystem);
cd ('..');
cd ('matlabModels');


if exist('Gh')
    close(Gh.fig);
    clear Gh;
end

return



