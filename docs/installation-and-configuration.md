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
  ![Configure the input properties for the control (1)](./res/configuration-properties-1.png)
  ![Configure the input properties for the control (2)](./res/configuration-properties-2.png)
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
    - RoleNamesFilter (optional, added in `v2.1.0`):
      - If you would like to filter the list of roles that are shown on the form, enter the names of roles to be shown.
      - Select `Bind to a static value`, type each security role name on a new line. Using the [maker portal](#maker-portal) will have a multi-line text box for updating the role names.
      - **Note: The names must match with security role names. If roles are renamed elsewhere, they must be updated here also or the filtering will not pick up that role anymore.**
      ![Role Names Filter](./res/configuration-properties-rolenamesfilter.png)
    - RoleNamesFilterDelimiter (optional, added in `v2.2.0`):
      - If you need to specify the character used to separate `RoleNamesFilter`, provide the delimiter (otherwise a new line will be used).
      - Select `Bind to a static value`, type the character to use.
      - **Note: Make sure that the character used to separate the role names does not exist in any of the security roles in your environment.**
      ![Role Names Filter](./res/configuration-properties-rolenamesfilterdelimiter.png)
- Save, Publish, Refresh the form.
![Save, Publish, Refresh the form](./res/configuration-save-publish.png)

---

## Maker Portal

The maker portal can be used to add the control to the form with online environments.
![Modern property configuration](./res/configuration-properties-modern.png)

When using the maker portal, you may need to Save and Publish twice for the changes to appear.
