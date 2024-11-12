// ** external packages **
import { AxiosRequestConfig } from 'axios';

// ** axios hooks **
import {
  useAxiosGet as useGetAuthMutation,
  useAxiosPost as usePostAuthMutation,
} from 'hooks/useAxios';

const AUTH_API_BASE_PATH = '/auth';

export const useLogOutAPI = () => {
  // ** Custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useGetAuthMutation();

  const logOutUser = async (config: AxiosRequestConfig<object> = {}) => {
    return callApi(`${AUTH_API_BASE_PATH}/logout`, config);
  };

  return { logOutUser, isLoading, isError, isSuccess };
};

export const useLoginAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = usePostAuthMutation();

  const loginAPI = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/login`, data, config);
  };

  return { loginAPI, isLoading, isError, isSuccess };
};
