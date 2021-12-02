@echo off

call npm --prefix ./control install
call dotnet build ./solution -c Release
