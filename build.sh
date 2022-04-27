#!/bin/sh

# Use node version manager to install node version consistently
if (command -v nvm) ; then
  nvm install && nvm use 
fi

# Install dependencies for pcf project
npm --prefix ./control install --no-audit
npm --prefix ./control audit --prod

# Build the solution
dotnet build ./solution -c Release
