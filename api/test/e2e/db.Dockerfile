FROM mcr.microsoft.com/mssql/server:2017-latest-ubuntu

ENV SA_PASSWORD yourStrong(!)Password
ENV ACCEPT_EULA Y
# ENV MSSQL_PID Express
