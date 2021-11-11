import * as React from 'react'
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner'
import { Stack } from '@fluentui/react/lib/Stack'
import { ScrollablePane } from '@fluentui/react/lib/ScrollablePane'
import { SearchBox } from '@fluentui/react/lib/SearchBox'
import { Dropdown, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown'
import { Label } from '@fluentui/react/lib/Label'
import { Row } from './row'
import { SecurityRoleService, getActiveBusinessUnits } from '../data'
import { EntityReference } from '../models'
import { ResourceStrings } from '../strings'
import { SecurityRoleMap, XrmHttpService } from '../utilities'

export interface IAppProps {
    apiDataUrl: string
    resourceStrings: ResourceStrings
    etn: string | null
    id: string | null
    businessUnitId: string | null
    businessUnitName: string | null
    crossBusinessUnitAssignmentEnabled: boolean
}

export function App(props: IAppProps) {
    const { apiDataUrl, resourceStrings, etn, crossBusinessUnitAssignmentEnabled, businessUnitId } = props
    const id = props.id?.toString()

    const xrmHttp = new XrmHttpService(apiDataUrl)
    const securityRoleService = new SecurityRoleService(
        xrmHttp, 
        apiDataUrl, 
        etn!, 
        id!, 
        props.resourceStrings, 
        crossBusinessUnitAssignmentEnabled, 
        businessUnitId!
    )

    const isSupportedEntity = (etn === 'systemuser' || etn === 'team')
    const isCreated = (!!id)

    // setState
    const [loaded, setLoaded] = React.useState(false)
    const [roleMap, setRoleMap] = React.useState<SecurityRoleMap[]>([])
    const [searchText, setSearchText] = React.useState<string>('')
    const [filteredRoleMap, setFilteredRoleMap] = React.useState<SecurityRoleMap[]>([])
    const [businessUnits, setBusinessUnits] = React.useState<EntityReference[]>([])
    const [selectedBusinessUnits, setSelectedBusinessUnits] = React.useState<string[]>([props.businessUnitId!])

    function toggleSecurityRole(id: string) {
        // Store into main set
        const roleMapIndex = roleMap.findIndex(x => x.id === id)
        const isAssigned = !roleMap[roleMapIndex].isAssigned
        roleMap[roleMapIndex].isAssigned = isAssigned
        setRoleMap(roleMap)

        // Store into filtered set
        const filteredRoleMapIndex = filteredRoleMap.findIndex(x => x.id === id)
        if (filteredRoleMapIndex !== -1) {
            filteredRoleMap[filteredRoleMapIndex].isAssigned = isAssigned
            setFilteredRoleMap(filteredRoleMap)
        }
    }

    // Filter the business units when the user selects from the dropdown or changes text
    React.useEffect(() => {
        const rolesForSelectedBusinessUnits = roleMap.filter(x => selectedBusinessUnits.includes(x.businessUnitId))
        if (searchText === '') {
            setFilteredRoleMap(rolesForSelectedBusinessUnits)
        } else {
            setFilteredRoleMap(
                rolesForSelectedBusinessUnits.filter(x => x.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
            )
        }
    }, [loaded, businessUnits, selectedBusinessUnits, searchText])

    // Load the data required for the component
    React.useEffect(() => {
        async function getData() {
            if (isSupportedEntity && isCreated) {
                try {
                    // Get all business units
                    const businessUnits = await getActiveBusinessUnits(xrmHttp)
                    setBusinessUnits(businessUnits)

                    // Get all security roles
                    const roleMap = await securityRoleService.getRoleMap()
                    setRoleMap(roleMap)
                } finally {
                    setLoaded(true)
                }
            } else {
                setLoaded(true)
            }
        }
        getData()
    }, [props.businessUnitId, props.id])

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
            <div style={{ marginBottom: '10px' }}>
                <Label>
                    {resourceStrings.BusinessUnit}
                    <Dropdown
                        disabled={!crossBusinessUnitAssignmentEnabled}
                        multiSelect={true}
                        onChange={(_, current) => {
                            if (selectedBusinessUnits.includes(current?.key! as string)) {
                                setSelectedBusinessUnits(selectedBusinessUnits.filter(x => x !== current?.key as string))
                            } else {
                                setSelectedBusinessUnits([
                                    ...selectedBusinessUnits,
                                    current?.key as string,
                                ])
                            }
                        }}
                        selectedKeys={selectedBusinessUnits}
                        options={[
                            {
                                key: 'currentBusinessUnitHeader',
                                text: resourceStrings.CurrentBusinessUnit,
                                itemType: DropdownMenuItemType.Header
                            },
                            {
                                key: props.businessUnitId!,
                                text: props.businessUnitName!,
                                selected: true,
                                disabled: true,
                            },
                            {
                                key: 'divider_1',
                                text: '-',
                                itemType: DropdownMenuItemType.Divider
                            },
                            {
                                key: 'otherBusinessUnitsHeader',
                                text: resourceStrings.OtherBusinessUnits,
                                itemType: DropdownMenuItemType.Header
                            },
                            ...businessUnits.filter(x => x.id !== props.businessUnitId).map(x => ({
                                key: x.id,
                                text: x.name
                            })),
                        ]} />
                </Label>
                <Label>
                    {resourceStrings.Search}
                    <SearchBox
                        placeholder={resourceStrings.SearchPlaceholder}
                        onChange={e => setSearchText(e?.currentTarget.value ?? '')}
                    />
                </Label>
                <p>
                    {/* <p>...</p> is here for spacing */}
                </p>
            </div>
            <div style={{ height: '400px', position: 'relative' }}>
                <ScrollablePane>
                    <Stack tokens={{ childrenGap: 10 }}>
                        {filteredRoleMap.map(securityRoleMap =>
                            <Row
                                securityRoleService={securityRoleService}
                                key={securityRoleMap.id}
                                securityRoleMap={securityRoleMap}
                                onChange={() => toggleSecurityRole(securityRoleMap.id)} />)}
                    </Stack>
                </ScrollablePane>
            </div>
        </div>
    )

}

function Hr() {
    return <hr style={{ backgroundColor: '#eee', height: '1px', margin: '5px 0px' }} />
}