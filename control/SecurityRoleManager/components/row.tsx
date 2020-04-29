import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { SecurityRoleMap } from '../utilities';
import { SecurityRoleService } from '../services';

export interface IProps {
    securityRoleMap: SecurityRoleMap;
    securityRoleService: SecurityRoleService;
    onProcessStart: () => void;
    onProcessEnd: () => void;
    disable: boolean;
}

export default class Row extends React.Component<IProps, SecurityRoleMap> {

    private securityRoleService: SecurityRoleService;

    constructor(props: IProps) {
        super(props);
        this.securityRoleService = props.securityRoleService;
        this.state = {
            ...props.securityRoleMap,
        };
    }

    render() {
        const roleId = this.props.securityRoleMap.id;

        const stackProps: IStackProps = {
            horizontal: true,
        };

        const checkboxProps: ICheckboxProps = {
            label: this.state.name,
            checked: this.state.isAssigned,
            onChange: async (ev: React.FormEvent | undefined, checked: boolean | undefined) => {
                if (typeof checked === 'undefined') return;

                // Start spinner
                this.props.onProcessStart();

                try {
                    // Toggle role
                    if (checked) {
                        await this.securityRoleService.associateSecurityRole(roleId);
                    } else {
                        await this.securityRoleService.disassociateSecurityRoles(roleId);
                    }

                    this.setState({ isAssigned: !this.state.isAssigned });
                } finally {
                    // Stop spinner
                    this.props.onProcessEnd();
                }
            }
        };

        return (
            <Stack {...stackProps}>
                <Checkbox {...checkboxProps} disabled={this.props.disable} />
            </Stack>
        );
    }
}
