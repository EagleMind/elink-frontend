import React, { Fragment } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideMenu from './sidemenu'
import { MAIN_ROUTES } from '../routes'

const Layout: React.FC = () => {
  const location = useLocation();
  return (
    <Fragment>
      <div className='flex md:hidden'>
        Version mobile n'est pas encore préte pour raison de priorité
      </div>
      <div className="hidden md:flex">
        <SideMenu routes={MAIN_ROUTES}></SideMenu>
        <div className="flex flex-col w-full bg-gray-200 p-5">
          <div className='text-left my-2  '>
            <h1 className=' text-[30px] font-semibold text-gray-600'>{MAIN_ROUTES.map(pathname => { return location.pathname == pathname.path ? pathname.title : null })}</h1>
          </div>
          <main className="flex flex-col  bg-gray-200 h-screen ">
            <div className="border shadow-md ">

              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </Fragment>

  )
}

export default Layout
