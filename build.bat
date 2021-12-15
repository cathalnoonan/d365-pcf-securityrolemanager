@echo off

cd ./control
call npm install --no-audit
call npm audit --prod
cd ..

call dotnet build ./solution -c Release