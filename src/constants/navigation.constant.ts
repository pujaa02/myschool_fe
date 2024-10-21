// import { FeaturesEnum, PermissionEnum } from './common.constant';

export const PUBLIC_NAVIGATION: { [key: string]: string } = Object.freeze({
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  verifyAccount: '/auth/verify-account',
  resetPassword: '/auth/reset-password',
  notFoundPage: '/404',
  otp: '/auth/otp',
  qr: '/auth/qr',
  notAuthorized: '/auth/not-authorized',
  verifyCode: '/auth/verify-code',
  privateMember: '/auth/private-member-register',
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
