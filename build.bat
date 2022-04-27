@echo off

@REM # Install dependencies for pcf project
cd ./control
call npm install --no-audit
call npm audit --prod
cd ..

@REM # Build the solution
call dotnet build ./solution -c Release
