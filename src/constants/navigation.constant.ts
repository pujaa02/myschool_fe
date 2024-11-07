// import { FeaturesEnum, PermissionEnum } from './common.constant';

import { FeaturesEnum, PermissionEnum } from './common.constant';

export const PUBLIC_NAVIGATION: { [key: string]: string } = Object.freeze({
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  verifyAccount: '/verify-account',
  resetPassword: '/reset-password',
  notFoundPage: '/404',
  notAuthorized: '/not-authorized',
  somethingWentWrong: '/something-went-wrong',
});

export const PRIVATE_NAVIGATION = Object.freeze({
  notFoundPage: '/404',
  dashboard: { view: '/' },
  teacher: {
    view: {
      path: '/',
    },
  },
  usersManagement: {
    view: {
      navigationView: {
        path: '/users/:role',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
      roleView: {
        path: '/users/',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
  },
});
