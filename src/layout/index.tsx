import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideMenu from './sidemenu'
import { MAIN_ROUTES } from '../routes'

const Layout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="flex h-screen  w-screen">
      <SideMenu routes={MAIN_ROUTES}></SideMenu>
      <div className="flex flex-col w-full">
        <div className='text-left  p-2 md:gap-8 md:p-6 '>
          <h1 className=' text-[30px] font-semibold text-gray-600'>{MAIN_ROUTES.map(pathname => { return location.pathname == pathname.path ? pathname.title : null })}</h1>
        </div>
        <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 h-full">
          <div className="border shadow-sm rounded-lg">

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
