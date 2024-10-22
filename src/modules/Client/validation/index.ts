import { IMAGE_SUPPORTED_FORMATS, imageSize } from 'constants/filesupport.constant';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';

/* Company Validation */
const accountingEmailSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    email: Yup.string()
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .required(
        t(
          'ClientManagement.clientForm.validation.accounting_email_format_validation'
        )
      ),
  });
};

export const RegisterCompanyValidationSchema = () => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
  const { t } = useTranslation();
  return Yup.object().shape({
    name: Yup.string()
      .required(t('ClientManagement.clientForm.validation.companyNameValidation'))
      .max(100, 'company_name_format_validation'),
    registration_number: Yup.string()
      .required(
        t('ClientManagement.clientForm.validation.registrationNumberValidation')
      )
      .length(
        8,
        t('ClientManagement.clientForm.validation.registration_length_validation')
      ),
    address_country: Yup.string().required(
      t('ClientManagement.clientForm.validation.countryValidation')
    ),
    // address_city: Yup.string().required(
    //   t('ClientManagement.clientForm.validation.cityValidation')
    // ),
    address_province: Yup.string().required(
      t('RegisterCompanyValidationSchema.provinceRequired')
    ),
    address_zip: Yup.number()
      .typeError(t('ClientManagement.clientForm.validation.zip_format_validation'))
      .positive(
        t('ClientManagement.clientForm.validation.zip_positive_format_validation')
      )
      .required(t('ClientManagement.clientForm.validation.zipcodeValidation')),
    address_l1: Yup.string().required(
      t('ClientManagement.clientForm.validation.companyAddressValidation')
    ),
    company_logo: Yup.lazy((value) => {
      if (!value) {
        return Yup.string().required(
          t('ClientManagement.clientForm.validation.logoValidation')
        );
      }

      if (typeof value === 'string') {
        return Yup.string();
      }
      return Yup.mixed()
        .test(
          'fileSize',
          t('ClientManagement.clientForm.validation.logosizeValidation'),
          () => {
            if (!value) return true;
            return value.size <= 1024 * 1024 * imageSize;
          }
        )
        .test(
          'fileFormat',
          t('ClientManagement.clientForm.validation.logoformatValidation'),
          () => {
            if (!value) return true;
            return IMAGE_SUPPORTED_FORMATS.includes(value.type);
          }
        );
    }),

    sdi_code: Yup.string()
      .required(t('ClientManagement.clientForm.validation.sdiValidation'))
      .matches(
        regex,
        t('ClientManagement.clientForm.validation.sdi_format_validation')
      )
      .length(7, t('ClientManagement.clientForm.validation.sdi_length_validation')),
    vat_number: Yup.string().required(
      t('ClientManagement.clientForm.validation.vatNumberValidation')
    ),
    accounting_emails: Yup.array().of(accountingEmailSchema()),
    is_invoice: Yup.string().required(
      t('ClientManagement.clientForm.validation.selectInvoiceValidation')
    ),
    payment_term: Yup.string().required(
      t('ClientManagement.clientForm.validation.paymentTermValidation')
    ),
    // vat_type: Yup.string().required(
    //   t('ClientManagement.clientForm.validation.vat_type_validation')
    // ),
    managers: Yup.array()
      .min(1, t('ClientManagement.clientForm.validation.managers_format_validation'))
      .required(t('ClientManagement.clientForm.validation.managersRequired')),
  });
};

/* Manager Validation */

export const ManagerValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object({
    first_name: Yup.string().required(
      t('ClientManagers.clientForm.validation.firstNameRequired')
    ),
    last_name: Yup.string().required(
      t('ClientManagers.clientForm.validation.lastNameRequired')
    ),
    job_title: Yup.string().required(
      t('ClientManagers.clientForm.validation.jobTitleRequired')
    ),
    email: Yup.string()
      .email(t('ClientManagers.clientForm.validation.invalidEmail'))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .required(t('ClientManagers.clientForm.validation.emailRequired')),
    contact: Yup.string()
      .required(t('ClientManagers.clientForm.validation.mobileRequired'))
      .test(
        'phone-validation',
        t('ClientManagers.clientForm.validation.invalidContact'),
        (value) => {
          if (value) {
            if (isValidPhoneNumber(value)) return true;
          }
        }
      ),
    // companies: Yup.array()
    //   .required(t('ClientManagers.clientForm.validation.companiesRequired'))
    //   .min(1, t('ClientManagers.clientForm.validation.companies_format_validation')),
  });
};
export const ManagerBulkUploadValidationSchema = (t: TFunction<any, undefined>) => {
  return Yup.object({
    first_name: Yup.string().required(
      t('ClientManagers.clientForm.validation.firstNameRequired')
    ),
    last_name: Yup.string().required(
      t('ClientManagers.clientForm.validation.lastNameRequired')
    ),
    // job_title: Yup.string().required(
    //   t('ClientManagers.clientForm.validation.jobTitleRequired')
    // ),
    email: Yup.string()
      .email(t('ClientManagers.clientForm.validation.invalidEmail'))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .required(t('ClientManagers.clientForm.validation.emailRequired')),
    contact: Yup.mixed()
      .test(
        'is-string-or-number',
        t('PrivateMembers.clientForm.validation.invalidContact'),
        (value) => {
          if (typeof value === 'string') {
            return /^[0-9+\-* ]+$/.test(value);
          }
          if (typeof value === 'number') return true;
          return false;
        }
      )
      .required(t('ClientManagers.clientForm.validation.mobileRequired')),
    // manager: Yup.object().shape({
    //   job_title: Yup.string().required(
    //     t('ClientManagers.clientForm.validation.jobTitleRequired')
    //   ),
    //   companies: Yup.array()
    //     .required(t('ClientManagers.clientForm.validation.companiesRequired'))
    //     .min(
    //       1,
    //       t('ClientManagers.clientForm.validation.companies_format_validation')
    //     ),
    // }),
    // }
    // companies: Yup.array()
    //   .required(t('ClientManagers.clientForm.validation.companiesRequired'))
    //   .min(1, t('ClientManagers.clientForm.validation.companies_format_validation')),
  });
};

