import React, { Fragment, useEffect, useState } from 'react'
import UserListTable from '../../../components/table'
import talentServices from '../../../services/talentServices'
const Home: React.FC = () => {
  const [talents, setTalents] = useState<[]>([])
  const getTalents = async () => {
    const talents = await talentServices.getTalents()
    setTalents(talents)
  }
  useEffect(() => {
    getTalents()
  }, [])
  return (
    <Fragment>
      {/* <Stats StatsCubes={<StatsCubes />} Chart={<Chart></Chart>}></Stats> */}
      <UserListTable data={talents} columns={Object.keys(talents)}></UserListTable>
    </Fragment>
  )
}

export default Home
