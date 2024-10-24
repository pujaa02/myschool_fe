import { AxiosRequestConfig } from 'axios';
import { REACT_APP_API_URL } from 'config';
import { FormikValues } from 'formik';
import {
  useAxiosDelete,
  useAxiosGet,
  useAxiosPatch,
  useAxiosPost,
} from 'hooks/useAxios';

export const useUpdateUserStatus = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPatch();
  const updateUserStatusApi = async (
    { username, active, role }: { username: string; active: string; role: number },
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(
      `${REACT_APP_API_URL}/users/${username}`,
      { active, role },
      config
    );
    return resp;
  };

  return { updateUserStatusApi, isError, isLoading, isSuccess };
};

export const useUserCreateApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const userCreateApi = async (
    url: string,
    data: FormikValues,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(`${REACT_APP_API_URL}${url}`, data, config);
    return resp;
  };

  return { userCreateApi, isError, isLoading, isSuccess };
};

export const useUserUpdateApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPatch();
  const userUpdateApi = async (
    url: string,
    data: FormikValues,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(`${REACT_APP_API_URL}${url}`, data, config);
    return resp;
  };
  return { userUpdateApi, isError, isLoading, isSuccess };
};

export const useUserDeleteApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosDelete();
  const userDeleteApi = async (
    url: string,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(`${REACT_APP_API_URL}${url}`, config);
    return resp;
  };

  return { userDeleteApi, isError, isLoading, isSuccess };
};

export const useGetUser = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const getUsersApi = async (
    url: string,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(`${REACT_APP_API_URL}${url}`, config);
    return resp;
  };
  return { getUsersApi, isError, isLoading, isSuccess };
};

export const useGetAllUserByRole = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const getAllUserByRole = async (
    url: string,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(`${REACT_APP_API_URL}${url}`, config);
    return resp;
  };
  return { getAllUserByRole, isError, isLoading, isSuccess };
};

export const useUserBulkCreateApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const userCreateApi = async (
    url: string,
    data: FormikValues,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const resp = await callApi(`${REACT_APP_API_URL}${url}`, data, config);
    return resp;
  };

  return { userCreateApi, isError, isLoading, isSuccess };
};
