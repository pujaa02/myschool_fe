// ** Import Packages **
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// ** Redux **
import {
  getAuth,
  getCurrentUser,
} from '../../../redux-toolkit/slices/authSlice';
import {
  PRIVATE_NAVIGATION,
  PUBLIC_NAVIGATION,
} from '../../../constants/navigation.constant';

interface Props {
  children: JSX.Element;
}

const RequiresUnAuth = ({ children }: Props) => {
  const location = useLocation();
  // ** Hooks **
  const {
    isAuthenticated,
    // twoFactorEnable,
    // twoFactorVerified,
  } = useSelector(getAuth);
  const user = useSelector(getCurrentUser);
  const isUserVerified: boolean = !!user && user.verified;

  if (isAuthenticated && isUserVerified) {
    return <Navigate to={PRIVATE_NAVIGATION.dashboard.view} />;
  }

  if (
    isAuthenticated &&
    // twoFactorEnable &&
    // !twoFactorVerified &&
    location.pathname !== PUBLIC_NAVIGATION.towFactorAuth
  ) {
    return (
      <Navigate
        to={PUBLIC_NAVIGATION.towFactorAuth}
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default RequiresUnAuth;
