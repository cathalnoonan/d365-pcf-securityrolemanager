# D365 PCF - Security Role Manager

A PCF control to manage security role assignment for a User or Team on the form in Unified Interface

![Sample image](./img/sample.gif)


## Installation and Configuration

- Download and install a solution from the [Releases page](https://github.com/cathalnoonan/d365-pcf-securityrolemanager/releases)
- Edit the form of the User or Team entity
- Add a field to the form
  - The field can be any of the types outlined under the supported section in Microsoft's PCF [documentation page](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/property#remarks)
  - The value of this field is not read or changed by the control, it is just used as a placeholder to give the control somewhere to render
- Open the properties of the field
  - Set the field to not display a label (Optional, but recommended)
  - Open the Controls page, and select `Security Role Manager` under the Add Control option
- Save, Publish, Refresh the form


## Notes about the control

The roles are assigned/removed individually when the checkbox is changed
- This is in near real-time as it uses the WebApi endpoint

Until the operation has completed, the checkbox will not update
- This is by design
- The checkbox will be checked/unchecked when the update has completed


## LICENSE: MIT
