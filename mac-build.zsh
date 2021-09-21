#!/usr/bin/env zsh

yarn --cwd ./control
dotnet build ./solution -p:Configuration=Release
