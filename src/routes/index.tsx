import RegistrationPage from "../views/Auth/register"
import LoginPage from "../views/Auth/login"
import Home from "../views/home"

export const AUTH_ROUTES = [
  {
    path: '/',
    component: <LoginPage />
  },
  {
    path: '/Registration',
    component: <RegistrationPage />
  },

]

export const MAIN_ROUTES = [
  {
    path: '/home',
    component: <Home />,
    title: 'Overview'
  },
  //   {
  //     path: '/subscriptions',
  //     component: <SubscriptionsList />,
  //     roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  //     title: 'Subscriptions'
  //   }
]
