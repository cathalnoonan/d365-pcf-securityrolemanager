import { EntityReference } from '../models'
import { XrmHttpService, retrieveAll } from '../utilities'

export async function getActiveBusinessUnits(xrmHttp: XrmHttpService): Promise<EntityReference[]> {
  const url = '/businessunits?$select=name,businessunitid&$filter=isdisabled eq false&$orderby=name asc'
  const response = await retrieveAll(xrmHttp, url)

  return response.map(x => ({
    etn: 'businessunit',
    id: x.businessunitid,
    name: x.name,
  }))
}
