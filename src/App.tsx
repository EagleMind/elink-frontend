import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './context/auth'
import { Route, Router, Routes } from 'react-router-dom'
import LoginPage from './views/Auth/login'
import PrivateRoute from './routes/privateRouter'
import Home from './views/home'
import Layout from './layout'
import InvoiceForm from './views/Invoices/createInvoice'
import ViewInvoices from './views/Invoices/viewInvoices'
import { AUTH_ROUTES, MAIN_ROUTES } from './routes'

function App() {
  const isLoggedIn = localStorage.getItem('token')
  return (
    <AuthProvider>
      <Routes>
        <Fragment>
          {isLoggedIn ? (
            <Route element={<Layout />}>
              {MAIN_ROUTES.map((route, index) =>

                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              )}
            </Route>
          ) : (
            AUTH_ROUTES.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.component}
              />
            ))
          )}
          <Route path="*" element={null} />
        </Fragment>
      </Routes>

    </AuthProvider>
  )
}

export default App
