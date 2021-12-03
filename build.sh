#!/bin/sh

npm --prefix ./control install
dotnet build ./solution -c Release
