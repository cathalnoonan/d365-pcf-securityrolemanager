import { SecurityRole } from '../models'

export function mergeRoles(allRoles: SecurityRole[], assignedRoles: SecurityRole[]): SecurityRoleMap[] {
    // List all potential roles as unassigned
    const roleMap: SecurityRoleMap[] = allRoles.map(role => ({ ...role, isAssigned: false }))

    // Then set assigned roles
    assignedRoles.forEach(assignedRoles => {
        updateArrayElement(roleMap, role => role.id === assignedRoles.id, role => ({ ...role, isAssigned: true }))
    })

    return roleMap
}

export interface SecurityRoleMap extends SecurityRole {
    isAssigned: boolean
}

export function updateArrayElement<T>(array: T[], predicate: (item: T) => boolean, updateToApply: (currentValue: T) => T) {
    // Find ...
    const index = array.findIndex(predicate)

    if (index === -1) return   // Not found, do nothing

    // ... Replace
    const currentValue = array[index]
    const newValue = updateToApply(currentValue)
    array[index] = newValue
}
