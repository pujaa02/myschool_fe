// import { ROLES } from 'constants/roleAndPermission.constant';
// import { useTranslation } from 'react-i18next';
// import { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';

export const UserValidationSchema = () => {
  // const { t } = useTranslation();
  // let TrainerSchema = {};

  // if (roleValidation && roleValidation === ROLES.Trainer) {
  //   TrainerSchema = {
  //     trainer: Yup.object().shape({
  //       hourly_rate: Yup.number()
  //         .min(0, t('UserManagement.validation.trainerNegativeHourlyRate'))
  //         .max(1000, t('User.hourlyRate.maxPrice.validation'))
  //         .required(t('UserManagement.addEditUser.hourlyRateValidation')),
  //       travel_reimbursement_fee: Yup.number()
  //         .min(0, t('UserManagement.validation.trainerNegativeHourlyRate'))
  //         .max(10000, t('User.travelReimbursement.maxPrice.validation')),
  //       rate_by_admin: Yup.number()
  //         .min(0, t('UserManagement.validation.trainerRateValidation'))
  //         .max(5, t('UserManagement.validation.trainerMaxRateValidation')),
  //       location: Yup.string().required(
  //         t('Auth.RegisterTrainer.LocationValidation')
  //       ),
  //     }),
  //   };
  // }
  const baseSchema = Yup.object().shape({
    first_name: Yup.string().required(
      'UserManagement.validation.firstNameRequired'
    ),
    last_name: Yup.string().required(
      'UserManagement.validation.lastNameRequired'
    ),
    email: Yup.string()
      .email('UserManagement.validation.invalidEmail')
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        'UserManagement.validation.invalidEmail'
      )
      .required('UserManagement.validation.emailRequired'),
    // contact: Yup.string()
    //   .required(t('UserManagement.validation.mobileRequired'))
    //   .test(
    //     'phone-validation',
    //     ('RegisterCompanyValidationSchema.mobileNumber')
    //     // (value) => {
    //     //   if (value) {
    //     //     if (isValidPhoneNumber(value)) return true;
    //     //   }
    //     // }
    //   ),
    role: Yup.string().required('UserManagement.validation.roleRequired'),
    active: Yup.string().required('UserManagement.validation.statusRequired'),
    // ...TrainerSchema,
  });
  return baseSchema;
};

export const UserBulkUploadValidationSchema = () =>
  // roleValidation: string | undefined
  {
    // const { t } = useTranslation();
    // let TrainerSchema = {};

    // if (roleValidation && roleValidation === ROLES.Trainer) {
    //   TrainerSchema = {
    //     trainer: Yup.object().shape({
    //       hourly_rate: Yup.number().required(
    //         t('UserManagement.addEditUser.hourlyRateValidation')
    //       ),
    //       travel_reimbursement_fee: Yup.number(),
    //       rate_by_admin: Yup.number()
    //         .min(0, t('UserManagement.validation.trainerRateValidation'))
    //         .max(5, t('UserManagement.validation.trainerMaxRateValidation')),
    //     }),
    //   };
    // }
    const baseSchema = Yup.object().shape({
      first_name: Yup.string().required(
        'UserManagement.validation.firstNameRequired'
      ),
      last_name: Yup.string().required(
        'UserManagement.validation.lastNameRequired'
      ),
      email: Yup.string()
        .email('UserManagement.validation.invalidEmail')
        .matches(
          /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          'UserManagement.validation.invalidEmail'
        )
        .required('UserManagement.validation.emailRequired'),
      contact: Yup.mixed()
        .required('UserManagement.validation.mobileRequired')
        .test(
          'is-string-or-number',
          'PrivateMembers.clientForm.validation.invalidContact',
          (value) => {
            if (typeof value === 'string') {
              return /^[0-9+\-*]+$/.test(value);
            }
            if (typeof value === 'number') return true;
            return false;
          }
        ),
      // .test(
      //   'phone-validation',
      //   t('RegisterCompanyValidationSchema.mobileNumber'),
      //   (value) => {
      //     if (value) {
      //       if (isValidPhoneNumber(value)) return true;
      //     }
      //   }
      // ),
      // is_head: Yup.string()
      //   .required(('UserManagement.validation.departHeadRequired'))
      //   .test(
      //     'depart-head-validation',
      //     ('UserManagement.validation.departValueValidation')
      //     // (value) => {
      //     //   if (value) {
      //     //     if (
      //     //       value.toLowerCase() === 'true' ||
      //     //       value.toLowerCase() === 'false'
      //     //     )
      //     //       return true;
      //     //   }
      //     // }
      //   ),
      // ...TrainerSchema,
    });
    return baseSchema;
  };
