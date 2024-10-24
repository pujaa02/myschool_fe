// ** React Imports **
import React, { Suspense } from 'react';

// ** component  **
import PageLoader from '../../components/Loaders/PageLoader';

// ** Constant **
import { PUBLIC_NAVIGATION } from '../../constants/navigation.constant';

// ** routes **
import { RouteObjType } from '../../routes';
import SomethingWentWrong from './pages/SomethingWentWrong';

// ** Not Authenticate Pages **
const Login = React.lazy(() => import('../../modules/Auth/pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const NotAuthorized = React.lazy(
  () => import('../../modules/Auth/pages/NotAuthorized')
);
const ForgotPassword = React.lazy(
  () => import('../../modules/Auth/pages/ForgotPassword')
);
const ResetPassword = React.lazy(
  () => import('../../modules/Auth/pages/ResetPasswordPage')
);

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: (
      <Suspense
        fallback={<PageLoader pageLoaderWrapperClassName="!h-full !w-full" />}
      >
        {route.element}
      </Suspense>
    ),
  }));
};

const AuthenticationRoutes = applySuspense([
  {
    path: PUBLIC_NAVIGATION.login,
    element: <Login />,
  },
  {
    path: PUBLIC_NAVIGATION.register,
    element: <Register />,
  },
  {
    path: PUBLIC_NAVIGATION.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: PUBLIC_NAVIGATION.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: PUBLIC_NAVIGATION.notAuthorized,
    element: <NotAuthorized />,
  },
  {
    path: PUBLIC_NAVIGATION.somethingWentWrong,
    element: <SomethingWentWrong />,
  },
]);

export default AuthenticationRoutes;
