import { useSelector } from 'react-redux';
import { getRolesPermission } from 'redux-toolkit/slices/rolePermissionSlice';

export const useRolePermission = (featureName: string, permissionName: string) => {
  const RolePermissions = useSelector(getRolesPermission);
  const checkPermission = RolePermissions.findIndex(
    (data) =>
      data.feature_name === featureName && data.permission_name === permissionName
  );
  return checkPermission > -1;
};
