function [disservice] = MetaNet(NumberOfNodes)

tic
% Simulation Time
Tsim=24;
PaNe.Tsim=Tsim;

% Simulation step size, used also to define Signal Delay.
Step=rand(1)*10^-1;
PaNe.Step=Step;

% PaNe is the struct contained the NetworkBuilder Parameters.
PaNe.NumberOfNodes=NumberOfNodes;

% ID nodes.
% for i=1:PaNe.NumberOfNodes
%     ID(i)=i;
%     i=i+1;
% end
% PaNe.ID=ID;

% ID infrastructure Type (for examples below 7 type)
% IDtype=randi(7,1,PaNe.NumberOfNodes);
% PaNe.IDtype=IDtype;

% Nodes Capacity.
Capacity=ceil(rand(1,PaNe.NumberOfNodes)*150);
PaNe.Capacity=Capacity;

% Standard Demand of Nodes
MinimalDemand=0;
% It is possible to change the step sampling.
% NumberOfStep=ceil(Tsim/Step);
NumberOfStep=ceil(Tsim*2)+1;
Dstd=zeros(NumberOfStep,PaNe.NumberOfNodes);
TimeOfDstd=0:(Tsim/(Tsim*2)):Tsim;
for i=1:NumberOfStep
    Dstd(i,:) = Capacity + (MinimalDemand-Capacity).*rand(1,PaNe.NumberOfNodes);
end
PaNe.Dstd=Dstd;
PaNe.TimeOfDstd=TimeOfDstd;

% Nodes Behaviour.
% At the moment, the node Behaviour is fixed by 5 parameters.
LeTiBe=5;

% Parameter 1:  Buffer Time.
% Parameter 2:  Propagation Time.
% Parameter 3:  Organizational Time.
% Parameter 4:  Recovery Time.
% Parameter 5:  Maximun Disservice Intensity Propagation.

NodeTiBe=zeros(PaNe.NumberOfNodes,LeTiBe-1);
for i=1:PaNe.NumberOfNodes
    NodeTiBe(i,:)=rand(1,LeTiBe-1)*24; % Può non essere su base 24hour.
    NodeTiBe(i,:)=sort(NodeTiBe(i,:));
end
NodeParam=rand(PaNe.NumberOfNodes,1);
NodeBe=[NodeTiBe,NodeParam];
PaNe.NodeBe=NodeBe;

% Initial Nodes Functional Integrity.
F0=ones(1,PaNe.NumberOfNodes);
PaNe.F0=F0;

% Initial Nodes Functional Inoperability.
I0=zeros(1,PaNe.NumberOfNodes);
PaNe.I0=I0;

% CdT (Coefficient of Logical Transfer) Matrix definition.
RowI='';
CdTvTemp=rand(PaNe.NumberOfNodes);
CdTvTemp=CdTvTemp.*(1-eye(PaNe.NumberOfNodes));
CdTvalue='[';
for i=1:PaNe.NumberOfNodes
    RowI=CdTvTemp(i,:);
    CdTvalue=[CdTvalue num2str(RowI) ';'];
end
CdTvalue(end)=']';
PaNe.CdTvalue=CdTvalue;

% Functional Adjacency Matrix
RowI='';
AFvalueTemp=round(rand(PaNe.NumberOfNodes));
AFvalueTemp=AFvalueTemp.*(1-eye(PaNe.NumberOfNodes));
AFvalue='[';
for i=1:PaNe.NumberOfNodes
    RowI=AFvalueTemp(i,:);
    AFvalue=[AFvalue num2str(RowI) ';'];
end
AFvalue(end)=']';
PaNe.AFvalue=AFvalue;

% Logical time delay Matrix definition
RowI='';
TLvalueTemp=rand(PaNe.NumberOfNodes);
TLvalueTemp=TLvalueTemp.*(1-eye(PaNe.NumberOfNodes));
TLvalue='[';
for i=1:PaNe.NumberOfNodes
    RowI=TLvalueTemp(i,:);
    TLvalue=[TLvalue num2str(RowI) ';'];
end
TLvalue(end)=']';
PaNe.TLvalue=TLvalue;

% Functional time delay Matrix definition
RowI='';
TFvalueTemp=rand(PaNe.NumberOfNodes);
TFvalueTemp=TFvalueTemp.*(1-eye(PaNe.NumberOfNodes));
TFvalue='[';
for i=1:PaNe.NumberOfNodes
    RowI=TFvalueTemp(i,:);
    TFvalue=[TFvalue num2str(RowI) ';'];
end
TFvalue(end)=']';
PaNe.TFvalue=TFvalue;

% Threat definition.
TimeOfThreat=[0 1 1 4 4 8 8 10 10 24];
ValueOfThreat=[0 0 1 1 0 0 0.5 0.5 0 0];
ChangeOfThreat=[ 1 4 8 10]; % Time in which start and stop the threat. this is for the multiple threat in time

PaNe.TimeOfThreat=TimeOfThreat;
PaNe.ValueOfThreat=ValueOfThreat;
PaNe.ChangeOfThreat=ChangeOfThreat;

CompuState=NetworkBuilder(PaNe);

% disp(CompuState);
tic
if CompuState==1
    save_system('PoliFirstPrototipe')
%     simulation(Tsim,Step);
    Network_Simulation=sim('PoLiFirstPrototipe','Stop time',num2str(Tsim),'Max step size',num2str(Step));
    for i=1:PaNe.NumberOfNodes
        disservice(i,:)=Network_Simulation.get(['Disservice_',num2str(i)]);
    end
else
    disp('Some errors occours during the network construction!!!');
end

NumOfSubPlot=ceil(NumberOfNodes/2);
iR=1;

NumOfPlot=size(disservice);

for i=1:NumOfPlot(1)
    
    subplot(NumOfSubPlot,2,iR);
    p=plot(disservice(i,:));
    iR=iR+1;
    
end

 text(3,3,'X is the time and Y is the disservice');
 close_system('PoliFirstPrototipe')


toc


end

