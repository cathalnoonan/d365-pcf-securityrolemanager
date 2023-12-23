import { expect, jest, test } from '@jest/globals'
import { SecurityRoleService } from './securityroleservice'

describe('buildQueryToRetrieveRoles', () => {
    // @ts-ignore
    let securityRoleService = new SecurityRoleService(null, null, null, null, null, false, 'business_unit_id')

    it('generates url if cross business unit is enabled and no filters are provided', () => {
        const result = securityRoleService.buildQueryToRetrieveRoles(true, [])
        expect(result).toBe('roles?$select=name,roleid&$orderby=name asc&$expand=businessunitid($select=name,businessunitid)')
    })

    it('generates url if cross business unit is disabled and no filters are provided', () => {
        const result = securityRoleService.buildQueryToRetrieveRoles(false, [])
        expect(result).toBe(`roles?$select=name,roleid&$orderby=name asc&$expand=businessunitid($select=name,businessunitid)&$filter=_businessunitid_value eq 'business_unit_id'`)
    })

    it('generates url if cross business unit is enabled and filters are provided', () => {
        const result = securityRoleService.buildQueryToRetrieveRoles(true, ['System Administrator'])
        expect(result).toBe(`roles?$select=name,roleid&$orderby=name asc&$expand=businessunitid($select=name,businessunitid)&$filter=(name eq 'System Administrator')`)
    })

    it('generates url if cross business unit is disabled and filters are provided', () => {
        const result = securityRoleService.buildQueryToRetrieveRoles(false, ['System Administrator'])
        expect(result).toBe(`roles?$select=name,roleid&$orderby=name asc&$expand=businessunitid($select=name,businessunitid)&$filter=_businessunitid_value eq 'business_unit_id' and (name eq 'System Administrator')`)
    })
})

describe('createAssociateUrl', () => {
    const resourceStrings = {
        UnsupportedEntity: 'Unsupported entity.'
    }

    it('creates url for systemuser', () => {
        // @ts-ignore
        const securityRoleService = new SecurityRoleService(null, null, 'systemuser', '00000000-0000-0000-0000-000000000000', resourceStrings, false, null)
        const result = securityRoleService.createAssociateUrl()
        expect(result).toBe('systemusers(00000000-0000-0000-0000-000000000000)/systemuserroles_association/$ref')
    })

    it('creates url for team', () => {
        // @ts-ignore
        const securityRoleService = new SecurityRoleService(null, null, 'team', '00000000-0000-0000-0000-000000000000', resourceStrings, false, null)
        const result = securityRoleService.createAssociateUrl()
        expect(result).toBe('teams(00000000-0000-0000-0000-000000000000)/teamroles_association/$ref')
    })
})

describe('createDisassociateUrl', () => {
    const resourceStrings = {
        UnsupportedEntity: 'Unsupported entity.'
    }

    it('creates url for systemuser', () => {
        // @ts-ignore
        const securityRoleService = new SecurityRoleService(null, null, 'systemuser', '00000000-0000-0000-0000-000000000000', resourceStrings, false, null)
        const result = securityRoleService.createDissociateUrl('11111111-1111-1111-1111-111111111111')
        expect(result).toBe('systemusers(00000000-0000-0000-0000-000000000000)/systemuserroles_association(11111111-1111-1111-1111-111111111111)/$ref')
    })

    it('creates url for team', () => {
        // @ts-ignore
        const securityRoleService = new SecurityRoleService(null, null, 'team', '00000000-0000-0000-0000-000000000000', resourceStrings, false, null)
        const result = securityRoleService.createDissociateUrl('11111111-1111-1111-1111-111111111111')
        expect(result).toBe('teams(00000000-0000-0000-0000-000000000000)/teamroles_association(11111111-1111-1111-1111-111111111111)/$ref')
    })
})

describe('createRetrieveUrlForTargetRoles', () => {
    it('generates url', () => {
        // @ts-ignore
        const securityRoleService = new SecurityRoleService(null, null, 'systemuser', '00000000-0000-0000-0000-000000000000', null, false, null, [])
        const result = securityRoleService.createRetrieveUrlForTargetRoles()
        expect(result).toMatch(/^roles\?fetchXml=/)
    })
})

describe('createRoleAssociationObject', () => {
    it('returns association object', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, 'https://crm/api/data/', null, null, null, false, null)
        const result = securityRoleService.createRoleAssociationObject('role_id')
        expect(result).toStrictEqual({ '@odata.id': 'https://crm/api/data/roles(role_id)' })
    })
})

