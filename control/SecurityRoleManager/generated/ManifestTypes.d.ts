/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    sampleProperty: ComponentFramework.PropertyTypes.Property;
    entityId: ComponentFramework.PropertyTypes.StringProperty;
    entityLogicalName: ComponentFramework.PropertyTypes.StringProperty;
    businessUnitId: ComponentFramework.PropertyTypes.LookupProperty;
}
export interface IOutputs {
    sampleProperty?: any;
    entityId?: string;
    businessUnitId?: ComponentFramework.LookupValue[];
}
