import React, { Fragment, useCallback, useEffect, useState } from 'react'
import UserListTable from '../../components/table'
import talentServices from '../../services/talentServices'
export default function Home({ }) {
    const [talents, setTalents] = useState<any>([])
    const getTalents = async () => {
        const talents = await talentServices.getTalents()
        setTalents(talents)
        console.log(talents)
    }
    useEffect(() => {
        // getTalents()
        console.log(talents)
    }, [])
    return (
        <Fragment>

            <UserListTable data={talents} columns={[
                "First Name",
                "Last Name",
                "email",
                "Role",
                "Linkedin Profile",
                "Tags",
                "Availability",
                "CV",
                "Status",
                "Flag",
                "Notes"
            ]}></UserListTable>
        </Fragment>
    )
}