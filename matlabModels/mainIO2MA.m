function [] = mainIO2MA(country)
% To invoke IO2MongolfierAnal using Data Base connetionn.
% ...

% DATA INPUT ....

ConnDB=DataBaseConnection;

[A,x,p0,X,l,Time,c,K]=DataRetreival(ConnDB, country);

IO2MA(country,A,p0,x,X,c,l,K,Time);

end

