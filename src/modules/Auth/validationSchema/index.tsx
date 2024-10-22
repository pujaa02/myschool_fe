import { useTranslation } from 'react-i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';

// ** constants **
// import { IMAGE_SUPPORTED_FORMATS } from '../../../constants/filesupport.constant';

export const LoginValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    email: Yup.string()
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .max(255, t('Auth.LoginValidation.maximumCharacterValidation'))
      .required(t('Auth.LoginValidation.emailReq'))
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
        t('Auth.LoginValidation.invalidEmail')
      ),
    password: Yup.string()
      .required(t('Auth.LoginValidation.passwordRequired'))
      .min(8, t('Auth.LoginValidation.minLengthPass'))
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        t('Auth.LoginValidation.upperAndLowerCase')
      )
      .matches(/\d/, t('Auth.LoginValidation.numberReq'))
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        t('Auth.LoginValidation.specialChar')
      ),
  });
};

const SDI_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

export const RegisterCompanyValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    company_name: Yup.string()
      .required(t('RegisterCompanyValidationSchema.companyName'))
      .max(100, t('RegisterCompanyValidationSchema.compMaxLength')),

    company_registration_number: Yup.string().required(
      t('RegisterCompanyValidationSchema.companyRegistrationNumber')
    ),
    company_accounting_emails: Yup.array().of(
      Yup.object().shape({
        email: Yup.string()
          .email(t('Auth.LoginValidation.invalidEmail'))
          .matches(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            t('UserManagement.validation.invalidEmail')
          )
          .required(
            t(
              'ClientManagement.clientForm.validation.accounting_email_format_validation'
            )
          ),
        is_primary: Yup.boolean().default(false),
      })
    ),
    company_address_country: Yup.string().required(
      t('RegisterCompanyValidationSchema.countryRequired')
    ),
    address_province: Yup.string().required(
      t('RegisterCompanyValidationSchema.provinceRequired')
    ),
    // company_address_city: Yup.string().required(
    //   t('RegisterCompanyValidationSchema.cityRequired')
    // ),
    company_address_l1: Yup.string().required(
      t('RegisterCompanyValidationSchema.addressRequired1')
    ),
    company_address_zip: Yup.number()
      .required(t('RegisterCompanyValidationSchema.zipCodeRequired'))
      .typeError(t('RegisterCompanyValidationSchema.zipCodeValid')),
    company_vat_number: Yup.string().required(
      t('RegisterCompanyValidationSchema.vatValidation')
    ),
    company_ateco_code: Yup.string()
      .matches(/^\d+$/, 'Invalid ateco code')
      .required(t('RegisterCompanyValidationSchema.atecoValidation')),
    company_is_invoice: Yup.string().required(
      t('RegisterCompanyValidationSchema.purchaseOrder')
    ),
    company_sdi_code: Yup.string()
      .required(t('RegisterCompanyValidationSchema.sdiValidation'))
      .matches(
        SDI_REGEX,
        t('RegisterCompanyValidationSchema.sdi_format_validation')
      )
      .length(7, t('RegisterCompanyValidationSchema.sdi_length_validation')),
    vat_type: Yup.string().required(
      t('ClientManagement.clientForm.validation.vat_type_validation')
    ),
  });
};

export const RegisterManagerValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    manager_first_name: Yup.string()
      .required(t('RegisterCompanyValidationSchema.firstName'))
      .max(100, t('RegisterCompanyValidationSchema.compMaxLength')),
    manager_last_name: Yup.string()
      .required(t('RegisterCompanyValidationSchema.lastName'))
      .max(100, t('RegisterCompanyValidationSchema.compMaxLength')),
    manager_contact: Yup.string()
      .required(t('RegisterCompanyValidationSchema.contactNumber'))
      .test(
        'phone-validation',
        t('RegisterCompanyValidationSchema.mobileNumber'),
        (value) => {
          if (value) {
            if (isValidPhoneNumber(value)) return true;
          }
        }
      ),
    manager_job_title: Yup.string().required(
      t('RegisterCompanyValidationSchema.jobTitle')
    ),
    manager_email: Yup.string()
      .email(t('RegisterCompanyValidationSchema.emailValidation'))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .required(t('RegisterCompanyValidationSchema.emailRequired')),
  });
};

export const RegisterAdditionalValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    company_logo: Yup.lazy((value) => {
      return typeof value === 'string'
        ? Yup.string()
        : Yup.mixed()
            .nullable()
            .test(
              'size',
              t('RegAdditionSchema.imageSize'),
              () => !value || (value && value.size <= 1024 * 1024 * 5)
            );
      // .test(
      //   'format',
      //   t('RegAdditionSchema.imageFormat'),
      //   () =>
      //     !value ||
      //     (value && IMAGE_SUPPORTED_FORMATS.includes(value.type))
      // );
    }),
    company_description: Yup.string(),
  });
};

export const ForgotPasswordValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    email: Yup.string()
      .email(t('RegisterCompanyValidationSchema.emailValidation'))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('UserManagement.validation.invalidEmail')
      )
      .required(t('UserManagement.validation.emailRequired')),
  });
};

export const ResetPasswordValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    password: Yup.string()
      .trim()
      .required(t('RegistrationForgotPass.passwordRequired'))
      .matches(/(?=.*[A-Z])/, t('RegistrationForgotPass.capitalPass'))
      .matches(/(?=.*[!@#$%^&()*])/, t('RegistrationForgotPass.specialChar'))
      .matches(/(?=.*[a-z])/, t('RegistrationForgotPass.lowerCase'))
      .matches(/(\d)/, t('RegistrationForgotPass.numberReq'))
      .min(8, t('RegistrationForgotPass.noSpace'))
      .max(15),
    confirmPassword: Yup.string()
      .required(t('RegistrationForgotPass.confirmPassword'))
      .oneOf(
        [Yup.ref('password') || null],
        t('UserProfile.ChangePassword.matchConfirmPass')
      ),
  });
};

export const RegisterTrainerValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    first_name: Yup.string().required(
      t('UserManagement.validation.firstNameRequired')
    ),
    last_name: Yup.string().required(
      t('UserManagement.validation.lastNameRequired')
    ),
    location: Yup.string().required(
      t('Auth.RegisterTrainer.LocationValidation')
    ),
    sub_categories: Yup.array()
      .required(t('Auth.RegisterTrainer.CourseValidation'))
      .min(1, t('Auth.RegisterTrainer.CourseValidation')),
  });
};
