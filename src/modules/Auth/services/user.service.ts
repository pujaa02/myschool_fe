// ** external packages **
// import { AxiosRequestConfig } from 'axios';
import { FeaturesEnum } from 'constants/common.constant';

// ** axios hooks **
import {
  useAxiosGet as useGetAuthMutation,
  //   useAxiosPost as usePostAuthMutation,
} from 'hooks/useAxios';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'redux-toolkit/slices/authSlice';
import {
  setAccess,
  setPermission,
  setRolePermission,
  setRoles,
} from 'redux-toolkit/slices/rolePermissionSlice';

const USER_API_BASE_PATH = '/users';

// export const useuserGetLoginAPI = () => {
//   // ** custom Hooks **
//   const [callApi, { isLoading, isError, isSuccess }] = useGetAuthMutation();

//   const getLoggedInUserAPI = async (
//     config: AxiosRequestConfig<object> = {}
//   ) => {
//     return callApi(`${USER_API_BASE_PATH}/logged-in-user`, config);
//   };
//   return { getLoggedInUserAPI, isLoading, isError, isSuccess };
// };

export const useuserGetLoginAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useGetAuthMutation();
  const dispatch = useDispatch();
  const getLoggedInUserAPI = async (data: object = {}) => {
    const resp = await callApi(`${USER_API_BASE_PATH}/logged-in-user`, data);
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
      // if (resp.data?.role && resp.data?.user?.role_id)
      //   dispatch(setActiveRole(resp.data.user.role_name));
    }
    return resp;
  };

  return { getLoggedInUserAPI, isError, isLoading, isSuccess };
};
