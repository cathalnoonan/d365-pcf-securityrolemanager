# Installation and Configuration

- Download and install a solution from the [Releases page](https://github.com/cathalnoonan/d365-pcf-securityrolemanager/releases).
- Edit the form of the User or Team entity using the classic interface.
- Add a field to the form.
  ![Add a field to the form](./res/configuration-add-field.png)
  - This can be an unused field, or a new field.
  - The field can be any of the following field types:
    - Currency
    - DateAndTime.DateAndTime
    - DateAndTime.DateOnly
    - Decimal
    - Enum
    - FP
    - Lookup.Simple
    - Multiple
    - MultiSelectOptionSet
    - OptionSet
    - SingleLine.Email
    - SingleLine.Phone
    - SingleLine.Text
    - SingleLine.TextArea
    - SingleLine.Ticker
    - SingleLine.URL
    - TwoOptions
    - Whole.None
  - Refer to Microsoft's PCF [documentation page](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/property#remarks) for more information about the above field types.
  - The value of this field is not read or changed by the control, it is just used as a placeholder to give the control somewhere to render.
- Open the properties of the field.
  - Set the field to not display a label (Optional, but recommended).
  ![Set the field to not display a label](./res/configuration-set-label-hidden.png)
  - Open the Controls tab.
  ![Open the Controls tab](./res/configuration-controls-tab.png)
  - Select `Security Role Manager` under the Add Control option.
  ![Select Security Role Manager](./res/configuration-select-securityrolemanager.png)
  - Configure the input properties for the control:
  ![Configure the input properties for the control](./res/configuration-properties.png)
    - EntityId:
      - For `systemuser`, select the `systemuserid` field
      - For `team`, select the `teamid` field
      ![Entity ID](./res/configuration-properties-entityid.png)
    - EntityLogicalName:
      - Select `Bind to a static value` and type `systemuser` or `team`
      ![Entity Logical Name](./res/configuration-properties-entitylogicalname.png)
    - BusinessUnit:
      - Select the `businessunitid` field
      ![Business Unit](./res/configuration-properties-businessunit.png)
- Save, Publish, Refresh the form.
![Save, Publish, Refresh the form](./res/configuration-save-publish.png)
