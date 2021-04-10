export class ResourceStrings {
    constructor (private getResourceString: (key: string) => string) {}

    get SecurityRoles(): string {
        return this.getResourceString("SecurityRoles")
    }

    get Loading(): string {
        return this.getResourceString("Loading")
    }

    get SaveTheRecord(): string {
        return this.getResourceString("SaveTheRecord")
    }

    get UnsupportedEntity(): string {
        return this.getResourceString("UnsupportedEntity")
    }
}