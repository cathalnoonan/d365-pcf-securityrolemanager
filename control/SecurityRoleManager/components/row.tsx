import * as React from 'react'
import { SecurityRoleMap } from '../utilities'
import { SecurityRoleService } from '../services'
import { Checkbox } from '@fluentui/react/lib/Checkbox'
import { Stack } from '@fluentui/react/lib/Stack'

export interface IRowProps {
    securityRoleMap: SecurityRoleMap
    securityRoleService: SecurityRoleService
}

export function Row(props: IRowProps) {
    const { securityRoleService } = props
    const [securityRoleMap, setSecurityRoleMap] = React.useState(props.securityRoleMap)
    const [processing, setProcessing] = React.useState(false)

    async function onChange(ev?: React.FormEvent, checked?: boolean) {
        // Fail early...
        if (typeof checked === 'undefined') {
            return
        }

        try {
            setProcessing(true)

            if (checked) {
                await securityRoleService.associateSecurityRole(securityRoleMap.id)
            } else {
                await securityRoleService.disassociateSecurityRoles(securityRoleMap.id)
            }

            setSecurityRoleMap({ ...securityRoleMap, isAssigned: !securityRoleMap.isAssigned })

        } finally {
            setProcessing(false)
        }
    }

    return (
        <Stack horizontal={true}>
            <Checkbox
                label={securityRoleMap.name}
                checked={securityRoleMap.isAssigned}
                onChange={onChange} 
                disabled={processing} />
        </Stack>
    )
}
