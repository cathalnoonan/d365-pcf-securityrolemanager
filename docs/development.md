# Development
Building the control will require use of the command line.

## Prerequisites

### .NET 6
Check if .NET 6 is installed by running the command:
```sh
dotnet --list-sdks
```
- If a version starting with `6.0` is listed, then dotnet 6 is installed.
- Download from the Microsoft website here:
    https://dotnet.microsoft.com/en-us/download/dotnet/6.0

### Node JS
Rather than installing Node JS directly, using a node version manager is recommended. This will make it easier to switch between node versions for different projects.
- Installation instructions for Windows: https://github.com/coreybutler/nvm-windows#installation--upgrades
- Installation instructions for Linux / MacOS: https://github.com/nvm-sh/nvm#installing-and-updating

After `nvm` is installed, run the following command in the cloned repository to install the appropriate version of Node JS:
```sh
nvm use
```

Validate that the node version being used by running:
```sh
node --version
```

---

## Building from source
Inside the cloned repository, run the following command to build the solution containing the pcf control:
```sh
dotnet build
```

This will create a `dist/` folder, and produce a managed solution inside it.

The managed solution can be imported into your CRM environment.

---

## Local development
The pcf test harness can be started by running the following commands:
```sh
cd ./control
npm install
npm run start
```

This will start the pcf test harness on port 8181, and can be accessed by opening `http://localhost:8181` inside your web browser.

---

## Testing the changes in CRM
Rather than building and importing the solution each time you have made a change to the control, you can start the pcf test harness by running `npm run start` inside the `control/` folder and then run Telerik Fiddler to serve your local copy of the control and preview the changes within CRM.

Microsoft have provided instructions on how to do this using Fiddler.
https://learn.microsoft.com/en-us/power-apps/developer/component-framework/debugging-custom-controls#debugging-after-deploying-into-microsoft-dataverse

Before testing this, there are a few things to keep in mind:
1. Import the solution first, and configure the control to appear on the form.
1. Start the pcf test harness on your computer, and leave it running. \
You can close the browser tab that opened `http://localhost:8181` if desired.
1. If you are changing the properties that are passed to the control, you will need to import the solution again with a higher version number specified in the `ControlManifest.Input.xml`, by replacing `x.y.z` in the `<control ... version="x.y.z">` attribute. ([see here](https://github.com/cathalnoonan/d365-pcf-securityrolemanager/blob/main/control/SecurityRoleManager/ControlManifest.Input.xml#L3))

---

## Unit tests
Unit tests can be run locally by running the following command from the root of the repository:
```sh
dotnet test
```
