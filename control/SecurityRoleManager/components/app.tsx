import * as React from 'react';
import { Row } from './';
import { SecurityRoleService } from '../services';
import { SecurityRoleMap, getEntityReference } from '../utilities';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane'

export interface IProps {
    headerText: string;
    loadingMessage: string;
    saveRecordMessage: string;
    unsupportedMessage: string;
    disabled: boolean;
}

export default function App(props: IProps) {
    const { etn, id } = getEntityReference();
    const securityRoleService = new SecurityRoleService(window.location.origin + '/api/data/v9.1', etn, id);

    const isSupportedEntity = (etn === 'systemuser' || etn === 'team');
    const isCreated = (!!id);

    // setState
    const [loaded, setLoaded] = React.useState(false);
    const [roleMap, setRoleMap] = React.useState<SecurityRoleMap[]>([]);
    
    // ComponentDidMount
    React.useEffect(() => {
        if (isSupportedEntity && isCreated) {
            securityRoleService.getRoleMap()
                .then((response: SecurityRoleMap[]) => setRoleMap(response))
                .finally(() => setLoaded(true));
        } else {
            setLoaded(true);
        }
    }, []);

    const hrStyle: React.CSSProperties = {
        backgroundColor: '#eee',
        height: '1px',
        margin: '5px 0px',
    };

    // Show spinner while loading
    if (!loaded) return (
        <div>
            <div>{props.headerText}</div>
            <hr style={hrStyle} />
            <div>
                <Spinner size={SpinnerSize.large} label={props.loadingMessage} />
            </div>
        </div>
    );

    // Show a message if the user puts the control on the wrong entity
    else if (!isSupportedEntity) return (
        <div>
            <div>{props.headerText}</div>
            <hr style={hrStyle} />
            <div>{props.unsupportedMessage}</div>
        </div>
    );

    // Show a message if the record needs to be created before roles can be associated
    else if (!isCreated) return (
        <div>
            <div>{props.headerText}</div>
            <hr style={hrStyle} />
            <div>{props.saveRecordMessage}</div>
        </div>
    );

    // Load the Security Roles in a list
    else {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h4 style={{ flexGrow: 1, lineHeight: '1.5rem' }}>
                        {props.headerText}
                    </h4>
                </div>
                <hr style={hrStyle} />
                <div style={{ height: '400px', position: 'relative' }}>
                    <ScrollablePane>
                        <Stack tokens={{ childrenGap: 10 }}>
                            {roleMap.map(securityRoleMap =>
                                <Row
                                    securityRoleService={securityRoleService}
                                    disabled={props.disabled}
                                    key={securityRoleMap.id}
                                    securityRoleMap={securityRoleMap} />)}
                        </Stack>
                    </ScrollablePane>
                </div>
            </div>
        );
    }
}
