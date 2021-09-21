@echo off

call yarn --cwd ./control
call dotnet build ./solution -p:Configuration=Release
