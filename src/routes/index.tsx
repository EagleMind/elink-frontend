import RegistrationPage from "../views/Auth/register"
import LoginPage from "../views/Auth/login"
import Home from "../views/home"
import ViewInvoices from "../views/Invoices/viewInvoices"

export const AUTH_ROUTES = [
  {
    path: '/login',
    component: <LoginPage />
  },
  {
    path: '/Registration',
    component: <RegistrationPage />
  },

]

export const MAIN_ROUTES = [
  {
    path: '/',
    component: <Home />,
    title: 'Overview'
  },
  {
    path: '/viewInvoices',
    component: <ViewInvoices />,
    title: 'Invoices'
  }
]
