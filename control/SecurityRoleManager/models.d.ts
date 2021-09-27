export interface EntityReference {
    id: string
    name: string
    etn: string
}

export interface RetrieveMultipleResponse {
    value: any[]
    '@odata.nextLink'?: string
}

export interface SecurityRole {
    name: string
    id: string
    businessUnitId: string
}