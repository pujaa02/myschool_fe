import { formatDistanceToNow } from 'date-fns';
import * as locales from 'date-fns/locale';

export const languageConstant: { [key: string]: string } = {
  EN: 'en',
};

export const apiCallConstant: { [key: string]: string } = {
  en: 'english',
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
  { label: 'EN', value: 'en', locale: locales.enUS },
];

export const FeaturesEnum = {
  Dashboard: 'Dashboard',
  Feature: 'Feature',
  Role: 'Role',
  Permissions: 'Permission',
  RolePermission: 'RolePermission',
  User: 'User',
  Admin: 'Admin',
  Teacher: 'Teacher',
  Student: 'Student',
  Class: 'Class',
  Exam: 'Exam',
  Sensation: 'Sensation',
  Leave: 'Leave',
  Committee: 'Committee',
  SystemLog: 'SystemLog',
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
