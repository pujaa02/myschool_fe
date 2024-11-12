import { useLoginAPI } from 'modules/Auth/services/auth.service';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLazyGetLoggedUserQuery } from 'redux-toolkit/api/userApi';
import { LoginFormFields, loginMethod } from '../types/index.types';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import {
  setCurrentStep,
  setTwoFactor,
  setUserData,
} from 'redux-toolkit/slices/authSlice';
import { LOGIN_STEP } from 'constants/index';
import { convertBtoA } from 'utils/util';

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
      navigate(PRIVATE_NAVIGATION.dashboard.view);
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
  const isVerified = async () => {
    const { data, error } = await getLoggedInUserAPI({});
    if (!error && data) {
      const { two_factor_enabled, two_factor_verified } = data;

      if (data.user?.user_organizations?.length === 0) {
        dispatch(setCurrentStep({ currentStep: LOGIN_STEP.COMPANY_DETAILS }));
      } else if (data.user && !data.user.verified) {
        dispatch(setCurrentStep({ currentStep: LOGIN_STEP.VERIFY_EMAIL }));
      } else if (two_factor_enabled && !two_factor_verified) {
        dispatch(setTwoFactor({ twoFactorEnable: true }));
      } else if (
        !two_factor_enabled ||
        (two_factor_enabled && two_factor_verified)
      ) {
        const { user } = data; // permissions
        dispatch(setUserData({ user }));
        // dispatch(setPermissions(permissions));
        // await userOrDescendantUserOptions(user);
        dispatch(setCurrentStep(undefined));
      } else {
        //
      }
    } else if (data && data?.two_factor_enabled && !data?.two_factor_verified) {
      dispatch(setTwoFactor({ twoFactorEnable: true }));
    } else {
      dispatch(setCurrentStep({ currentStep: LOGIN_STEP.COMPANY_DETAILS }));
    }
  };

  return {
    loginUser,
    isVerified,
    loggedInUserLoading,
    formLoading,
  };
};
