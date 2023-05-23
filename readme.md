# D365 PCF - Security Role Manager

[![Build](https://github.com/cathalnoonan/d365-pcf-securityrolemanager/actions/workflows/BUILD.yml/badge.svg)](https://github.com/cathalnoonan/d365-pcf-securityrolemanager/actions/workflows/BUILD.yml)
[![Github All Releases](https://img.shields.io/github/downloads/cathalnoonan/d365-pcf-securityrolemanager/total.svg)]()

A PCF control to manage security role assignment for a User or Team on the form in Unified Interface

![Sample image](./docs/res/sample.gif)

---

### Docs
- [Installation and Configuration](docs/installation-and-configuration.md)
- [Migration from V1 to V2](docs/migration-v1-v2.md)

---

## Notes about the control

The roles are assigned/removed individually when the checkbox is changed
- This is in near real-time as it uses the WebApi endpoint

Until the operation has completed, the checkbox will not update
- This is by design
- The checkbox will be checked/unchecked when the update has completed


## LICENSE: MIT
