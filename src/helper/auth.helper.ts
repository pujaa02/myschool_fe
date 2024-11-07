import { ROLES } from 'constants/roleAndPermission.constant';
import { UserInterface } from 'redux-toolkit/slices/authSlice';

export const isAuthenticate = (currentUser?: UserInterface | null) => {
  if (ROLES.Admin === currentUser?.user_roles?.[0]?.role.name) {
    return true;
  }

  return false;
};
