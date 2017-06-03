function [] = mainSissy(AffectedNodeName)
% To invoke IO2MongolfierAnal using Data Base connetionn.
% ...

% DATA INPUT ....

ConnDB=DataBaseConnection;

[Links]=DataRetreivalSissy(ConnDB);



if AffectedNodeName<10
    AffectedNodeName=num2str(AffectedNodeName);
    AffectedNodeName=['0' AffectedNodeName];
else  
    AffectedNodeName=num2str(AffectedNodeName);
end


SystemConstruction(Links,AffectedNodeName);

SystemSimulation();

end

