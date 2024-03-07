import RegistrationPage from "../views/Auth/register"
import LoginPage from "../views/Auth/login"
import Home from "../views/home"
import PaymentLinksContainer from "../layout/containers/paymentLinks"
import ViewInvoicesContainer from "../layout/containers/invoices/viewInvoices"
import CreateAndEditInvoice from "../views/Invoices/createInvoice"
import PaymentLinkDashboard from "../views/paymentLinks/linkPerformanceView"

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
    path: '/createInvoice',
    component: <CreateAndEditInvoice />,
    title: 'Créer une facture'
  },
  {
    path: '/editInvoice/:invoiceId',
    component: <CreateAndEditInvoice />,
    title: 'Modifier une facture'
  },
  {
    path: '/paymentLinks',
    component: <PaymentLinksContainer />,
    title: 'Liens de paiments'
  },
  {
    path: '/getPaymentLinkDetails/:paymentlinkId',
    component: <PaymentLinkDashboard />,
    title: 'Liens de paiments'
  },
]
