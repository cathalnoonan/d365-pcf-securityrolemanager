import { ResourceStrings } from '../strings'
import { XrmHttpService, mergeRoles, retrieveAll } from '../utilities'
import { SecurityRole } from '../models'

export class SecurityRoleService {
    constructor(
        private readonly httpService: XrmHttpService,
        private readonly apiDataUrl: string,
        private readonly etn: string,
        private readonly id: string,
        private readonly resourceStrings: ResourceStrings,
        private readonly crossBusinessUnitAssignmentEnabled: boolean,
        private readonly businessUnitId: string
    ) {
    }

    public async getRoleMap() {
        const roles = await this.retrieveAllRoles()
        const assignedRoles = await this.retrieveAssignedRoles()

        return mergeRoles(roles, assignedRoles)
    }

    public async associateSecurityRole(roleId: string): Promise<void> {
        const url = this.createAssociateUrl()
        const data = this.createRoleAssociationObject(roleId)

        await this.httpService.POST(url, data)
    }

    public async disassociateSecurityRoles(roleId: string): Promise<void> {
        const url = this.createDissociateUrl(roleId)

        await this.httpService.DELETE(url)
    }

    private async retrieveAllRoles(): Promise<SecurityRole[]> {
        let url = `roles?$select=name,roleid&$orderby=name asc&$expand=businessunitid($select=name,businessunitid)`
        if (!this.crossBusinessUnitAssignmentEnabled)
            url += `&$filter=_businessunitid_value eq '${this.businessUnitId}'`

        const roles: any[] = await retrieveAll(this.httpService, url)

        return roles.map(entity => ({
            id: entity.roleid,
            name: `${entity.name} - ${entity.businessunitid.name}`,
            businessUnitId: entity.businessunitid.businessunitid,
        }))
        .sort((a, b) => a.name > b.name ? 1 : -1) // Ordering by the business unit name
    }

    private async retrieveAssignedRoles(): Promise<SecurityRole[]> {
        const url = this.createRetrieveUrlForTargetRoles()
        const results = await retrieveAll(this.httpService, url)

        return results.map((entity: any) => ({
            id: entity.roleid,
            name: entity.name,
            businessUnitId: entity.businessunitid,
        }))
    }

    private createRetrieveUrlForTargetRoles(): string {
        const { etn, id } = this
        const intersectEntityName = this.getIntersectEntityName()

        const fetch = [
            `<fetch version='1.0' distinct='true'>`,
            `<entity name='role'>`,
            `<attribute name='name' />`,
            `<attribute name='businessunitid' />`,
            `<attribute name='roleid' />`,
            `<order attribute='name' descending='false' />`,
            `<link-entity name='${intersectEntityName}' from='roleid' to='roleid' visible='false' intersect='true'>`,
            `<link-entity name='${etn}' from='${etn}id' to='${etn}id'>`,
            `<filter type='and'>`,
            `<condition attribute='${etn}id' operator='eq' value='${id}' />`,
            `</filter>`,
            `</link-entity>`,
            `</link-entity>`,
            `</entity>`,
            `</fetch>`,
        ].join('')

        return `roles?fetchXml=${fetch}`
    }

    private createAssociateUrl(): string {
        const { id } = this
        const entitySetName = this.getEntitySetName()
        const relationshipName = this.getIntersectEntitySetName()

        return `${entitySetName}(${this.handleId(id)})/${relationshipName}/$ref`
    }

    private createDissociateUrl(roleId: string): string {
        const { id } = this
        const entitySetName = this.getEntitySetName()
        const relationshipName = this.getIntersectEntitySetName()

        return `${entitySetName}(${this.handleId(id)})/${relationshipName}(${this.handleId(roleId)})/$ref`
    }

    private createRoleAssociationObject(roleId: string): any {
        return {
            '@odata.id': `${this.apiDataUrl}roles(${this.handleId(roleId)})`,
        }
    }

    private getEntitySetName(): string {
        if (this.etn === 'systemuser') return 'systemusers'
        if (this.etn === 'team') return 'teams'

        throw {
            message: this.resourceStrings.UnsupportedEntity
        }
    }

    private getIntersectEntityName(): string {
        if (this.etn === 'systemuser') return 'systemuserroles'
        if (this.etn === 'team') return 'teamroles'

        throw {
            message: this.resourceStrings.UnsupportedEntity
        }
    }

    private getIntersectEntitySetName(): string {
        if (this.etn === 'systemuser') return 'systemuserroles_association'
        if (this.etn === 'team') return 'teamroles_association'

        throw {
            message: this.resourceStrings.UnsupportedEntity
        }
    }

    private handleId(id: string): string {
        return id.replace('{', '').replace('}', '')
    }
}
