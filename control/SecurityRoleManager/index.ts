import { IInputs, IOutputs } from './generated/ManifestTypes'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App, IAppProps } from './components/app'
import { ResourceStrings } from './strings'
import { parseCsvString } from './utilities'

export class SecurityRoleManager implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container: HTMLDivElement

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this.container = container
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const globalContext = Xrm.Utility.getGlobalContext()
        const clientUrl = globalContext.getClientUrl()
        const apiDataUrl = `${clientUrl}/api/data/v9.1/`

        // `isOnPremise` is the function name in CrmOnline
        // `isOnPremises` is the function name in CrmOnPremises
        // @ts-ignore
        const isCrmOnline = !( globalContext.isOnPremise?.() ?? globalContext.isOnPremises?.() )

        const resourceStrings = new ResourceStrings((key: string) => context.resources.getString(key))

        const businessUnit = context.parameters.businessUnitId.raw?.[0]

        const roleNamesFilterDelimiter = context.parameters.roleNamesFilterDelimiter.raw ?? ''
        const roleNamesFilter = parseCsvString(
            context.parameters.roleNamesFilter.raw ?? '',
            roleNamesFilterDelimiter.length > 0 ? roleNamesFilterDelimiter : '\n'
        )

        const props: IAppProps = {
            apiDataUrl,
            resourceStrings,
            etn: context.parameters.entityLogicalName.raw,
            id: context.parameters.entityId.raw?.toString() ?? null,
            businessUnitId: businessUnit?.id,
            businessUnitName: businessUnit?.name ?? null,
            crossBusinessUnitAssignmentEnabled: isCrmOnline,
            roleNamesFilter,
        }

        ReactDOM.render(
            React.createElement(App, props),
            this.container
        )
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container)
    }
}
