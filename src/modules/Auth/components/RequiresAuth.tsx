// ** Import Packages **
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// ** Redux **
import { RootState } from 'redux-toolkit/store';

// ** Hook **

// ** Type **

// ** Constant **
import { PUBLIC_NAVIGATION } from '../../../constants/navigation.constant';
import { RequiresAuthProps } from '../types/requireAuth.types';
import useAuth from 'hooks/useAuth';
// import TowFactorVerify from '../TowFactorVerify';

const RequiresAuth = ({ children, module, type }: RequiresAuthProps) => {
  // ** Hooks **
  const location = useLocation();
  const authData = useSelector((state: RootState) => state.auth);

  // ** Custom Hooks **
  const { hasAuthorized } = useAuth();
  const userHasPermission = hasAuthorized(); // [{ module, type }]

  const {
    organizationUUID,
    isAuthenticated,
    user,
    twoFactorEnable,
    twoFactorVerified,
  } = authData;
  const isVerified = user && !!user?.verified;

  if (
    isAuthenticated &&
    twoFactorEnable &&
    !twoFactorVerified &&
    location.pathname !== PUBLIC_NAVIGATION.towFactorAuth
  ) {
    return (
      <>
        {children}
        {/* <TowFactorVerify isContinueLoggedIn /> */}
      </>
    );
  }

  // ** Not Logged In **
  if (!isAuthenticated || !organizationUUID || (isVerified && !isVerified)) {
    return <Navigate to={PUBLIC_NAVIGATION.login} state={{ from: location }} />;
  }

  // ** Not Authorized **
  if (module && type && !userHasPermission) {
    return <Navigate to={PUBLIC_NAVIGATION.notAuthorized} />;
  }

  return children;
};

export default RequiresAuth;
