@echo off

cd ./control
call npm install
cd ..

call dotnet build ./solution -c Release