describe('createRoleNameFilter', () => {
    // @ts-ignore
    let securityRoleService = new SecurityRoleService(null, null, null, null, null, false, null)

    it('creates a filter with one role specified', () => {
        const roleNames = ['Role Name']
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe(`(name eq 'Role Name')`)
    })

    it('creates a filter with two roles specified', () => {
        const roleNames = ['Role Name 1', 'Role Name 2']
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe(`(name eq 'Role Name 1' or name eq 'Role Name 2')`)
    })

    it('trims the role names in the array', () => {
        const roleNames = ['  Role Name  ']
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe(`(name eq 'Role Name')`)
    })

    it('trims the role names in the array', () => {
        const roleNames = ['  Role Name  ']
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe(`(name eq 'Role Name')`)
    })

    it('removes null items from the query', () => {
        const roleNames = ['Role Name', null]
        // @ts-ignore
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe(`(name eq 'Role Name')`)
    })

    it('removes empty items from the query', () => {
        const roleNames = ['Role Name', '']
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe(`(name eq 'Role Name')`)
    })

    it('removes whitespace items from the query', () => {
        const roleNames = ['Role Name', '  ']
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe(`(name eq 'Role Name')`)
    })

    it('produces an empty string when there are no roles provided', () => {
        const roleNames: string[] = []
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe('')
    })

    it('produces an empty string when only null/empty strings provided', () => {
        const roleNames = ['  ', null]
        // @ts-ignore
        const result = securityRoleService.createRoleNameFilter(roleNames)
        expect(result).toBe('')
    })
})

describe('getEntitySetName', () => {
    const resourceStrings = {
        UnsupportedEntity: 'Unsupported entity.'
    }

    it('returns systemuser', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'systemuser', null, resourceStrings, false, 'business_unit_id')
        const result = securityRoleService.getEntitySetName()
        expect(result).toBe('systemusers')
    })

    it('returns team', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'team', null, resourceStrings, false, 'business_unit_id')
        const result = securityRoleService.getEntitySetName()
        expect(result).toBe('teams')
    })

    it('throws for other', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'contact', null, resourceStrings, false, 'business_unit_id')
        expect(() => {
            const result = securityRoleService.getEntitySetName()
        }).toThrow({ message: resourceStrings.UnsupportedEntity })
    })
})

describe('getIntersectEntityName', () => {
    const resourceStrings = {
        UnsupportedEntity: 'Unsupported entity.'
    }

    it('returns systemuser', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'systemuser', null, resourceStrings, false, 'business_unit_id')
        const result = securityRoleService.getIntersectEntityName()
        expect(result).toBe('systemuserroles')
    })

    it('returns team', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'team', null, resourceStrings, false, 'business_unit_id')
        const result = securityRoleService.getIntersectEntityName()
        expect(result).toBe('teamroles')
    })

    it('throws for other', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'contact', null, resourceStrings, false, 'business_unit_id')
        expect(() => {
            const result = securityRoleService.getIntersectEntityName()
        }).toThrow({ message: resourceStrings.UnsupportedEntity })
    })
})

describe('getIntersectEntitySetName', () => {
    const resourceStrings = {
        UnsupportedEntity: 'Unsupported entity.'
    }

    it('returns systemuser', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'systemuser', null, resourceStrings, false, 'business_unit_id')
        const result = securityRoleService.getIntersectEntitySetName()
        expect(result).toBe('systemuserroles_association')
    })

    it('returns team', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'team', null, resourceStrings, false, 'business_unit_id')
        const result = securityRoleService.getIntersectEntitySetName()
        expect(result).toBe('teamroles_association')
    })

    it('throws for other', () => {
        // @ts-ignore
        let securityRoleService = new SecurityRoleService(null, null, 'contact', null, resourceStrings, false, 'business_unit_id')
        expect(() => {
            const result = securityRoleService.getIntersectEntitySetName()
        }).toThrow({ message: resourceStrings.UnsupportedEntity })
    })
})

describe('handleId', () => {
    // @ts-ignore
    let securityRoleService = new SecurityRoleService(null, null, null, null, null, false, 'business_unit_id')

    it('Returns input string if there are no curly braces', () => {
        const id = '00000000-0000-0000-0000-000000000000'
        const result = securityRoleService.handleId(id)
        expect(result).toBe('00000000-0000-0000-0000-000000000000')
    })

    it('Removes curly braces', () => {
        const id = '{00000000-0000-0000-0000-000000000000}'
        const result = securityRoleService.handleId(id)
        expect(result).toBe('00000000-0000-0000-0000-000000000000')
    })

    it('Returns null if input is null', () => {
        // @ts-ignore
        const result = securityRoleService.handleId(null)
        expect(result).toBe(null)
    })

    it('Returns empty string if input is empty string', () => {
        const result = securityRoleService.handleId('')
        expect(result).toBe('')
    })
})
