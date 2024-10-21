type FormCompleteType = {
  complete: boolean;
};

export type ActiveStateType = {
  current?: number;
  companyInfoForm?: FormCompleteType;
  managerInfoForm?: FormCompleteType;
  additionalInfoForm?: FormCompleteType;
};

export type RegisterInitialValueType = {
  company_name: string;
  company_vat_number: string;
  company_legal_name: string;
  company_registration_number: string;
  company_accounting_emails: { email: string; is_primary: boolean }[];
  company_address_l1: string;
  company_address_l2: string;
  company_address_country: string;
  address_province: string;
  company_address_city: string;
  company_address_zip: string;
  company_website: string;
  company_industry: string;
  company_ateco_code: string;
  company_sdi_code: string;
  company_is_invoice: string;
  company_size: string;
  manager_first_name: string;
  manager_last_name: string;
  manager_job_title: string;
  manager_contact: string;
  manager_email: string;
  manager_address_l1: string;
  manager_address_l2: string;
  manager_address_country: string;
  manager_address_state: string;
  manager_address_city: string;
  manager_address_zip: string;
  company_logo: string;
  company_description: string;
  vat_type: string | number;
};
