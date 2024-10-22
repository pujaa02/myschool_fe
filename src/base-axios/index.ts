// ** Packages **
import { Store } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';

// ** Redux **
import { setToast } from '../redux-toolkit/slices/toastSlice';

// ** Types**
import { ApiResponseType } from './types';

// ** Others **
import { REACT_APP_API_URL } from '../config';
import { apiCallConstant } from '../constants/common.constant';
import { setLogoutData } from '../redux-toolkit/slices/authSlice';
import { clearActiveSidebar } from '../redux-toolkit/slices/sidebarSlice';
import { setToken } from '../redux-toolkit/slices/tokenSlice';

export const Axios = axios.create({ baseURL: `${REACT_APP_API_URL}` });

export const setupAxios = (store: Store) => {
  // logic of set token in header
  Axios.interceptors.request.use((request) => {
    const authToken = store.getState().token?.token || null;
    const language = store.getState().language?.language || null;

    if (request.headers !== undefined && authToken) {
      request.headers.Authorization = `JWT ${authToken}`;
    }
    if (apiCallConstant[language]) {
      request.headers['accept-language'] = `${apiCallConstant[language]}`;
    }

    request.withCredentials = true;
    return request;
  });
  // for toast message setup
  Axios.interceptors.response.use(
    (res) => {
      const { toast } = res.data;
      if (toast) {
        // ----------- set api response toast -----------
        const toastId = new Date().getTime();
        store.dispatch(
          setToast({
            variant: 'Success',
            message: res.data.message,
            type: res.data.responseType,
            id: toastId,
          })
        );
      }
      return res.data;
    },
    (e) => {
      if (e?.response?.status === 401) {
        store.dispatch(setToken({ token: null }));
        store.dispatch(setLogoutData());
        store.dispatch(clearActiveSidebar());
        localStorage.removeItem('persist:PROLEVEN');
        window.location.href = '/auth/login';
      }
      if (
        e.response.status === 400 ||
        e.response.status === 500 ||
        e.response.status === 401 ||
        e.response.status === 422
      ) {
        const { toast } = e.response.data;
        if (toast) {
          // ----------- set api response toast -----------
          const toastId = new Date().getTime();
          store.dispatch(
            setToast({
              message: e.response.data.message,
              variant: 'Warning',
              type: e.response.data.responseType,
              id: toastId,
            })
          );
        }
      }
      if (e?.code === 'ERR_NETWORK') {
        window.location.href = `${
          window.location.protocol
        }//${`${window.location.host}/something-went-wrong`}`;
      }

      throw e.response.data;
    }
  );
};

// ******************
type AxiosArgsType = Readonly<{
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  extraOptions?: AxiosRequestConfig;
}>;

export const axiosBaseQuery = async (args: AxiosArgsType) => {
  try {
    const result = await Axios({
      url: args.url,
      method: args.method,
      data: args.data,
      params: args.params,
      ...args.extraOptions,
    });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as ApiResponseType;
    return {
      error: err,
    };
  }
};

export default axios;
