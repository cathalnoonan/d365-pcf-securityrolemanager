@echo off

@REM On windows, we can't rely on npm's "--prefix" option
cd ./control
call npm install --no-audit --ignore-scripts --no-fund
call npm audit --prod
cd ../

call dotnet build ./solution -c Release
