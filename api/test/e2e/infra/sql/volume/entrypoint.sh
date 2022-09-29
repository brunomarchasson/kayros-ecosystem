#!/bin/bash
database=testDB
wait_time=10s
password="*yourStrong(!)Password01"


# wait for SQL Server to come up
echo importing data will start in $wait_time...
sleep $wait_time
echo importing data...

# run the init script to create the DB and the tables in /table
/opt/mssql-tools/bin/sqlcmd -S 0.0.0.0 -U sa -P "*yourStrong(!)Password01" -i ./init.sql

for entry in "table/*.sql"
do
  echo executing $entry
  /opt/mssql-tools/bin/sqlcmd -S 0.0.0.0 -U sa -P "*yourStrong(!)Password01" -d $database -i $entry
done

#import the data from the csv files
for entry in "data/*.sql"
do
 echo executing $entry
  /opt/mssql-tools/bin/sqlcmd -S 0.0.0.0 -U sa -P "*yourStrong(!)Password01" -d $database -i $entry
done
