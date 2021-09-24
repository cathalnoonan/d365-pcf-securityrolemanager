import * as React from 'react'
import { SecurityRoleMap } from '../utilities'
import { SecurityRoleService } from '../services'
import { Checkbox } from '@fluentui/react/lib/Checkbox'
import { Stack } from '@fluentui/react/lib/Stack'

export interface IRowProps {
    securityRoleMap: SecurityRoleMap
    securityRoleService: SecurityRoleService
    onChange: () => void
}

export function Row(props: IRowProps) {
    const [processing, setProcessing] = React.useState(false)

    async function onChange() {
        try {
            setProcessing(true)
            if (!props.securityRoleMap.isAssigned) {
                await props.securityRoleService.associateSecurityRole(props.securityRoleMap.id)
            } else {
                await props.securityRoleService.disassociateSecurityRoles(props.securityRoleMap.id)
            }
            props.onChange()

        } finally {
            setProcessing(false)
        }
    }

    return (
        <Stack horizontal={true}>
            <Checkbox
                label={props.securityRoleMap.name}
                checked={props.securityRoleMap.isAssigned}
                onChange={onChange}
                disabled={processing} />
        </Stack>
    )
}
