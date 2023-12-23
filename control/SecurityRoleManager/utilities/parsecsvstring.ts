export function parseCsvString(csvString: string, separator: string = ','): string[] {
    if (!csvString) {
        return []
    }
    return csvString
        .split(separator)
        .map(str => str.trim())
        .filter(str => str)
}
