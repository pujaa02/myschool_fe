// import { FeaturesEnum, PermissionEnum } from './common.constant';

export const PUBLIC_NAVIGATION: { [key: string]: string } = Object.freeze({
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  verifyAccount: '/auth/verify-account',
  resetPassword: '/auth/reset-password',
  notFoundPage: '/404',
  notAuthorized: '/auth/not-authorized',
  futtureInCloud: '/auth',
  somethingWentWrong: '/something-went-wrong',
});

export const PRIVATE_NAVIGATION = Object.freeze({
  notFoundPage: '/404',
  dashboard: {
    view: {
      path: '/',
    },
  },
});
