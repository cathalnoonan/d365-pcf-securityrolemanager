import { IInputs, IOutputs } from './generated/ManifestTypes'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App, IAppProps } from './components/app'
import { ResourceStrings } from './strings'

export class SecurityRoleManager implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container: HTMLDivElement

    public init(context: ComponentFramework.Context<IInputs>, 
                notifyOutputChanged: () => void, 
                state: ComponentFramework.Dictionary, 
                container: HTMLDivElement) {
        
        this.container = container
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {

        const clientUrl = Xrm.Utility.getGlobalContext().getClientUrl()
        const apiDataUrl = `${clientUrl}/api/data/v9.1/`

        const resourceStrings = new ResourceStrings((key: string) => context.resources.getString(key))

        const props: IAppProps = {
            apiDataUrl,
            resourceStrings,
            etn: context.parameters.entityLogicalName.raw,
            id: context.parameters.entityId.raw,
            businessUnitId: context.parameters.businessUnitId.raw[0].id,
        }

        ReactDOM.render(
            React.createElement(App, props),
            this.container
        )
    }

    public getOutputs(): IOutputs {
        return {}
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container)
    }
}
