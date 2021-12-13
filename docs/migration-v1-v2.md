# Migration from V1 to V2

Please read these notes before deploying the V2 solution of this component.

V2 adds the option to assign roles from multiple business units.

> **Note:** \
> This functionality will only work with the online version of D365.

---

## Importing the solution

Download the updated solution version from the [Releases Page](https://github.com/cathalnoonan/d365-pcf-securityrolemanager/releases).

When importing the new solution, use the default options to apply the solution upgrade.
![Solution Import - Use default options](./res/solutionimport-options.png)

## Additional Configuration Required

After importing the solution, open the form(s) where the control is used from the classic interface.

Select and double-click the control containing the Security Role Manager control to edit the properties.

In the `Controls` tab, there will be additional options under the `Security Role Manager` control.

These three properties need to be assigned a value for the control to function properly.
- Entity ID
- Entity Logical Name
- Business Unit

![Configuration properties added to the new version](./res/configuration-properties.png)

### Entity ID
- This field should be bound to the primary key field of the entity; i.e. `systemuserid` or `teamid`
 ![Entity ID](./res/configuration-properties-entityid.png)

### Entity Logical Name
- Select the `Bind to a static value` option.
- Type `systemuser` or `team`.
  ![Entity Logical Name](./res/configuration-properties-entitylogicalname.png)

### Business Unit
- Select the `businessunitid` lookup field
  ![Business Unit](./res/configuration-properties-businessunit.png)

---

Save, Publish, Refresh the form.
![Save, Publish, Refresh the form](./res/configuration-save-publish.png)