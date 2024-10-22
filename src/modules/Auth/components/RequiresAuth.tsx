// ** Packages **
import { isEmpty } from 'lodash';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// ** Components **
import Layout from '../../../components/Layout';
import Loaders from '../../../components/Loaders';
// import { PRIVATE_NAVIGATION } from '../../../constants/navigation.constant';

// ** constants **
import { ROLES } from '../../../constants/roleAndPermission.constant';

// ** redux **
import { getCurrentUser } from '../../../redux-toolkit/slices/authSlice';

import ErrorBoundary from '../../../modules/Auth/pages/ErrorBoundary';
import { ErrorBoundary as ErrorBoundaryDependency } from 'react-error-boundary';

// ** lazy **
const Toast = React.lazy(() => import('../../../components/Toast'));
// const SocketComponent = React.lazy(
//   () => import('../../../../components/Socket/SocketComponent')
// );

type Props = {
  children: JSX.Element;
};

const RequiresAuth = (props: Props) => {
  const { children } = props;
  const user = useSelector(getCurrentUser);
  // const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.role_name === ROLES.Teacher && checkProfileSetup()) {
      // navigate(PRIVATE_NAVIGATION.TEA.view.path);
    }
  }, [user]);

  const checkProfileSetup = () => {
    return isEmpty(user?.trainer?.location);
  };

  return (
    <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
      <Layout>
        <Suspense fallback={<Loaders type="SiteLoader" />}>
          <Toast />
          {/* <SocketComponent /> */}
          {children}
        </Suspense>
      </Layout>
    </ErrorBoundaryDependency>
  );
};

export default RequiresAuth;
