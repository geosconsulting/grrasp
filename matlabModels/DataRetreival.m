function [A,x,p0,X,l,Time,c,K] = DataRetreival(conn, Country)

% The total economic sector (or infrastructure) can be derived from the input
% data.
NumberOfSectors=36;

% Use the open (GIS) Data Base Connection to retrieve data
% in accord with the users choices.

A=['economics.', Country,'_a'];
SqlQueryA=['SELECT ', ...
     Country,'_a.c1,',... 
     Country,'_a.c2,',...  
     Country,'_a.c3,',... 
     Country,'_a.c4,',... 
     Country,'_a.c5,',... 
     Country,'_a.c6,',... 
     Country,'_a.c7,',... 
     Country,'_a.c8,',... 
     Country,'_a.c9,',... 
     Country,'_a.c10,',... 
     Country,'_a.c11,',... 
     Country,'_a.c12,',... 
     Country,'_a.c13,',... 
     Country,'_a.c14,',... 
     Country,'_a.c15,',... 
     Country,'_a.c16,',... 
     Country,'_a.c17,',... 
     Country,'_a.c18,',... 
     Country,'_a.c19,',... 
     Country,'_a.c20,',... 
     Country,'_a.c21,',... 
     Country,'_a.c22,',... 
     Country,'_a.c23,',... 
     Country,'_a.c24,',... 
     Country,'_a.c25,',... 
     Country,'_a.c26,',... 
     Country,'_a.c27,',... 
     Country,'_a.c28,',... 
     Country,'_a.c29,',... 
     Country,'_a.c30,',... 
     Country,'_a.c31,',... 
     Country,'_a.c32,',... 
     Country,'_a.c33,',... 
     Country,'_a.c34,',... 
     Country,'_a.c35,',... 
     Country,'_a.c37',...
' FROM economics.', Country,'_a',...
' LIMIT 36 '];
cursA = exec(conn, SqlQueryA);
A = fetch(cursA);
A=cell2mat(A.Data);
A=A'; % CHECK THIS


x=['economics.', Country,'_x'];
SqlQueryx=['SELECT ', Country,'_x.total FROM economics.', Country,'_x LIMIT 36'];
cursx = exec(conn, SqlQueryx);
x = fetch(cursx);
x=cell2mat(x.Data);

% Year to Day Transform.
x=x/365;


Values=['econodata.', Country,'_p0'];
SqlQuerypV=['SELECT ', Country,'_p0.* FROM econodata.', Country,'_p0 ORDER BY id ASC;'];
curspV = exec(conn, SqlQuerypV);
Values = fetch(curspV);

p0Temp=cell2mat(Values.Data(:,3));
p0=[];

p0(1)=p0Temp(1);
p0(2)=p0Temp(12);
p0(3)=p0Temp(23);
p0(4:9)=p0Temp(31:36);
p0(10:19)=p0Temp(2:11);
p0(20:29)=p0Temp(13:22);
p0(30:36)=p0Temp(24:30);

p0=p0';


lTemp=cell2mat(Values.Data(:,4));
l=[];

l(1)=lTemp(1);
l(2)=lTemp(12);
l(3)=lTemp(23);
l(4:9)=lTemp(31:36);
l(10:19)=lTemp(2:11);
l(20:29)=lTemp(13:22);
l(30:36)=lTemp(24:30);

l=diag(l');


tTemp=cell2mat(Values.Data(:,5));
Time=max(tTemp);


% Repeat vector x, n Time.
xTemp=x;
for i=2:Time
    x(:,i)=xTemp;
end


X=['econodata.', Country,'_inventory'];
SqlQueryX=['SELECT ', Country,'_inventory.value FROM econodata.', Country,'_inventory ORDER BY id ASC;'];
cursX = exec(conn, SqlQueryX);
X = fetch(cursX);
XTemp=cell2mat(X.Data);
X=[];

X(1)=XTemp(1);
X(2)=XTemp(12);
X(3)=XTemp(23);
X(4:9)=XTemp(31:36);
X(10:19)=XTemp(2:11);
X(20:29)=XTemp(13:22);
X(30:36)=XTemp(24:30);

X=X';

% Create the Demand perturbation table C.
% c(i)      Demand perturbation. This quantifies the proportion of reduced final
%           demand from the total nominal output of Sector i.
%           We use c=0.

c=zeros(NumberOfSectors,Time);

K=eye(NumberOfSectors); % CHECK THIS ASSUMPTION (?)

end
