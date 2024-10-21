import { AxiosRequestConfig } from 'axios';
import { REACT_APP_API_URL } from 'config';
import { useDispatch } from 'react-redux';

// ** constants **
import { FeaturesEnum } from 'constants/common.constant';
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** hooks **
import { useAxiosGet, useAxiosPatch, useAxiosPost } from 'hooks/useAxios';

// ** redux **
import {
  setActiveRole,
  setAuthenticated,
  setCredentials,
} from 'redux-toolkit/slices/authSlice';
import {
  setAccess,
  setPermission,
  setRolePermission,
  setRoles,
} from 'redux-toolkit/slices/rolePermissionSlice';
import { clearToken } from 'redux-toolkit/slices/tokenSlice';

/*
 User Login Api
 */
export const useUserLoginApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const loginUserApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${REACT_APP_API_URL}/auth/login`, data, config);
  };

  return { loginUserApi, isError, isLoading, isSuccess };
};

export const getActiveUserDataApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const dispatch = useDispatch();
  const getActiveUser = async (data: object = {}) => {
    const resp = await callApi(`${REACT_APP_API_URL}/auth/getLoggedIn`, data);
    if (resp?.data) {
      if (resp.data?.user) dispatch(setCredentials({ user: resp.data.user }));
      if (resp.data?.role) dispatch(setRoles(resp.data.role));
      if (resp.data?.permission) dispatch(setPermission(resp.data.permission));

      if (resp?.data?.roleAndPermission) {
        dispatch(setRolePermission(resp.data.roleAndPermission));
        const checkPermission = resp.data.roleAndPermission
          ?.find(
            (data1: { feature_name: string }) =>
              data1.feature_name === FeaturesEnum.User
          )
          ?.access.split(',');
        if (checkPermission) {
          dispatch(setAccess(checkPermission));
        }
      }
      if (resp.data?.role && resp.data?.user?.role_id)
        dispatch(setActiveRole(resp.data.user.role_name));
    }
    return resp;
  };

  return { getActiveUser, isError, isLoading, isSuccess };
};

export const useForgotPasswordApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const forgotPasswordApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const response = await callApi(
      `${REACT_APP_API_URL}/auth/forgot-password`,
      data,
      config
    );
    return response;
  };

  return { forgotPasswordApi, isError, isLoading, isSuccess };
};

export const useOtpVerify = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const otpVerifyApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const response = await callApi(
      `${REACT_APP_API_URL}/auth/otp-verification`,
      data,
      config
    );
    return response;
  };

  return { otpVerifyApi, isError, isLoading, isSuccess };
};

export const useResetPasswordApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const resetPasswordApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const response = await callApi(
      `${REACT_APP_API_URL}/auth/set-password`,
      data,
      config
    );
    return response;
  };

  return { resetPasswordApi, isError, isLoading, isSuccess };
};

export const useRegisterDetailsApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const registerDetail = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const response = await callApi(
      `${REACT_APP_API_URL}/auth/register`,
      data,
      config
    );
    return response;
  };

  return { registerDetail, isError, isLoading, isSuccess };
};

export const useQR = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const get2FAuthQR = async (config: AxiosRequestConfig<object> = {}) => {
    const response = await callApi(`${REACT_APP_API_URL}/auth/2FA/qr`, config);
    return response;
  };

  return { get2FAuthQR, isError, isLoading, isSuccess };
};

export const useVerificationCodeVerify = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const dispatch = useDispatch();
  const verificationCodeApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const response = await callApi(
      `${REACT_APP_API_URL}/auth/2FA/verify`,
      data,
      config
    );
    if (response?.data?.user?.verified) {
      dispatch(setCredentials({ isAuthenticated: true }));
    }
    return response;
  };

  return { verificationCodeApi, isError, isLoading, isSuccess };
};

export const useLogout = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const dispatch = useDispatch();
  const logoutApi = async (
    data: object = {},
    config: AxiosRequestConfig<object> = {}
  ) => {
    await callApi(`${REACT_APP_API_URL}/auth/logout`, data, config);
    dispatch(clearToken());
    dispatch(setAuthenticated({ isAuthenticated: false }));
    setTimeout(() => {
      window.location.href = PUBLIC_NAVIGATION.login;
    }, 0);
  };

  return { logoutApi, isError, isLoading, isSuccess };
};

export const useFuttureInCloud = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const get2FAuthQR = async (config: AxiosRequestConfig<object> = {}) => {
    const response = await callApi(
      `${REACT_APP_API_URL}/futture-in-cloud/auth`,
      config
    );
    return response;
  };

  return { get2FAuthQR, isError, isLoading, isSuccess };
};

export const useFuttureInCloudVerifyToken = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const resetPasswordApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const response = await callApi(
      `${REACT_APP_API_URL}/futture-in-cloud/verifyToken`,
      data,
      config
    );
    return response;
  };

  return { resetPasswordApi, isError, isLoading, isSuccess };
};

export const getAllRolePermissionApi = () => {
  const [callApi, { isSuccess, isError, isLoading }] = useAxiosGet();

  const getAllRolePermission = async (config: AxiosRequestConfig<object> = {}) => {
    const response = await callApi(
      `${REACT_APP_API_URL}/role-permission/get-all`,
      config
    );
    return response;
  };
  return { getAllRolePermission, isError, isLoading, isSuccess };
};
export const usePrivateMemberRegister = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const privateMemberRegister = async (
    url: string,
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(`${REACT_APP_API_URL}${url}`, data, config);
    return resp;
  };

  return { privateMemberRegister, isError, isLoading, isSuccess };
};
export const useUpdateTrainer = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPatch();
  const updateTrainerUser = async (
    url: string,
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(`${REACT_APP_API_URL}${url}`, data, config);
    return resp;
  };

  return { updateTrainerUser, isError, isLoading, isSuccess };
};
