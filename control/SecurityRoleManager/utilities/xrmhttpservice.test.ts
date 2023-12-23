import { expect } from '@jest/globals'
import { XrmHttpService } from './xrmhttpservice'

describe('constructor', () => {
    it('appends slash to apiDataUrl if needed', () => {
        const xrmHttpService = new XrmHttpService('https://crm/data')
        expect(xrmHttpService.apiUrl).toBe('https://crm/data/')
    })

    it('does not append additional slash to apiDataUrl', () => {
        const xrmHttpService = new XrmHttpService('https://crm/data/')
        expect(xrmHttpService.apiUrl).toBe('https://crm/data/')
    })
})
