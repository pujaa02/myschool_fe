// import type { CountryCode } from 'libphonenumber-js/types';
import {
  LoginSchemaError,
  UserSchemaErrorMessage,
} from 'constants/formErrorMessage.constant';
import * as yup from 'yup';
import { TLDs } from 'global-tld-list';
// import { phoneCountryJson } from 'constants/regex.constant';
import 'yup-phone-lite';

const {
  first_name,
  last_name,
  password,
  //  phone,
  email,
  user_role,
} = UserSchemaErrorMessage;

const globalEmailTestValidate = (v: string | null | undefined) => {
  const tld = (v || '').split('.').slice(-1)[0];
  const isValidTLDs = TLDs.indexOf(tld) >= 0;

  if (!isValidTLDs) {
    return false;
  }

  return true;
};

export const basicInfoSchema = {
  first_name: yup
    .string()
    .trim()
    .required(first_name)
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
    .nullable(true),
  last_name: yup
    .string()
    .trim()
    .required(last_name)
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
    .nullable(),
  user_role: yup.string().required(user_role).nullable(true),
  password: yup
    .string()
    .required(password.required)
    .min(12, password.minLengthReq)
    .matches(/[A-Z]/, password.upperReq)
    .matches(/[a-z]/, password.lowerReq)
    .matches(/\d/, password.numberReq)
    .matches(/[\W_]/, password.specialCharReq),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], password.matchReq)
    .required(password.confirm_required),
  // phone: yup
  //   .string()
  //   .test('mobile', phone.valid, (value) => {
  //     if (value !== undefined && value && value.split(' ').length > 1) {
  //       const countryCode: string | undefined = value
  //         ?.split(' ')[0]
  //         .substring(1, value?.split(' ')[0].length)
  //         .toString();
  //       let countryShortCode: CountryCode | CountryCode[] = 'IN';
  //       if (countryCode) countryShortCode = phoneCountryJson[countryCode];

  //       return yup.string().phone(countryShortCode).isValid(value);
  //     }
  //     return true;
  //   })
  //   .nullable(true)
  //   .transform((value, originalVal) => {
  //     if (originalVal && value.split(' ').length === 1) {
  //       return null;
  //     }
  //     return originalVal;
  //   }),
  // mobile: yup
  //   .string()
  //   .test('mobile', phone.valid, (value) => {
  //     if (value !== undefined && value && value.split(' ').length > 1) {
  //       const countryCode: string | undefined = value
  //         ?.split(' ')[0]
  //         .substring(1, value?.split(' ')[0].length)
  //         .toString();
  //       let countryShortCode: CountryCode | CountryCode[] = 'IN';
  //       if (countryCode) countryShortCode = phoneCountryJson[countryCode];

  //       return yup.string().phone(countryShortCode).isValid(value);
  //     }
  //     return true;
  //   })
  //   .nullable(true)
  //   .transform((value, originalVal) => {
  //     if (originalVal && value.split(' ').length === 1) {
  //       return null;
  //     }
  //     return originalVal;
  //   }),
  email: yup
    .string()
    .required(email.required)
    .lowercase()
    .email(email.valid)
    .test('email', email.valid, globalEmailTestValidate)
    .nullable(true),
  // country: yup.string().nullable(true),
  // state: yup.string().nullable(true),
  // zip: yup.string().nullable(true),
  // city: yup.string().nullable(true),
  birth_date: yup.string().nullable(true),
  stringAndNumber: yup.lazy((value) => {
    switch (typeof value) {
      case 'number':
        return yup.number();
      case 'string':
        return yup.string();
      default:
        return yup.mixed();
    }
  }),
};

export const registerSchema = yup
  .object({
    first_name: basicInfoSchema.first_name,
    last_name: basicInfoSchema.last_name,
    password: basicInfoSchema.password,
    confirmPassword: basicInfoSchema.confirmPassword,
    // phone: basicInfoSchema.phone,
    // mobile: basicInfoSchema.mobile,
    email: basicInfoSchema.email,
    user_role: basicInfoSchema.user_role,
    // country: basicInfoSchema.country,
    // state: basicInfoSchema.state,
    // zip: basicInfoSchema.zip,
    // city: basicInfoSchema.city,
    birth_date: basicInfoSchema.birth_date,
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required(LoginSchemaError.email.required)
      .email(LoginSchemaError.email.valid)
      .lowercase(),
    password: yup.string().required(LoginSchemaError.password),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required(LoginSchemaError.email.required)
      .email(LoginSchemaError.email.valid)
      .lowercase(),
  })
  .required();

export const resetPasswordSchema = yup
  .object({
    password: basicInfoSchema.password,
    confirmPassword: basicInfoSchema.confirmPassword,
  })
  .required();
