import React from 'react';
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

const Login = React.lazy(() => import('../../modules/Auth/pages/Login'));

const NotAuthorized = React.lazy(
  () => import('../../modules/Auth/pages/NotAuthorized')
);

export const publicRoutes = [
  { path: PUBLIC_NAVIGATION.login, component: <Login /> },

  // { path: PUBLIC_NAVIGATION.register, component: <Register /> },
  // { path: PUBLIC_NAVIGATION.forgotPassword, component: <ForgotPassword /> },
];

export const generalRoutes = [
  { path: PUBLIC_NAVIGATION.notAuthorized, component: <NotAuthorized /> },
];
