interface CourseCategory {
  id: number;
  name: string;
  slug: string;
}

interface CourseSubCategory {
  id: number;
  name: string;
  slug: string;
}

export type CourseList = {
  id: number;
  title: string;
  description: string;
  priority: string;
  board_id: number;
  card_order: number;
  company: null;
  company_id: number | null;
  course_type: string;
  created_at: string; // Date string in ISO 8601 format
  created_by: number | null;
  deleted_at: string | null; // Date string in ISO 8601 format or null
  language: string;
  manager_id: number | null;
  parent_table_id: number;
  slug: string;
  stage_id: number;
  updated_at: string; // Date string in ISO 8601 format
  category_id: number;
  courseCategory: CourseCategory;
  courseSubCategory: CourseSubCategory;
  createdByUser: User;
  first_name: string;
  last_name: string;
  duration: number;
  end_date: string; // Date string in ISO 8601 format
  expiry_date: string; // Date string in ISO 8601 format
  funded_by: string;
  has_exam: boolean;
  image: string;
  marked_as: string;
  price: number;
  price_in: string;
  start_date: string; // Date string in ISO 8601 format
  status: string;
  sub_category_id: number;
  validity: number;
};

export interface ClientCompanyManager {
  id: number;
  company_id: number;
  manager_id: number;
  company: Company;
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
  vat_number: string;
  is_invoice: boolean;
  accounting_emails: AccountingEmail[];
  ateco_code: string;
  sdi_code: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string | null;
  country: string;
  zip: string;
}

interface AccountingEmail {
  email: string;
  is_primary: boolean;
}

export interface CompanyManagerData {
  id: number;
  user_id: number;
  job_title: string;
  billing_address1: string;
  billing_address2: string;
  billing_city: string;
  billing_country: string;
  billing_state: string;
  billing_zip: string;
  parent_table_id: number | null;
  language: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User;
  company_manager: ClientCompanyManager[];
}

interface User {
  full_name: string;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  contact: string | null;
  profile_image: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip: string | null;
}
