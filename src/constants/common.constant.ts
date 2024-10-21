import { formatDistanceToNow } from 'date-fns';
import * as locales from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

export const languageConstant: { [key: string]: string } = {
  IT: 'it',
  EN: 'en',
};

export const socketName = {
  SEND_MESSAGE: 'send-message',
  NEW_MESSAGE: 'new-message',
  NEW_ROOM: 'new-room',
  JOIN_ROOM: 'join-room',
  USER_ACTIVE: 'user-active',
  UNREAD_MESSAGE: 'unread-message-count',
};

export const apiCallConstant: { [key: string]: string } = {
  it: 'italian',
  en: 'english',
};

export const ConfirmationChoices = () => {
  const { t } = useTranslation();
  return [
    {
      label: t('confirmationChoices.yesOption'),
      value: 'true',
    },
    {
      label: t('confirmationChoices.noOption'),
      value: 'false',
    },
  ];
};
export const getLocale = (language: string) => {
  const lang = LanguageList.find((item) => {
    return item.value === language;
  })?.locale;
  return lang;
};
export const FormatDateFromNow = (
  formatDate: string,
  addSuffix: boolean,
  language: string
) => {
  return formatDistanceToNow(new Date(formatDate), {
    addSuffix,
    locale: getLocale(language),
  });
};
export const LanguageList = [
  { label: 'IT', value: 'it', locale: locales.it },
  { label: 'EN', value: 'en', locale: locales.enUS },
];

export const FeaturesEnum = {
  Dashboard: 'Dashboard',
  User: 'User',
  CourseInvitations: 'CourseInvitations',
  CourseParticipates: 'CourseParticipates',
  CourseAttendanceSheet: 'CourseAttendanceSheet',
  Sales: 'Sales',
  Feature: 'Feature',
  Role: 'Role',
  Permissions: 'Permission',
  RolePermission: 'RolePermission',
  Academy: 'Academy',
  Chat: 'Chat',
  CalendarEvent: 'CalendarEvent',
  Email: 'Email',
  Quote: 'Quote',
  ProjectManagement: 'ProjectManagement',
  Admin: 'Admin',
  TrainingSpecialist: 'TrainingSpecialist',
  Trainer: 'Trainer',
  Company: 'Company',
  CompanyManager: 'CompanyManager',
  SalesRep: 'SalesRep',
  Accounting: 'Accounting',
  PrivateIndividual: 'PrivateIndividual',
  Code: 'Code',
  AtecoCode: 'AtecoCode',
  TrainerCourse: 'TrainerCourse',
  CoursePipeline: 'CoursePipeline',
  CourseRequest: 'CourseRequest',
  SurveyTemplate: 'SurveyTemplate',
  Attendee: 'Attendee',
  PaymentTerms: 'PaymentTerms',
  SystemLog: 'SystemLog',
  Order: 'Order',
  Invoice: 'Invoice',
  AccountingCompany: 'AccountingCompany',
  AccountSetting: 'AccountSetting',
  CourseViewDetail: 'CourseViewDetail',
  Payment: 'Payment',
  TrainerInvoice: 'trainerInvoice',
  Report: 'Report',
  CourseBundle: 'CourseBundle',
  SalesRepCourse: 'SalesRepCourse',
  Expense: 'Expense',
};

export const PermissionEnum = {
  Update: 'Update',
  Delete: 'Delete',
  Create: 'Create',
  View: 'View',
};

export const DropdownLoaderTypes = {
  Skeleton: 'Skeleton',
  Default: 'Default',
};

export const BulkUploadTypes = {
  User: 'User',
  ClientManager: 'ClientManager',
  PrivateIndividual: 'PrivateIndividual',
  Attendees: 'Attendees',
};
