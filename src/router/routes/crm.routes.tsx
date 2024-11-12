import React from 'react';
import {
  PRIVATE_NAVIGATION,
  PUBLIC_NAVIGATION,
} from 'constants/navigation.constant';
import { RouteAttribute } from 'router/RouteComponent';

const Login = React.lazy(() => import('../../modules/Auth/pages/Login/index'));

const NotAuthorized = React.lazy(
  () => import('../../modules/Auth/pages/NotAuthorized')
);

// ** Dashboard Routes
const Dashboard = React.lazy(() => import('../../modules/DashBoard'));

export const publicRoutes = [
  { path: PUBLIC_NAVIGATION.login, component: <Login /> },

  // { path: PUBLIC_NAVIGATION.register, component: <Register /> },
  // { path: PUBLIC_NAVIGATION.forgotPassword, component: <ForgotPassword /> },
];

export const generalRoutes = [
  { path: PUBLIC_NAVIGATION.notAuthorized, component: <NotAuthorized /> },
];
// ** For Authenticated user access **
export const privateRoutes: RouteAttribute[] = [
  {
    path: PRIVATE_NAVIGATION.dashboard.view,
    name: `Dashboard`,
    component: <Dashboard />,
  },
];
