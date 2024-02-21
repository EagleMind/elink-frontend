import { useState } from 'react'
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

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/makeInvoice" element={<InvoiceForm />} />
            {/* Add more private routes here */}
          </Route>
        </Route>
      </Routes>

    </AuthProvider>
  )
}

export default App
