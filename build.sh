#!/bin/sh

npm install --prefix ./control --no-audit --ignore-scripts --no-fund
npm audit --prefix ./control --prod

dotnet build ./solution -c Release
