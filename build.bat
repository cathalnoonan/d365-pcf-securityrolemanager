::@echo off

SET msbuild="C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin\MSBuild.exe"

if exist ./solution/bin/Release/solution.zip (
    %msbuild% ./solution/solution.cdsproj /t:build /p:Configuration=Release
) else (
    %msbuild% ./solution/solution.cdsproj /t:build /restore /p:Configuration=Release
)