export const AttendanceValidationSchema = (t: TFunction<any, undefined>) => {
  return Yup.object({
    first_name: Yup.string().required(
      t('ClientManagers.clientForm.validation.firstNameRequired')
    ),
    last_name: Yup.string().required(
      t('ClientManagers.clientForm.validation.lastNameRequired')
    ),
    job_title: Yup.string().required(
      t('ClientManagers.clientForm.validation.jobTitleRequired')
    ),
    email: Yup.string()
      .email(t('ClientManagers.clientForm.validation.invalidEmail'))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .required(t('ClientManagers.clientForm.validation.emailRequired')),
    mobile_number: Yup.mixed()
      .test(
        'is-string-or-number',
        t('PrivateMembers.clientForm.validation.invalidContact'),
        (value) => {
          if (typeof value === 'string') {
            return /^[0-9+\-* ]+$/.test(value);
          }
          if (typeof value === 'number') return true;
          return false;
        }
      )
      .required(t('ClientManagers.clientForm.validation.mobileRequired')),
    // .test(
    //   'phone-validation',
    //   t('ClientManagers.clientForm.validation.invalidContact'),
    //   (value) => {
    //     if (value) {
    //       if (isValidPhoneNumber(value)) return true;
    //     }
    //   }
    // ),
    code: Yup.string().required(
      t('PrivateMembers.clientForm.validation.codiceFiscaleValidation')
    ),
  });
};
/* Member Validation */

export const MemberValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object({
    first_name: Yup.string().required(
      t('PrivateMembers.clientForm.validation.firstNameRequired')
    ),
    last_name: Yup.string().required(
      t('PrivateMembers.clientForm.validation.lastNameRequired')
    ),
    email: Yup.string()
      .email(t('PrivateMembers.clientForm.validation.invalidEmail'))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .required(t('PrivateMembers.clientForm.validation.emailRequired')),
    contact: Yup.string()
      .required(t('PrivateMembers.clientForm.validation.mobileRequired'))
      .test(
        'phone-validation',
        t('PrivateMembers.clientForm.validation.invalidContact'),
        (value) => {
          if (value) {
            if (isValidPhoneNumber(value)) return true;
          }
        }
      ),
    codice_fiscale: Yup.string().required(
      t('PrivateMembers.clientForm.validation.codiceFiscaleValidation')
    ),
    job_title: Yup.string().required(
      t('PrivateMembers.clientForm.validation.roleValidation')
    ),
  });
};

export const MemberBulkUploadValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object({
    first_name: Yup.string().required(
      t('PrivateMembers.clientForm.validation.firstNameRequired')
    ),
    last_name: Yup.string().required(
      t('PrivateMembers.clientForm.validation.lastNameRequired')
    ),
    email: Yup.string()
      .email(t('PrivateMembers.clientForm.validation.invalidEmail'))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .required(t('PrivateMembers.clientForm.validation.emailRequired')),
    contact: Yup.mixed()
      .test(
        'is-string-or-number',
        t('PrivateMembers.clientForm.validation.invalidContact'),
        (value) => {
          if (typeof value === 'string') {
            return /^[0-9+\-*]+$/.test(value);
          }
          if (typeof value === 'number') return true;
          return false;
        }
      )
      .required(t('PrivateMembers.clientForm.validation.mobileRequired')),
    // .test(
    //   'phone-validation',
    //   t('PrivateMembers.clientForm.validation.invalidContact'),
    //   (value) => {
    //     if (value) {
    //       if (isValidPhoneNumber(value)) return true;
    //     }
    //   }
    // ),
    privateIndividual: Yup.object().shape({
      codice_fiscale: Yup.string().required(
        t('PrivateMembers.clientForm.validation.codiceFiscaleValidation')
      ),
      job_title: Yup.string().required(
        t('PrivateMembers.clientForm.validation.roleValidation')
      ),
    }),
  });
};
