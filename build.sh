#!/bin/sh

npm --prefix ./control install --no-audit
npm --prefix ./control audit --prod
dotnet build ./solution -c Release
