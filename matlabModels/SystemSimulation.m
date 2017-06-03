function [Output] = SystemSimulation()

% Function description:

% This function ....

% INPUT
% ...

% OUTPUT
% ...

Output=[];

% NOTES
% ...

% Bibliographical references:

% [1]   Georgios Giannopoulus et al. "A combined systems engineering - economic
%       model for the assessment of critical infrastructure disruption.



% Some input parameter required for performing the Simulink simulation are [1]:

% The failure rate of a node i, fi
% The recovery rate of a node i, ri
% The threshold of a node i, thi
% ...

% Lombardy Electrical Network
NumNode=32;


f_rand=rand(1,NumNode)*100;
for i=1:NumNode
    if i<10
        assignin('base',  (['f_NODE0' num2str(i)]), f_rand(i));
    else
        assignin('base',  (['f_NODE' num2str(i)]), f_rand(i));
    end
end

r_rand=rand(1,32)*100;
for i=1:NumNode
    if i<10
        assignin('base',  (['r_NODE0' num2str(i)]), r_rand(i));
    else
        assignin('base',  (['r_NODE' num2str(i)]), r_rand(i));
    end
end


for i=1:NumNode
    if i<10
        assignin('base',  (['th_NODE0' num2str(i)]), 0.5);
    else
        assignin('base',  (['th_NODE' num2str(i)]), 0.5);
    end
end

cd ('..');
cd('_FILES');
Temp=load('AffectedNode.mat');

Label=Temp.AffectedNodeName;

% % tf_NODExx=1;
assignin('base',  (['tf_NODE' Label]), 1);


load_system('Lombardy');

SimulationResutls = sim('Lombardy',1);



a=0.0;
b=0.0;
c=0.0;


P1=0.1;
P2=0.5;

flag=0;


NumOfSubPlot=2;
iR=1;
NodeLabel=[5 32 11 8];
        

for i=NodeLabel
    
        if i<10
            subplot(NumOfSubPlot,2,iR);
            p=plot(eval(['Out_NODE0', num2str(i)]));
            set(gca,'XLim',[-1,101]);
            set(gca,'YLim',[-0.1,1.1]);
            iR=iR+1;
        else
            subplot(NumOfSubPlot,2,iR);
            p=plot(eval(['Out_NODE', num2str(i)]));
            set(gca,'XLim',[-1,101]);
            set(gca,'YLim',[-0.1,1.1]);
            iR=iR+1;
            
        end
        
        set(p,'Color',[a b c]);
        fP=[];
       
        if isempty(fP)
            text(P1,0.95,['N',num2str(i)]);
            P1=P1+0.5;
        else
            if flag==0
                P2=0.5;
                flag=1;
            else
                P2=0.45;
                flag=0;
            end
            text(SimulationResutls(fP(1)),P2,['N',num2str(i)]);
        end
        
        a=a+0.025;
        b=b+0.025;
        c=c+0.025;
  
end

close_system('Lombardy');

cd ('..');
cd ('matlabModels');



