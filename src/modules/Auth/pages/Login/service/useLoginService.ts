import { useLoginAPI } from 'modules/Auth/services/auth.service';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLazyGetLoggedUserQuery } from 'redux-toolkit/api/userApi';
import { LoginFormFields, loginMethod } from '../types/index.types';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { setCurrentStep, setUserData } from 'redux-toolkit/slices/authSlice';
import { convertBtoA } from 'utils/util';
import { setToken } from 'redux-toolkit/slices/tokenSlice';

export const useLoginService = () => {
  // ** hooks **
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ** Custom Hooks **
  const { loginAPI, isLoading: simpleLoginLoading } = useLoginAPI();

  const [getLoggedInUserAPI, { isLoading: loggedInUserLoading }] =
    useLazyGetLoggedUserQuery();
  //   const [accounts] = useState<string[]>();

  // ** states **
  const [currentLoginMethod, setCurrentLoginMethod] = useState<loginMethod>(
    loginMethod.LOGIN
  );
  // login loading manage
  const formLoading = {
    simpleLoginLoader:
      (currentLoginMethod === loginMethod.LOGIN && simpleLoginLoading) ||
      loggedInUserLoading,
  };

  // *** admin login ***
  const loginUser = async (loginData: LoginFormFields) => {
    setCurrentLoginMethod(loginMethod.LOGIN);
    const formData = { ...loginData };
    delete formData.remember;

    const { data, error } = await loginAPI(formData);
    // const {
    //   is_owner,
    //   two_factor_enabled,
    //   valid_pass,
    //   verified,
    //   organizations,
    //   userRole,
    // } = data;

    if (!error && data) {
      setUserRememberToLocal(loginData);
      isVerified(data);
      //   if (
      //     (valid_pass && verified && !two_factor_enabled && organizations) ||
      //     (accounts && accounts.length === 0) ||
      //     (userRole[0] === userRole.ADMIN && is_owner) ||
      //     userRole[0] === userRole.MANAGER
      //   ) {
      //     loginVerifyHandler(data);
      //   } else {
      // navigate(PUBLIC_NAVIGATION.twoFactorAccount, { state: loginData });
      //   }
      // navigate(PRIVATE_NAVIGATION.dashboard.view);
    }
  };

  // *** mark to remember user data store ***
  const setUserRememberToLocal = (loginData: LoginFormFields) => {
    if (loginData.remember) {
      localStorage.setItem(
        'remember-me',
        JSON.stringify({
          ...loginData,
          password: convertBtoA(loginData.password),
        })
      );
    } else {
      localStorage.removeItem('remember-me');
    }
  };

  // *** logged user verify to data ***
  const isVerified = async (resData: any) => {
    if (resData?.user?.verified) {
      dispatch(setToken({ token: resData?.access_token }));
      const { data, error } = await getLoggedInUserAPI({});
      if (!error && data) {
        const { user } = data;
        dispatch(setUserData({ user }));
        dispatch(setCurrentStep(undefined));
      }
    }
    navigate(PRIVATE_NAVIGATION.dashboard.view);
  };

  return {
    loginUser,
    isVerified,
    loggedInUserLoading,
    formLoading,
  };
};
