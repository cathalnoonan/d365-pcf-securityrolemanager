import * as React from 'react';
import { Row } from './';
import { SecurityRoleService } from '../services';
import { SecurityRoleMap, getEntityReference } from '../utilities';
import { Spinner, SpinnerSize, ISpinner, ISpinnerProps } from 'office-ui-fabric-react/lib/Spinner';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane'

export interface IProps {
    headerText: string;
    loadingMessage: string;
    saveRecordMessage: string;
    unsupportedMessage: string;
    disable: boolean;
}

interface IState {
    loaded: boolean;
    isSupportedEntity: boolean;
    isCreated: boolean;
    roleMap: SecurityRoleMap[];
    processingCount: number;
}

export default class App extends React.Component<IProps, IState> {

    private securityRoleService: SecurityRoleService;

    constructor(props: IProps) {
        super(props);
        this.state = {
            loaded: false,
            isSupportedEntity: false,
            isCreated: false,
            roleMap: [],
            processingCount: 0,
        };
    }

    render() {
        const { etn, id } = getEntityReference();
        this.securityRoleService = new SecurityRoleService(window.location.origin + '/api/data/v9.1', etn, id);

        const { loaded, isSupportedEntity, isCreated, roleMap } = this.state;
        const { headerText, loadingMessage, unsupportedMessage, saveRecordMessage } = this.props;

        const hrStyle: React.CSSProperties = {
            backgroundColor: '#eee',
            height: '1px',
            margin: '5px 0px',
        };

        // Show spinner while loading
        if (!loaded) return (
            <div>
                <div>{headerText}</div>
                <hr style={hrStyle} />
                <div>
                    <Spinner size={SpinnerSize.large} label={loadingMessage} />
                </div>
            </div>
        );

        // Show a message if the user puts the control on the wrong entity
        else if (!isSupportedEntity) return (
            <div>
                <div>{headerText}</div>
                <hr style={hrStyle} />
                <div>
                    {unsupportedMessage}
                </div>
            </div>
        );

        // Show a message if the record needs to be created before roles can be associated
        else if (!isCreated) return (
            <div>
                <div>{headerText}</div>
                <hr style={hrStyle} />
                <div>
                    {saveRecordMessage}
                </div>
            </div>
        );

        // Load the Security Roles in a list
        else {
            const stackTokens: IStackTokens = {
                childrenGap: 10,
            };

            const spinnerProps: ISpinnerProps = {
                size: SpinnerSize.medium,
            };

            const spinnerStyle: React.CSSProperties = {
                display: this.state.processingCount === 0 ? 'none' : 'inline-block',
            };

            return (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h4 style={{ flexGrow: 1, lineHeight: '1.5rem' }}>
                            {headerText}
                        </h4>
                        <Spinner {...spinnerProps} style={spinnerStyle} />
                    </div>

                    <hr style={hrStyle} />

                    <div style={{ height: '400px', position: 'relative' }}>
                        <ScrollablePane>
                            <Stack tokens={stackTokens}>
                                {roleMap.map(securityRoleMap =>
                                    <Row
                                        securityRoleService={this.securityRoleService}
                                        onProcessStart={() => this.setState({ processingCount: this.state.processingCount + 1 })}
                                        onProcessEnd={() => this.setState({ processingCount: this.state.processingCount - 1 })}
                                        disable={this.props.disable}
                                        key={securityRoleMap.id} securityRoleMap={securityRoleMap} />)}
                            </Stack>
                        </ScrollablePane>
                    </div>
                </div>
            );
        }
    }

    componentDidMount() {
        const { etn, id } = getEntityReference();
        const isSupportedEntity = (etn === 'systemuser' || etn === 'team');
        const isCreated = (!!id);

        let roleMap: SecurityRoleMap[] = [];

        const setStateForRefresh = () => this.setState({
            loaded: true,
            isSupportedEntity,
            isCreated,
            roleMap,
        });

        if (isSupportedEntity && isCreated) {
            this.securityRoleService.getRoleMap()
                .then(response => roleMap = response)
                .finally(setStateForRefresh)
        } else {
            setStateForRefresh();
        }
    }
}
