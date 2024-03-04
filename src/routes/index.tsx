import RegistrationPage from "../views/Auth/register"
import LoginPage from "../views/Auth/login"
import Home from "../views/home"
import PaymentLinksContainer from "../layout/containers/paymentLinks"
import CreateInvoiceContainer from "../layout/containers/invoices/createInvoice"
import ViewInvoicesContainer from "../layout/containers/invoices/viewInvoice"

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
    title: 'Statistiques générale'
  },
  {
    path: '/viewInvoices',
    component: <ViewInvoicesContainer />,
    title: 'Factures'
  },
  {
    path: '/createinvoice',
    component: <CreateInvoiceContainer />,
    title: 'Créer une facture'
  },
  {
    path: '/paymentLinks',
    component: <PaymentLinksContainer />,
    title: 'Liens de paiments'
  },
]
