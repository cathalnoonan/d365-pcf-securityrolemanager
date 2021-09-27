# Installation and Configuration

- Download and install a solution from the [Releases page](https://github.com/cathalnoonan/d365-pcf-securityrolemanager/releases)
- Edit the form of the User or Team entity
- Add a field to the form
  - The field can be any of the types outlined under the supported section in Microsoft's PCF [documentation page](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/property#remarks)
  - The value of this field is not read or changed by the control, it is just used as a placeholder to give the control somewhere to render
- Open the properties of the field
  - Set the field to not display a label (Optional, but recommended)
  - Open the Controls page, and select `Security Role Manager` under the Add Control option
- Save, Publish, Refresh the form