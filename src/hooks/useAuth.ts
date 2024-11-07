// ** Import Packages **
import { useDispatch } from 'react-redux';

// ** Redux **
import {
  // getCurrentUserPermissions,
  setLogoutData,
} from 'redux-toolkit/slices/authSlice';

// ** Services **

// ** Type **
// import { permissionOperatorEnum } from 'pages/auth/types/authGuard.types';

// ** Constant **
// import {
//   ActivityPermissions,
//   BasicPermissionTypes,
//   ModuleNames,
//   TagPermissions,
// } from 'constant/permissions.constant';

// ** Other **
// import { isOrganizationOwner } from 'utils/is';
import { persistor } from 'redux-toolkit/store';
import { useNavigate } from 'react-router-dom';
import { useLogOutAPI } from 'modules/Auth/services/auth.service';

const useAuth = () => {
  // ** Hooks **
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const currentUserPermissions = useSelector(getCurrentUserPermissions);
  const { logOutUser } = useLogOutAPI();

  const hasAuthorized = () =>
    // permissions: {
    //   module?: ModuleNames;
    //   type?:
    //     | BasicPermissionTypes
    //     | TagPermissions
    //     | ActivityPermissions
    //     | ModuleNames;
    // }[],
    // operator: permissionOperatorEnum = permissionOperatorEnum.AND
    {
      // const isOrgOwner = isOrganizationOwner();
      // if (isOrgOwner) {
      return true;
      // }

      // if (operator === permissionOperatorEnum.AND) {
      //   return permissions.every((permission) =>
      //     currentUserPermissions.some(
      //       (currModule) =>
      //         currModule.name === permission.module &&
      //         currModule.permissions.find((per) => per.name === permission.type)
      //           ?.status === 'ACTIVE'
      //     )
      //   );
      // }
      // return permissions.some((permission) =>
      //   currentUserPermissions.some(
      //     (currModule) =>
      //       currModule.name === permission.module &&
      //       currModule.permissions.find((per) => per.name === permission.type)
      //         ?.status === 'ACTIVE'
      //   )
      // );
    };

  const logout = async () => {
    try {
      await logOutUser();
      dispatch(setLogoutData());
      persistor.purge();
      navigate('/login');
      window.addEventListener('beforeunload', (e) => {
        window.onbeforeunload = null;
        e.stopImmediatePropagation();
        window.location.replace('/login');
      });
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { hasAuthorized, logout };
};

export default useAuth;
