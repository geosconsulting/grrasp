function [] = IO2MA(country,A,p0,x,X,c,l,K,Time)

% IOM - Resilience Inoperabiliy Input-Output Model
% ...
% Refernce [1]  Olaf Jonkeren and Georgios Giannopoulos, "Modeling Critical Infrastructure
%               failure with a Resilience Inoperability Input-Output
%               model", 2013

% The goal of this function is to compute the equations (1) in [1].


% DATA INPUT ....

% Load from .mat od DataBase the variables A, l, x, c, p0, and X.

% variable i rappresent a sector.
% variable t a time.


% A(a)      interdependency matrix. Tells us to what extent sector inoperability
%           in a sector j is transmitted to sector i.

% x(t)      matrix describing ‘as-planned production’ in every ‘t’. Thi

% p0        production inoperability at t = 0. 

% X(t)      vector describing the value of inventory (€) for every infrastructure
%           and economic sector at t.

% c(i)      Demand perturbation. This quantifies the proportion of reduced final
%           demand from the total nominal output of Sector i.
%           We use c=0.

% l(i)      Repair coefficient. The repair coefficient of Sector i describes
%           the ability of the sector to recover production capability from
%           an initial disruptive event, with no interdependent effects included
%           in its calculation, a greater value of li results in faster recovery
%           of production capability.
%           Is used to determine the speed wit which a sector recovers from
%           production inoperability.

% K         Square Matrix, dynamics of the sectors in recovery described by
%           the coefficient on the diagonal.

% If set to 0, graphs are not plotted.
PlotGraph=1;


% Parameters.

% The total economic sector (or infrastructure) can be derived from the input
% data.
NumberOfSectors=36;
 


% -------------------------------------------------------------------------


% Code Begin Here ...

% Computation of p(t)

% Solution One.
p=p0;
for t = 2:Time
     for i = 1:NumberOfSectors
         p(i,t)=exp(-l(i,i))*p(i,t-1);
     end
end


%Solution Two.
% p=p0;
% for t = 2:Time
%      for i = 1:NumberOfSectors
%          p(i,t)=p(i,1)*(1+(exp(-l(i,i)*Time))-exp(l(i,i)*(t-Time)));
%      end
% end


% To be able to use the equation (1) in [1], initial sector inoperability
% must be determinated.
% 
q0=zeros(1,NumberOfSectors)';
 
for i = 1:NumberOfSectors
    if X(i,1)>=p(i,1)*x(i,1)
        q0(i,1)=0;
        continue;
    end
    
    if (X(i,1)>0 && X(i,1)<p(i,1)*x(i,1))
        q0(i,1)=p(i,1)*(1-(X(i,1)/(p(i,1)*x(i,1))));
        continue;
    end
    
    if X(i,1)==0
        q0(i,1)=p(i,1);
        continue;
    end
end



% Now we can compute starting from q0, q1, q2,..., q(t).
q=q0;
for t = 2:Time
    
     for i = 1:NumberOfSectors
   
        % Inventory update
        Rzero=X(i,t-1)-p(i,t-1)*x(i,t-1);
        Rone=X(i,t-1)-q(i,t-1)*x(i,t-1);
        Rbest=min(Rzero,Rone);     
        X(i,t)=max(Rbest,0);
         
        % Model update
        if(X(i,t)>=p(i,t)*x(i,t))
            q(i,t)=q(i,t-1)+K(i,i)*(c(i,t)-q(i,t-1)+sum(A(:,i).*q(:,t-1)));
            continue;
        end
        
        if(X(i,t)>0 && X(i,t)<p(i,t)*x(i,t))
            minMax1=p(i,t)-(X(i,t)/x(i,t));
            minMax2=q(i,t-1)+K(i,i)*(c(i,t)-q(i,t-1)+sum(A(:,i).*q(:,t-1)));
            
            if minMax1>=minMax2
                q(i,t)=minMax1;
            else
                q(i,t)=minMax2;
            end
            continue;
        end
        
        if(X(i,t)==0 && X(i,t-1)>0)
            minMax1=p(i,t);
            minMax2=q(i,t-1)+K(i,i)*(c(i,t)-q(i,t-1)+sum(A(:,i).*q(:,t-1)));
            
            if minMax1>=minMax2
                q(i,t)=minMax1;
            else
                q(i,t)=minMax2;
            end
            continue;
        end  
        
        if(X(i,t)==0 && X(i,t-1)==0)
            q(i,t)=q(i,t-1)+K(i,i)*(c(i,t)-q(i,t-1)+sum(A(:,i).*q(:,t-1)));
            continue;
        end
        
     end
end

h= figure;

if(PlotGraph)
    hold on;
    for i=1:NumberOfSectors
        
        color=ceil(rand(1)*9);
        switch  color
            case 1
                plot(q(i,:),'r');
            case 2
                plot(q(i,:),'g');
            case 3
                plot(q(i,:),'b');
            case 4
                plot(q(i,:),'c');
            case 5
                plot(q(i,:),'m');
            case 6
                plot(q(i,:),'y');
            case 7
                plot(q(i,:),'r');
            case 8
                plot(q(i,:),'w');
        end
        
    end
end

% Computing of total economic loss Q.
Q=sum(diag(q'*x));


cd('..\_FILES\IOMOutput');
t=clock;
DirectoryName=[country '-'];

for i=1:length(t)
    DirectoryName =[DirectoryName num2str(t(i)) '-'];
end
DirectoryName(end)='';

mkdir(DirectoryName);

saveas(h,[DirectoryName '\' 'Talpa.jpg']);

xlswrite([DirectoryName '\' 'Talpa.csv'],q);

cd ('..\..\matlabModels');

close(h);

