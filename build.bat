::@echo off

SET msbuild="C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin\MSBuild.exe"

%msbuild% ./solution/solution.cdsproj /t:build /restore