/* Company Props */

import { Option } from 'components/FormElement/types';

interface User {
  state: string;
  country: string;
  city: string;
  address1: string;
  address2: string;
  zip: string;
  email: string;
}

export interface CompanyDetailsProps {
  name: string;
  registration_number: string;
  user: User;
  description: string;
  logo: string;
  slug: string;
  country: string;
}

export interface CommonType {
  [key: string]: string;
}

export interface CompanyInitialProps {
  ateco_id: number;
  name: string;
  registration_number: string;
  address_l1: string;
  address_l2: string;
  address_zip: string;
  // address_state: string;
  address_country: string;
  address_city: string;
  address_province: string;
  description: string;
  company_logo: string;
  managers: (string | undefined)[];
  ateco_code: string;
  sdi_code: string;
  payment_term: string | number;
  accounting_emails: [{ email: string; is_primary: boolean }];
  is_invoice: boolean;
  vat_number: string;
  role: number;
  vat_type: string;
}
export interface CompanyManager {
  manager?: { job_title: string; user: Manager; user_id?: string };
}
export interface CompanyViewProps {
  accounting_emails?: [{ email: string; is_primary: boolean }];
  address1?: string;
  address2?: string;
  ateco_code?: string;
  sdi_code?: string;
  is_invoice?: boolean;
  name: string;
  ateco_id?: number;
  payment_term_id: string | number;
  vat_number?: string;
  registration_number?: string;
  vat_type?: string;
  company_manager?: CompanyManager[];
  sales_rep?: {
    full_name: string;
    id: number;
    email: string;
    first_name: string;
    username: string;
    contact: string;
    profile_image: string | null;
  };
  company_payment?: {
    id: number;
    name: string;
    payment_mode: string;
    payment_due: string;
    days: number;
    due_days: number;
    due_date: string;
    payment_percentage: number;
    slug: string;
    description: string;
  };
  logo?: string;
  description?: string;
  zip?: string;
  country?: string;
  city?: string;
  state?: string;
  address_province?: string;
  id?: number;
}

export interface CompanyCourseList {
  start_date: string;
  end_date: string;
  expiry_date: string;
  title: string;
  marked_as: string;
  course?: {
    start_date: string;
    end_date: string;
    status: string;
    slug?: string;
    type?: string;
  };
  slug?: string;
}
/* Manager Props */

interface Manager {
  first_name: string;
  full_name: string;
  email: string;
  last_name: string;
  username: string;
  contact: string;
  id: string;
  profile_image: string;
}
export interface EmailData {
  email: string;
  is_primary: boolean;
}
export interface ManagerCompany {
  id: string;
  name: string;
  description?: string;
  accounting_emails?: EmailData[];
  address1?: string;
  address2?: string;
  ateco_code?: string;
  sdi_code?: string;
  is_invoice?: boolean;
  vat_number?: string;
  registration_number?: string;
  logo?: string;
}

export interface ManagerData {
  id: string;
  job_title: string;
  company_manager: { company: ManagerCompany }[];
  company: ManagerCompany;
  companies: Company[];
  user: Manager | null;
  manager: { user: Manager };
}
interface Company {
  id: number;
  name: string;
  uuid: string;
  user_id: number | null;
  legal_name: string | null;
  registration_number: string;
  slug: string;
  website: string | null;
  industry: string | null;
  description: string | null;
  size: string | null;
  logo: string;
}

export interface ManagersDetailsProps {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  data: ManagerData | null;
  setData: React.Dispatch<React.SetStateAction<ManagerData | null>>;
  refetch: () => void;
  role?: string;
}

export interface ManagerInitialProps {
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  contact: string;
  companies: Option[] | string[];
  role?: string;
}

export interface ManagerViewProps {
  id: string;
  manager: {
    job_title: string;
    user: Manager;
  };
}

/* Private Member Types */

export interface PrivateMembersInitialProps {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  codice_fiscale: string;
  job_title: string;
  role?: string;
}
export interface PrivateMembersDetails {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  full_name?: string;
  id?: string;
  private_individual?: {
    job_title: string;
    codice_fiscale: string;
  };
  username?: string;
}

export interface PrivateMembersDetailsProps {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  data: PrivateMembersDetails | null;
  setData: React.Dispatch<React.SetStateAction<PrivateMembersDetails | null>>;
  refetch: () => void;
  role?: string;
}

interface AllCompanyManager {
  id: number;
  user_id: number;
  job_title: string;
  company_manager: {
    company_id: number | string;
    company: CompanyDetailsProps;
  }[];
}

interface CompanyManagerRole {
  id: number;
  name: string;
}

interface ManagerUser {
  id: number;
  username: string;
}

export interface CompanyManagerInfo {
  full_name: string;
  id: number;
  email: string;
  active: string;
  added_by: number;
  address1: string | null;
  address2: string | null;
  birth_date: string | null;
  city: string | null;
  contact: string;
  country: string | null;
  created_at: string;
  date_format: string;
  first_name: string;
  gender: string | null;
  is_head: boolean;
  last_name: string;
  managers: AllCompanyManager[];
  profile_image: string | null;
  user: ManagerUser;
  role: CompanyManagerRole;
  state: string | null;
}
