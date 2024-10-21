// ** Packages **
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// ** Redux **
import { getAuth } from 'redux-toolkit/slices/authSlice';
import { getAuthToken } from 'redux-toolkit/slices/tokenSlice';

// ** components **
import PageLoader from 'components/Loaders/PageLoader';

// ** constant **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** services **
import { getActiveUserDataApi } from '../services';

// ** layout */
import AuthLayout from './AuthLayout';

import ErrorBoundary from 'modules/Auth/pages/ErrorBoundary';
import { ErrorBoundary as ErrorBoundaryDependency } from 'react-error-boundary';
// ** lazy **
const Toast = React.lazy(() => import('components/Toast'));
const SocketComponent = React.lazy(
  () => import('components/Socket/SocketComponent')
);

const RequiresUnAuth = () => {
  const { isAuthenticated } = useSelector(getAuth);
  const { token } = useSelector(getAuthToken);
  const pathKeys = Object.keys(PUBLIC_NAVIGATION);
  const { getActiveUser } = getActiveUserDataApi();

  const getUserData = async () => {
    if (
      token &&
      !isAuthenticated &&
      !window.location.href.includes(PUBLIC_NAVIGATION.somethingWentWrong)
    ) {
      await getActiveUser();
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (
    token &&
    isAuthenticated &&
    pathKeys.findIndex(
      (dat: string) => PUBLIC_NAVIGATION[dat] === window.location.pathname
    ) !== -1
  ) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
      <AuthLayout
        isSomethingWentWrong={
          !window.location.href.includes(PUBLIC_NAVIGATION.somethingWentWrong)
        }
      >
        <Suspense fallback={<PageLoader />}>
          <Toast />
          <SocketComponent />
          <Outlet />
        </Suspense>
      </AuthLayout>
    </ErrorBoundaryDependency>
  );
};

export default RequiresUnAuth;
