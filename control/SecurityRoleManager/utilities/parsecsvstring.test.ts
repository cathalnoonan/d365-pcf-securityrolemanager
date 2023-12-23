import { parseCsvString } from './parsecsvstring'

describe('parseCsvString', () => {
    it('should return empty array when given null', () => {
        // @ts-ignore
        const result = parseCsvString(null)
        expect(result).toStrictEqual([])
    })

    it('should return empty array when given empty string', () => {
        const result = parseCsvString('')
        expect(result).toStrictEqual([])
    })

    it('should parse normal csv string using comma by default', () => {
        const str = 'Hello,World'
        const result = parseCsvString(str)
        expect(result).toStrictEqual(['Hello', 'World'])
    })

    it('should trim csv string inputs', () => {
        const str = 'Hello , World'
        const result = parseCsvString(str)
        expect(result).toStrictEqual(['Hello', 'World'])
    })

    it('should parse normal csv string with comma specified as separator', () => {
        const str = 'Hello,World'
        const result = parseCsvString(str, ',')
        expect(result).toStrictEqual(['Hello', 'World'])
    })

    it('should trim csv string inputs with comma specified as separator', () => {
        const str = 'Hello , World'
        const result = parseCsvString(str, ',')
        expect(result).toStrictEqual(['Hello', 'World'])
    })

    it('should parse normal csv string with semi-colon specified as separator', () => {
        const str = 'Hello;World'
        const result = parseCsvString(str, ';')
        expect(result).toStrictEqual(['Hello', 'World'])
    })

    it('should trim csv string inputs with emi-colon specified as separator', () => {
        const str = 'Hello ; World'
        const result = parseCsvString(str, ';')
        expect(result).toStrictEqual(['Hello', 'World'])
    })

    it('should parse array using new line as separator', () => {
        const str = `Hello
        World`
        const result = parseCsvString(str, '\n')
        expect(result).toStrictEqual(['Hello', 'World'])
    })
})
