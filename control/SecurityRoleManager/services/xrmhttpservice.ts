export class XrmHttpService {
    constructor(
        private apiUrl: string
    ) {
        if (!this.apiUrl.endsWith('/')) this.apiUrl += '/'
    }

    public async GET(partialUrl: string) {
        const url = this.apiUrl + '/' + partialUrl
        return await this.executeRequest('GET', url)
    }

    public async POST(partialUrl: string, data?: any) {
        const url = this.apiUrl + '/' + partialUrl
        return await this.executeRequest('POST', url, data)
    }

    public async DELETE(partialUrl: string, data?: any) {
        const url = this.apiUrl + '/' + partialUrl
        return await this.executeRequest('DELETE', url, data)
    }

    private async executeRequest(method: string, url: string, data?: any): Promise<any | void> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url, true)
            
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Accept', 'application/json')
            xhr.setRequestHeader('OData-MaxVersion', '4.0')
            xhr.setRequestHeader('OData-Version', '4.0')
            
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
