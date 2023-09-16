import { XrmHttpService } from '.'
import { RetrieveMultipleResponse } from '../models'

export async function retrieveAll<T = any>(xrmHttp: XrmHttpService, partialUrl: string): Promise<T[]> {
  const entities: T[] = []

  let response = await xrmHttp.GET<RetrieveMultipleResponse>(partialUrl)
  response.value.forEach(item => entities.push(item))

  if (response['@odata.nextLink']) {
    while (response['@odata.nextLink']) {
      response = await xrmHttp.GET<RetrieveMultipleResponse>(response['@odata.nextLink'])
      response.value.forEach(item => entities.push(item))
    }
  }

  return entities
}
