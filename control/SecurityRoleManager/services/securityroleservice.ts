import { XrmHttpService } from '.'
import { mergeRoles } from '../utilities'

export class SecurityRoleService {
    private httpService: XrmHttpService

    constructor(
        private apiDataUrl: string, 
        private etn: string, 
        private id: string
    ) {
        this.httpService = new XrmHttpService(apiDataUrl)
    }

    public async getRoleMap() {
        const businessUnitId = await this.getBusinessUnitId()
        const businessUnitRoles = await this.retrieveRolesForBusinessUnit(businessUnitId)
        const targetRoles = await this.retrieveRolesForTarget()

        return mergeRoles(businessUnitRoles, targetRoles)
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

    private async getBusinessUnitId() {
        const { id } = this
        const url = `${this.getEntitySetName()}(${this.handleId(id)})?$select=_businessunitid_value`
        const result = await this.httpService.GET(url)

        return result._businessunitid_value
    }

    private async retrieveRolesForBusinessUnit(businessUnitId: string): Promise<SecurityRole[]> {
        const url = `roles?$select=name,roleid&$filter=_businessunitid_value eq '${businessUnitId}'&$orderby=name asc`
        const roles: any[] = (await this.httpService.GET(url)).value

        return roles.map(entity => ({
            id: entity.roleid,
            name: entity.name,
        }))
    }

    private async retrieveRolesForTarget(): Promise<SecurityRole[]> {
        const url = this.createRetrieveUrlForTargetRoles()
        const results = (await this.httpService.GET(url)).value

        return results.map((entity: any) => ({
            id: entity.roleid,
            name: entity.name
        }))
    }

    private createRetrieveUrlForTargetRoles(): string {
        const { etn, id } = this
        const intersectEntityName = this.getIntersectEntityName()

        const fetch = [
            `<fetch version='1.0' distinct='true'>`,
            `<entity name='role'>`,
            `<attribute name='name' />`,
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
            message: 'Unsupported entity'
        }
    }

    private getIntersectEntityName(): string {
        if (this.etn === 'systemuser') return 'systemuserroles'
        if (this.etn === 'team') return 'teamroles'

        throw {
            message: 'Unsupported entity'
        }
    }

    private getIntersectEntitySetName(): string {
        if (this.etn === 'systemuser') return 'systemuserroles_association'
        if (this.etn === 'team') return 'teamroles_association'

        throw {
            message: 'Unsupported entity'
        }
    }

    private handleId(id: string): string {
        return id.replace('{', '').replace('}', '')
    }
}

export interface SecurityRole {
    name: string
    id: string
}
