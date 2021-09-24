import * as React from 'react'
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner'
import { Stack } from '@fluentui/react/lib/Stack'
import { ScrollablePane } from '@fluentui/react/lib/ScrollablePane'
import { Row } from './row'
import { ResourceStrings } from '../strings'
import { SecurityRoleService } from '../services'
import { SecurityRoleMap } from '../utilities'
import { SearchBox } from '@fluentui/react/lib/SearchBox'

export interface IAppProps {
    apiDataUrl: string
    resourceStrings: ResourceStrings
    etn: string | null
    id: string | null
}

export function App(props: IAppProps) {
    const { apiDataUrl, resourceStrings, etn, id } = props

    const securityRoleService = new SecurityRoleService(apiDataUrl, etn!, id!, props.resourceStrings)

    const isSupportedEntity = (etn === 'systemuser' || etn === 'team')
    const isCreated = (!!id)

    // setState
    const [loaded, setLoaded] = React.useState(false)
    const [roleMap, setRoleMap] = React.useState<SecurityRoleMap[]>([])

    // ComponentDidMount
    React.useEffect(() => {
        async function getData() {
            if (isSupportedEntity && isCreated) {
                try {
                    const response = await securityRoleService.getRoleMap()
                    setRoleMap(response)
                } finally {
                    setLoaded(true)
                }
            } else {
                setLoaded(true)
            }
        }
        getData()
    }, [isCreated])

    // Show spinner while loading
    if (!loaded) return (
        <div>
            <div>{resourceStrings.SecurityRoles}</div>
            <Hr />
            <div>
                <Spinner size={SpinnerSize.large} label={resourceStrings.Loading} />
            </div>
        </div>
    )

    // Show a message if the user puts the control on the wrong entity
    else if (!isSupportedEntity) return (
        <div>
            <div>{resourceStrings.SecurityRoles}</div>
            <Hr />
            <div>{resourceStrings.UnsupportedEntity}</div>
        </div>
    )

    // Show a message if the record needs to be created before roles can be associated
    else if (!isCreated) return (
        <div>
            <div>{resourceStrings.SecurityRoles}</div>
            <Hr />
            <div>{resourceStrings.SaveTheRecord}</div>
        </div>
    )

    // Load the Security Roles in a list
    else return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h4 style={{ flexGrow: 1, lineHeight: '1.5rem' }}>
                    {resourceStrings.SecurityRoles}
                </h4>
            </div>
            <Hr />
            <div style={{ height: '400px', position: 'relative' }}>
                <ScrollablePane>
                    <Stack tokens={{ childrenGap: 10 }}>
                        {roleMap.map(securityRoleMap =>
                            <Row
                                securityRoleService={securityRoleService}
                                key={securityRoleMap.id}
                                securityRoleMap={securityRoleMap} />)}
                    </Stack>
                </ScrollablePane>
            </div>
        </div>
    )

}

function Hr() {
    return <hr style={{ backgroundColor: '#eee', height: '1px', margin: '5px 0px' }} />
}