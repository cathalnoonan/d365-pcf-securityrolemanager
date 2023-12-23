import { mergeRoles, updateArrayElement } from './mergeroles'
import { SecurityRole } from '../models'

describe('mergeRoles', () => {
    it('merges assigned roles with all roles', () => {
        const allRoles: SecurityRole[] = [
            {
                id: '1',
                name: 'Role 1',
                businessUnitId: 'business_unit_id'
            },
            {
                id: '2',
                name: 'Role 2',
                businessUnitId: 'business_unit_id'
            },
        ]
        const assignedRoles: SecurityRole[] = [
            {
                id: '1',
                name: 'Role 1',
                businessUnitId: 'business_unit_id'
            },
        ]
        const result = mergeRoles(allRoles, assignedRoles)

        expect(result.length).toBe(2)
        expect(result[0].isAssigned).toBe(true)
        expect(result[1].isAssigned).toBe(false)
    })
})

describe('updateArrayElement', () => {
    it('replaces element in array when found', () => {
        const array = [1,2,3,4]
        updateArrayElement(array, x => x === 1, x => 2) // Replace '1' with '2'
        expect(array).toStrictEqual([2,2,3,4])
    })

    it('does nothing when match not found', () => {
        const array = [1,2,3,4]
        updateArrayElement(array, x => x === 5, x => 99) // Replace '5' with '99'
        expect(array).toStrictEqual([1,2,3,4])
    })
})
