export class ResourceStrings {
    constructor(
        private readonly getResourceString: (key: string) => string
    ) { }

    get SecurityRoles(): string {
        return this.getResourceString('SecurityRoles')
    }

    get Loading(): string {
        return this.getResourceString('Loading')
    }

    get SaveTheRecord(): string {
        return this.getResourceString('SaveTheRecord')
    }

    get UnsupportedEntity(): string {
        return this.getResourceString('UnsupportedEntity')
    }

    get Search(): string {
        return this.getResourceString('Search')
    }

    get SearchPlaceholder(): string {
        return this.getResourceString('SearchPlaceholder')
    }

    get BusinessUnit(): string {
        return this.getResourceString('businessUnitId_Display_Key')
    }

    get CurrentBusinessUnit(): string {
        return this.getResourceString('CurrentBusinessUnit')
    }

    get OtherBusinessUnits(): string {
        return this.getResourceString('OtherBusinessUnits')
    }
}