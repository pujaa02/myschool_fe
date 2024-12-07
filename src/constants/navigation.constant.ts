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
  courses: {
    view: '/courses',
    detailPage: '/courses/:id',
    edit: '/courses/edit/:id',
    add: '/courses',
  },
  students: {
    view: '/students',
    detailPage: '/students/:id',
    edit: '/students/edit/:id',
    add: '/students',
  },
  teachers: {
    view: '/teachers',
    detailPage: '/teachers/:id',
    edit: '/teachers/edit/:id',
    add: '/teachers',
  },
  attendance: {
    view: '/attendance',
    detailPage: '/attendance/:id',
    edit: '/attendance/edit/:id',
    add: '/attendance',
  },
  schedules: {
    view: '/schedules',
    detailPage: '/schedules/:id',
    edit: '/schedules/edit/:id',
    add: '/schedules',
  },
  activities: {
    view: '/activities',
    detailPage: '/activities/:id',
    AddActivityMobileView: '/activities/mobile',
    EditActivityMobileView: '/activities/mobile/:id',
  },
  calendar: { view: '/calendar' },
  exam: {
    view: '/exam',
    detailPage: '/exam/:id',
    edit: '/exam/edit/:id',
    add: '/exam',
  },
  result: {
    view: '/result',
    detailPage: '/result/:id',
    edit: '/result/edit/:id',
    add: '/result',
  },
  committee: {
    view: '/committee',
    detailPage: '/committee/:id',
    edit: '/committee/edit/:id',
    add: '/committee',
  },
  sensation: {
    view: '/sensation',
    detailPage: '/sensation/:id',
    edit: '/sensation/edit/:id',
    add: '/sensation',
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
  settings: {
    view: '/settings',
    generalSettings: {
      personalSettings: { view: '/settings/personal-settings' },
      notifications: {
        notification: {
          view: '/settings/general-settings/notification',
        },
        following: {
          view: '/settings/general-settings/following',
        },
        schedule_email_timing: {
          view: '/settings/general-settings/schedule-email-timing',
        },
      },
    },
    user: {
      view: '/settings/user',
      edit: '/settings/user/edit/:id',
      detailPage: '/settings/user/:id',
    },
  },
});
