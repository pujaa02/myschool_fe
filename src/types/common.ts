import { IconTypes } from 'components/Icon';
import { FormikValues } from 'formik';

export interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  option?: object;
  role?: string;
}

export type RoleFields = {
  id?: number;
  key: string;
  title: string;
  isChecked: boolean;
};

export type StatusFields = {
  id?: number;
  key: string;
  title: string;
  isChecked: boolean;
};

export enum TokenProvider {
  ZOOM = 'zoom',
  FACEBOOK = 'facebook',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  GOOGLE_CALENDAR = 'google_calendar',
  MICROSOFT = 'microsoft',
  GOOGLE_MAIL = 'gmail',
  OFFICE_365_CALENDAR = 'outlook_calendar',
  OTHER = 'other',
  SMTP = 'smtp',
  All = 'all',
  OUTLOOK = 'outlook',
}

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export type FilterStatus = {
  courseType?: string[];
  courseCode?: string[];
  courseStatus?: string[];
  courseCategory?: string[];
  companies?: string[];
  trainingSpecialist?: string[];
};

export type SetFieldValue = <
  K extends keyof FormikValues,
  V extends FormikValues[K],
>(
  field: string,
  value: V,
  shouldValidate?: boolean
) => void;

export type Role =
  | 'Admin'
  | 'TrainingSpecialist'
  | 'Trainer'
  | 'Company'
  | 'CompanyManager'
  | 'SalesRep'
  | 'Accounting'
  | 'PrivateIndividual';

export interface TabProps {
  uniqueKey: string;
  title: string;
  component: JSX.Element;
  icon?: IconTypes;
}
