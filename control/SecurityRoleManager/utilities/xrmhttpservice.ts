export class XrmHttpService {
    constructor (
        private readonly apiUrl: string
    ) {
        if (!this.apiUrl.endsWith('/')) this.apiUrl += '/'
    }

    public async GET<T = any>(partialUrl: string): Promise<T> {
        return await this.executeRequest('GET', partialUrl)
    }

    public async POST(partialUrl: string, data?: any) {
        return await this.executeRequest('POST', partialUrl, data)
    }

    public async DELETE(partialUrl: string, data?: any) {
        return await this.executeRequest('DELETE', partialUrl, data)
    }

    private async executeRequest(method: string, partialUrl: string, data?: any): Promise<any | void> {
        return new Promise((resolve, reject) => {
            // Check if the request is already a full url.. then leave it as is.
            const url = 
                partialUrl.startsWith('http') ? partialUrl
                : this.apiUrl + '/' + partialUrl

            const xhr = new XMLHttpRequest()
            xhr.open(method, url, true)
            
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Accept', 'application/json')
            xhr.setRequestHeader('OData-MaxVersion', '4.0')
            xhr.setRequestHeader('OData-Version', '4.0')
            xhr.setRequestHeader('Prefer', 'Microsoft.Dynamics.CRM.formattedvalue')
            
            xhr.onload = () => {
                if (xhr.status < 200 || xhr.status >= 300) {
                    reject({
                        message: xhr.statusText,
                        errorCode: xhr.status,
                        details: xhr.response,
                    })
                }
                else if (xhr.response) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    resolve(void 0)
                }
            }
            
            xhr.onerror = () => {
                reject({
                    message: xhr.statusText,
                    errorCode: xhr.status,
                    details: xhr.response,
                })
            }
            
            if (data) xhr.send(JSON.stringify(data))
            else xhr.send()
        })
    }
}
