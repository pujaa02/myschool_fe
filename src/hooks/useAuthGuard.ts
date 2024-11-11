// ** external packages **
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetLoggedUserQuery } from 'redux-toolkit/api/userApi';
import { getAuth, setAuthenticated, setAuthInitialized, setCredentials } from 'redux-toolkit/slices/authSlice';

// ** redux **


// ** services **


const useAuthGuard = () => {
  let abortFlag = false;

  // ===================== Hooks =======================
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthInitialized } = useSelector(getAuth);

  // ** APIS **
  const [getLoggedInUserAPI, { isLoading }] = useLazyGetLoggedUserQuery();

  useEffect(() => {
    loadUser();
    return () => {
      abortFlag = true;
    };
  }, []);

  const loadUser = async () => {
    if (!isAuthenticated && !isAuthInitialized) {
      const organizationUUID = localStorage.getItem('organization_uuid');
      if (organizationUUID) {
        const { data, error } = await getLoggedInUserAPI({});

        if (!error && data && !abortFlag) {
          const { user, two_factor_enabled, two_factor_verified } = data; // permissions,
          if (
            !two_factor_enabled ||
            (two_factor_enabled && two_factor_verified)
          ) {
            dispatch(setCredentials({ user }));
            // dispatch(setPermissions(permissions));
            // dispatch(setNotificationInterval(NOTIFICATION_INTERVAL_TIME));
          }
        }

        if (
          error &&
          (error as { data: { statusCode: number } })?.data?.statusCode === 5001
        ) {
          dispatch(setAuthenticated({ isAuthenticated: true }));
        }
      }
      dispatch(setAuthInitialized());
    }
  };

  return {
    isLoading,
    isAuthenticated,
    isAuthInitialized,
  };
};

export default useAuthGuard;
