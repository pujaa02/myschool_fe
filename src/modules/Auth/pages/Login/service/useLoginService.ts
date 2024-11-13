import { useLoginAPI } from 'modules/Auth/services/auth.service';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginFormFields, loginMethod } from '../types/index.types';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { setCurrentStep, setUserData } from 'redux-toolkit/slices/authSlice';
import { convertBtoA } from 'utils/util';
import { setToken } from 'redux-toolkit/slices/tokenSlice';
import { useuserGetLoginAPI } from 'modules/Auth/services/user.service';

export const useLoginService = () => {
  // ** hooks **
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ** Custom Hooks **
  const { loginAPI, isLoading: simpleLoginLoading } = useLoginAPI();

  const { getLoggedInUserAPI, isLoading: loggedInUserLoading } =
    useuserGetLoginAPI();

  // const [getLoggedInUserAPI, { isLoading: loggedInUserLoading }] =
  //   useLazyGetLoggedUserQuery();
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

    if (!error && data) {
      localStorage.setItem('token', data?.access_token);
      setUserRememberToLocal(loginData);
      isVerified(data);
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
    console.log('🚀 ~ isVerified ~ resData:', resData);
    if (resData?.user?.verified) {
      console.log(
        '🚀 ~ isVerified ~ resData?.user?.verified:',
        resData?.user?.verified
      );
      dispatch(setToken({ token: resData?.access_token }));
      const config = {
        headers: {
          Authorization: `jwt ${resData?.access_token}`,
        },
      };
      const { data, error } = await getLoggedInUserAPI(config);
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
