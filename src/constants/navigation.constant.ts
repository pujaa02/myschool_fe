import { FeaturesEnum, PermissionEnum } from './common.constant';

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
export const PRIVACY_POLICY = 'https://www.proleven.com/privacy-policy';
export const TERMS_AND_CONDITION =
  'https://formazione.proleven.com/term-conditions/';

export const EXAM_NAVIGATION: { [key: string]: string } = Object.freeze({
  exam: '/exam/:slug',
  examRetest: '/exam/:slug/:participateCode',
  examForm: '/exam/form/:examSlug/:participateSlug',
  examSurvey: '/exam/survey/:participateId/:surveySlug',
  survey: '/survey/:participateId/:surveySlug',
  surveyParticipants: '/survey/:slug',
  examSubmit: '/exam/complete',
});

export const PRIVATE_NAVIGATION = Object.freeze({
  expense: {
    view: {
      path: '/expense',
      feature: FeaturesEnum.Expense,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/expense/:slug',
      feature: FeaturesEnum.Expense,
      permission: PermissionEnum.Update,
    },
  },
  trainerInvoice: {
    list: {
      path: '/trainer-invoice',
      feature: FeaturesEnum.TrainerInvoice,
      permission: PermissionEnum.View,
    },
    currentMonthOrder: {
      view: {
        path: '/current-month-invoice',
        feature: FeaturesEnum.TrainerInvoice,
        permission: PermissionEnum.View,
      },
    },
    previousMonthOrder: {
      view: {
        path: '/previous-invoice',
        feature: FeaturesEnum.TrainerInvoice,
        permission: PermissionEnum.View,
      },
    },
  },
  reports: {
    list: {
      path: '/reports',
      feature: FeaturesEnum.Report,
      permission: PermissionEnum.View,
    },
  },
  invoice: {
    view: {
      path: '/invoice',
      feature: FeaturesEnum.Invoice,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/invoice/add',
      feature: FeaturesEnum.Invoice,
      permission: PermissionEnum.Create,
    },
    addParams: {
      path: '/invoice/add/:companyDataId/:orderId',
      feature: FeaturesEnum.Invoice,
      permission: PermissionEnum.Create,
    },
  },
  creditNotes: {
    list: {
      path: '/invoice/credit-notes',
      feature: FeaturesEnum.Invoice,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/credit-notes/:slug',
      feature: FeaturesEnum.Invoice,
      permission: PermissionEnum.Create,
    },
  },
  quoteProducts: {
    list: {
      path: '/quote-products',
      feature: FeaturesEnum.Quote,
      permission: PermissionEnum.View,
    },
    view: {
      path: '/quote-products/:slug',
      feature: FeaturesEnum.Quote,
      permission: PermissionEnum.View,
    },
  },
  multiPipeline: {
    pipelineA: {
      view: { path: '/pipeline-a' },
    },
  },
  systemLogs: {
    view: {
      path: '/system-logs',
      feature: FeaturesEnum.SystemLog,
      permission: PermissionEnum.View,
    },
  },
  order: {
    list: {
      path: '/order',
      feature: FeaturesEnum.Order,
      permission: PermissionEnum.View,
    },
    view: {
      path: '/order/view/:slug',
      feature: FeaturesEnum.Order,
      permission: PermissionEnum.View,
    },
  },
  quotes: {
    list: {
      path: '/quotes',
      feature: FeaturesEnum.Quote,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/quotes/:companySlug/add',
      feature: FeaturesEnum.Quote,
      permission: PermissionEnum.Create,
    },
    edit: {
      path: '/quotes/:slug',
      feature: FeaturesEnum.Quote,
      permission: PermissionEnum.Update,
    },
    view: {
      path: '/quotes/view/:slug',
      feature: FeaturesEnum.Quote,
      permission: PermissionEnum.View,
    },
  },
  companyManager: {
    courses: {
      list: {
        path: '/manager/courses',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    myCourses: {
      list: {
        path: '/manager/my-courses',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    myCoursesDetails: {
      list: {
        path: '/manager/my-courses/:slug',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    attendeeList: {
      list: {
        path: '/attendee',
        feature: FeaturesEnum.CourseParticipates,
        permission: PermissionEnum.View,
      },
    },
    attendeeDetails: {
      view: {
        path: '/attendee/:slug',
        feature: FeaturesEnum.CourseParticipates,
        permission: PermissionEnum.View,
      },
    },
    coursdetails: {
      list: {
        path: '/manager/courses/:slug',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    trackCourse: {
      list: {
        path: '/manager/my-courses/track/:slug',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    calendar: {
      view: {
        path: '/manager/calendar',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    requestCourse: {
      list: {
        path: '/manager/request-courses',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
      add: {
        path: '/manager/add-request-courses',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
      requestedCourses: {
        path: '/manager/requested-courses/:slug',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
  },
  privateIndividual: {
    courses: {
      list: {
        path: '/private-individual/courses',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    myCourses: {
      list: {
        path: '/private-individual/my-courses',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    myCoursesDetails: {
      list: {
        path: '/private-individual/my-courses/:slug',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    coursdetails: {
      list: {
        path: '/private-individual/courses/:slug',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    trackCourse: {
      list: {
        path: '/private-individual/my-courses/track/:slug',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
    calendar: {
      view: {
        path: '/private-individual/calendar',
        feature: FeaturesEnum.User,
        permission: PermissionEnum.View,
      },
    },
  },
  notFoundPage: '/404',
  dashboard: {
    view: {
      path: '/',
    },
  },
  userProfile: {
    accountSettings: {
      path: '/account-settings',
      feature: FeaturesEnum.AccountSetting,
      permission: PermissionEnum.View,
    },
    viewProfile: {
      path: '/view-profile',
      feature: FeaturesEnum.User,
      permission: PermissionEnum.View,
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
  ticketsManagement: {
    view: {
      path: '/tickets',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  coursesManagement: {
    view: {
      path: '/courses',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    navigationView: {
      path: '/courses/category/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    category: {
      path: '/courses/category',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    courseManagement: {
      path: '/course-management',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    addCourse: {
      path: '/course-management/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.Create,
    },
    addCourseBundle: {
      path: '/course-management/bundle/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.Create,
    },
    resources: {
      path: '/resources',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    courseTemplates: {
      path: '/course/templates',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    viewCourseTemplates: {
      path: 'courses/template/view/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    addCourseTemplates: {
      path: '/course/templates/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    courseViewDetail: {
      path: '/courses/view/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    companyParticipantAttendance: {
      path: '/courses/company-participant/attendance/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    attendanceTimeSheet: {
      path: '/courses/company/attendance-timesheet',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    courseCompanyList: {
      path: '/courses/company-list/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    courseBundle: {
      path: '/course-bundle',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    templateBundle: {
      path: '/template-bundle',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    viewCourseBundle: {
      path: '/course-bundle/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    viewTemplateBundle: {
      path: '/template-bundle/:slug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    attendeeExamResult: {
      path: '/course/attendees/:courseSlug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    attendeeViewResult: {
      path: '/attendee/exam-result/:examSlug/:examId',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    attendeeCourseParticipate: {
      path: 'attendee/view/participate/:courseSlug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    misMatchAttendee: {
      path: '/attendee/mismatch/:misMatchSlug',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    room: {
      path: '/room',
      feature: FeaturesEnum.CourseInvitations,
      permission: PermissionEnum.View,
    },
    surveyTemplate: {
      list: {
        path: '/survey-template',
        feature: FeaturesEnum.SurveyTemplate,
        permission: PermissionEnum.View,
      },
      add: {
        path: '/survey-template/add',
        feature: FeaturesEnum.SurveyTemplate,
        permission: PermissionEnum.Create,
      },
      edit: {
        path: '/survey-template/:slug',
        feature: FeaturesEnum.SurveyTemplate,
        permission: PermissionEnum.Create,
      },
      view: {
        path: '/survey-template/view/:slug',
        feature: FeaturesEnum.SurveyTemplate,
        permission: PermissionEnum.View,
      },
    },
    certificateTemplate: {
      list: {
        path: '/certificate-template',
        feature: FeaturesEnum.SurveyTemplate,
        permission: PermissionEnum.View,
      },
      add: {
        path: '/certificate-template/add',
        feature: FeaturesEnum.SurveyTemplate,
        permission: PermissionEnum.View,
      },
      versionList: {
        path: '/certificate-template/version/:slug',
        feature: FeaturesEnum.SurveyTemplate,
        permission: PermissionEnum.View,
      },
    },
  },
  emailTemplates: {
    view: {
      path: '/email-templates',
      feature: FeaturesEnum.User,
      permission: PermissionEnum.View,
    },
  },
  settings: {
    view: {
      path: '/settings',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  notifications: {
    view: {
      path: '/notifications',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  chat: {
    view: {
      path: '/chat',
      feature: FeaturesEnum.Chat,
      permission: PermissionEnum.View,
    },
  },
  calendar: {
    view: {
      path: '/calendar',
      feature: FeaturesEnum.CalendarEvent,
      permission: PermissionEnum.View,
    },
  },
  clientsManagement: {
    company: {
      list: {
        path: '/clients/company',
        feature: FeaturesEnum.Company,
        permission: PermissionEnum.View,
      },
      add: {
        path: '/clients/company/add',
        feature: FeaturesEnum.Company,
        permission: PermissionEnum.View,
      },
      edit: {
        path: '/clients/company/:slug',
        feature: FeaturesEnum.Company,
        permission: PermissionEnum.View,
      },
      view: {
        path: '/clients/company/view/:slug',
        feature: FeaturesEnum.Company,
        permission: PermissionEnum.View,
      },
    },
    managers: {
      list: {
        path: '/clients/managers',
        feature: FeaturesEnum.CompanyManager,
        permission: PermissionEnum.View,
      },
      view: {
        path: '/clients/managers/:slug',
        feature: FeaturesEnum.CompanyManager,
        permission: PermissionEnum.View,
      },
    },
    members: {
      list: {
        path: '/clients/members',
        feature: FeaturesEnum.PrivateIndividual,
        permission: PermissionEnum.View,
      },
      view: {
        path: '/clients/members/:slug',
        feature: FeaturesEnum.PrivateIndividual,
        permission: PermissionEnum.View,
      },
    },
    attendee: {
      list: {
        path: '/clients/attendee',
        feature: FeaturesEnum.Attendee,
        permission: PermissionEnum.View,
      },
      view: {
        path: '/clients/attendee/:slug',
        feature: FeaturesEnum.Attendee,
        permission: PermissionEnum.View,
      },
    },
  },
  sendMails: {
    view: {
      path: '/send-mail',
      feature: FeaturesEnum.User,
      permission: PermissionEnum.View,
    },
  },
  projectManagementStatic: {
    view: {
      path: '/project-management-static',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  projectManagement: {
    view: {
      path: '/project-management',
      feature: FeaturesEnum.ProjectManagement,
      permission: PermissionEnum.View,
    },
  },
  projectManagementDetails: {
    view: {
      path: '/project-management-details',
      feature: FeaturesEnum.ProjectManagement,
      permission: PermissionEnum.View,
    },
  },
  coursePipeline: {
    view: {
      path: '/course-pipeline',
      feature: FeaturesEnum.CoursePipeline,
      permission: PermissionEnum.View,
    },
  },
  staticFile: {
    view: {
      path: '/static',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  static2: {
    view: {
      path: '/static2',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  static3: {
    view: {
      path: '/static3',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  // static5: {
  //   view: {
  //     path: '/static5',
  //     feature: FeaturesEnum.ProjectManagement,
  //     permission: PermissionEnum.View,
  //   },
  // },

  static4: {
    view: {
      path: '/static4',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  static5: {
    view: {
      path: '/static5',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  companyManagerDashboard: {
    view: {
      path: '/company-manager-dashboard',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },

  trainerDatabase: {
    view: {
      path: '/users/trainer',
      feature: FeaturesEnum.Trainer,
      permission: PermissionEnum.View,
    },
  },
  codes: {
    view: {
      path: '/codes',
      feature: FeaturesEnum.Code,
      permission: PermissionEnum.View,
    },
  },
  atecoCodes: {
    view: {
      path: '/ateco-codes',
      feature: FeaturesEnum.AtecoCode,
      permission: PermissionEnum.View,
    },
  },

  trainerRegister: {
    view: {
      path: '/auth/trainer-register',
      feature: FeaturesEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  trainerCourses: {
    view: {
      path: '/trainer-courses',
      feature: FeaturesEnum.TrainerCourse,
      permission: PermissionEnum.View,
    },
    attendanceView: {
      path: '/courses/attendance/:slug',
      feature: FeaturesEnum.TrainerCourse,
      permission: PermissionEnum.View,
    },
    attendeeInPerson: {
      path: '/courses/attendee/:mode/:slug',
      feature: FeaturesEnum.CourseAttendanceSheet,
      permission: PermissionEnum.View,
    },
    // attendeeVideoConference: {
    //   path: '/courses/attendee/:mode/:slug',
    //   feature: FeaturesEnum.CourseAttendanceSheet,
    //   permission: PermissionEnum.View,
    // },
    mainAttendanceSheet: {
      path: '/courses/main-attendance/:slug',
      feature: FeaturesEnum.CourseAttendanceSheet,
      permission: PermissionEnum.View,
    },
    courseInvite: {
      path: '/courses/invitation',
      feature: FeaturesEnum.TrainerCourse,
      permission: PermissionEnum.View,
    },
    courseView: {
      path: '/trainer/courses/view/:slug',
      feature: FeaturesEnum.TrainerCourse,
      permission: PermissionEnum.View,
    },
  },
  salesRepCourses: {
    view: {
      path: '/course/view',
      feature: FeaturesEnum.SalesRepCourse,
      permission: PermissionEnum.View,
    },
    courseView: {
      path: '/courses/view/:slug',
      feature: FeaturesEnum.SalesRepCourse,
      permission: PermissionEnum.View,
    },
  },
  trainerBundleView: {
    view: {
      path: '/trainer/course-bundle/:slug',
      feature: FeaturesEnum.CourseBundle,
      permission: PermissionEnum.View,
    },
  },
  courseRequest: {
    view: {
      path: '/sales/course-request',
      feature: FeaturesEnum.CourseRequest,
      permission: PermissionEnum.View,
    },
  },
  paymentTerms: {
    view: {
      path: '/payment-terms',
      feature: FeaturesEnum.PaymentTerms,
      permission: PermissionEnum.View,
    },
  },
  accountingCompany: {
    list: {
      path: '/clients/company',
      feature: FeaturesEnum.AccountingCompany,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/clients/company/add',
      feature: FeaturesEnum.AccountingCompany,
      permission: PermissionEnum.Create,
    },
    edit: {
      path: '/clients/company/:slug',
      feature: FeaturesEnum.AccountingCompany,
      permission: PermissionEnum.Update,
    },
    view: {
      path: '/clients/company/view/:slug',
      feature: FeaturesEnum.AccountingCompany,
      permission: PermissionEnum.View,
    },
  },
  salesRep: {
    course: {
      path: '/courses/template/view/:slug',
      feature: FeaturesEnum.CourseRequest,
      permission: PermissionEnum.View,
    },
  },
  unknownAttendeeListing: {
    list: {
      path: '/courses/unknown-company-list',
      feature: FeaturesEnum.Attendee,
      permission: PermissionEnum.View,
    },
  },
});

// ** Example **

// setting: {
//   view: "/setting",
//   generalSettings: {
//     view: "/setting/general-setting",
//     personalInformation: {
//       view: "/setting/general-setting/personal-information",
//       profile: {
//         view: "/setting/general-setting/personal-information/profile",
//       },
//       localSettings: {
//         view: "/setting/general-setting/personal-information/local-settings",
//       },
//       manage2FA: {
//         view: "/setting/general-setting/personal-information/manage-2fa",
//       },
//     },
//     companyInformation: {
//       view: "/setting/general-setting/company-information",
//     },
//     branchInformation: {
//       view: "/setting/general-setting/branch-information",
//     },
//   }
// }
