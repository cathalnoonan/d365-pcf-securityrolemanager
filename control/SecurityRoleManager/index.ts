import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, AppProps } from './components';

export class SecurityRoleManager implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container: HTMLDivElement;

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this.container = container;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const disable = context.mode.isControlDisabled;

        const getResourceString = (name: string) => context.resources.getString(name);

        const props: AppProps = {
            headerText: getResourceString('SecurityRoles'),
            loadingMessage: getResourceString('Loading'),
            saveRecordMessage: getResourceString('SaveTheRecord'),
            unsupportedMessage: getResourceString('UnsupportedEntity'),
            disabled: disable,
        };

        ReactDOM.render(
            React.createElement(App, props),
            this.container
        );
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}
