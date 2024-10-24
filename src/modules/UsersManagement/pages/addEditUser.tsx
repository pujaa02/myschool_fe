// import Button from 'components/Button/Button';
// import InputField from 'components/FormElement/InputField';
// import PhoneNumberInput from 'components/FormElement/PhoneNumberInput';
// import ReactSelect from 'components/FormElement/ReactSelect';
// import { Option, fileInputEnum } from 'components/FormElement/types';
// import { Modal } from 'components/Modal/Modal';
// import { ROLES } from 'constants/roleAndPermission.constant';
// import { Form, Formik, FormikProps, FormikValues } from 'formik';
// import '../../../components/FormElement/style/errorMessage.css';

// import DropZone from 'components/FormElement/DropZoneField';
// import Map from 'components/GoogleMap';
// import { useAxiosPatch, useAxiosPost } from 'hooks/useAxios';
// import _ from 'lodash';
// import { AddEditUserProps, formDataProps } from 'modules/UsersManagement/types';
// import { UserValidationSchema } from 'modules/UsersManagement/validation';
// import { useEffect, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { isValidPhoneNumber } from 'react-phone-number-input';
// import { useSelector } from 'react-redux';
// import { getCurrentUser } from 'redux-toolkit/slices/authSlice';

// export const AddEditUser = ({
//   modal,
//   data,
//   setData,
//   role,
//   refetch,
// }: AddEditUserProps) => {
//   const { t } = useTranslation();
//   const [userCreateApi, { isLoading: isAddLoading }] = useAxiosPost();
//   const [userUpdateApi, { isLoading: isUpdateLoading }] = useAxiosPatch();

//   const user = useSelector(getCurrentUser);

//   const formikRef = useRef<FormikProps<FormikValues>>();
//   const [latLng, setLatLng] = useState<{
//     lat: number;
//     lng: number;
//   }>({
//     lat: 0,
//     lng: 0,
//   });
//   const StatusList: Option[] = [
//     { value: 'ACTIVE', label: t('Status.active') },
//     { value: 'INACTIVE', label: t('Status.inactive') },
//   ];
//   const {
//     first_name = '',
//     last_name = '',
//     email = '',
//     contact = '',
//     active = 'ACTIVE',
//   } = data ?? {};

//   const initialValues = {
//     first_name,
//     last_name,
//     email,
//     contact,
//     role: role?.id,
//     active,
//     ...(role?.title === ROLES.Trainer
//       ? {
//           trainer: {
//             hourly_rate: data?.trainer?.hourly_rate ?? '',
//             travel_reimbursement_fee: data?.trainer?.travel_reimbursement_fee ?? '',
//             rate_by_admin: data?.trainer?.rate_by_admin ?? '',
//             location: data?.trainer?.location ?? '',
//           },
//           trainer_attachment:
//             data?.trainer?.trainerAttachment?.map((item) => item?.attachment_url) ??
//             [],
//         }
//       : {}),
//   };

//   useEffect(() => {
//     if (role?.title === ROLES.Trainer && data) {
//       setData({
//         ...data,
//         trainer: {
//           hourly_rate: data?.trainer?.hourly_rate ?? '',
//           travel_reimbursement_fee: data?.trainer?.travel_reimbursement_fee ?? '',
//           rate_by_admin: data?.trainer?.rate_by_admin ?? '',
//           trainerAttachment: data?.trainer?.trainerAttachment,
//           location: data?.trainer?.location ?? '',
//         },
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (data?.contact) {
//       if (!isValidPhoneNumber(data?.contact.toString())) {
//         // Ensure formikRef.current is not null or undefined
//         if (formikRef.current) {
//           // Set field error for 'contact' field
//           formikRef.current.setFieldError(
//             'contact',
//             t('RegisterCompanyValidationSchema.mobileNumber')
//           );
//         }
//       }
//     }
//   }, [data]);

//   const OnSubmit = async (userData: FormikValues) => {
//     if (userData) {
//       let user: formDataProps = {};
//       if (role?.title === ROLES.Trainer) {
//         let trainer = {};
//         trainer = JSON.stringify({
//           hourly_rate: parseFloat(userData.trainer.hourly_rate),
//           location: userData?.trainer.location || null,
//           longitude: latLng.lng.toString(),
//           latitude: latLng.lat.toString(),
//           travel_reimbursement_fee:
//             parseFloat(userData.trainer.travel_reimbursement_fee) || null,
//           ...(_.isNumber(userData.trainer.rate_by_admin) && {
//             rate_by_admin: userData.trainer.rate_by_admin,
//           }),
//         });
//         user.trainer_attachment = userData.trainer_attachment;
//         user = { ...userData, trainer };
//       } else {
//         user = { ...userData };
//         delete user.trainer;
//       }
//       const formData = new FormData();
//       Object.entries(user).forEach(([key, value]) => {
//         if (key !== 'trainer_attachment')
//           formData.append(key, value as string | Blob);
//       });
//       user?.trainer_attachment?.forEach((item: string) => {
//         formData.append(`trainer_attachment`, item);
//       });
//       if (data) {
//         const { error } = await userUpdateApi(`/users/${data?.username}`, formData);
//         if (!error) {
//           modal.closeModal();
//           refetch();
//         }
//       } else {
//         const { error } = await userCreateApi(`/users`, formData);
//         if (!error) {
//           modal.closeModal();
//           refetch();
//         }
//       }
//     }
//   };

//   const headerTitle = data
//     ? `${t('UserManagement.edit')}  ${role?.title}`
//     : `${t('UserManagement.add')}  ${role?.title}`;
//   return (
//     <Modal
//       headerTitle={headerTitle.replace(/([A-Z])/g, ' $1')}
//       modal={modal}
//       closeOnOutsideClick
//     >
//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         validationSchema={UserValidationSchema(role?.title)}
//         onSubmit={(values) => OnSubmit(values)}
//         innerRef={formikRef as React.Ref<FormikProps<FormikValues>>}
//       >
//         {({ values, errors, setFieldValue }) => (
//           <Form className="grid grid-cols-2 gap-4">
//             <InputField
//               placeholder={t('UserManagement.placeHolders.firstName')}
//               type="text"
//               isCompulsory
//               value={values.first_name}
//               label={t('UserManagement.addEditUser.firstName')}
//               name="first_name"
//             />
//             <InputField
//               placeholder={t('UserManagement.placeHolders.lastName')}
//               type="text"
//               isCompulsory
//               value={values.last_name}
//               label={t('UserManagement.addEditUser.lastName')}
//               name="last_name"
//             />

//             <InputField
//               placeholder={t('UserManagement.placeHolders.email')}
//               type="text"
//               isCompulsory
//               value={values.email}
//               label={t('UserManagement.addEditUser.email')}
//               name="email"
//               isDisabled={user?.role_name !== ROLES.Admin && !!email}
//             />
//             <div>
//               <PhoneNumberInput
//                 isCompulsory
//                 placeholder={t('UserManagement.placeHolders.contact')}
//                 label={t('UserManagement.addEditUser.contact')}
//                 name="contact"
//                 isUpdateForm={!!data?.contact}
//               />
//               {data?.contact && (
//                 <span className="error-message">{errors?.contact as string}</span>
//               )}
//             </div>
//             {role?.title === ROLES.Trainer && (
//               <>
//                 <InputField
//                   placeholder="0000"
//                   type="number"
//                   prefix="€"
//                   isCompulsory
//                   value={values?.trainer?.hourly_rate}
//                   label={t('UserManagement.addEditUser.hourlyRate')}
//                   name="trainer.hourly_rate"
//                 />

//                 <InputField
//                   prefix="€"
//                   placeholder="0000"
//                   type="number"
//                   value={values?.trainer?.travel_reimbursement_fee}
//                   label={t('UserManagement.addEditUser.travelReimbursement')}
//                   name="trainer.travel_reimbursement_fee"
//                 />
//                 <InputField
//                   placeholder="1-5"
//                   type="number"
//                   value={values?.trainer?.rate_by_admin}
//                   label={t('UserManagement.addEditUser.trainerRate')}
//                   name="trainer.rate_by_admin"
//                 />
//               </>
//             )}
//             {data && (
//               <ReactSelect
//                 label={t('UserManagement.addEditUser.status')}
//                 name="active"
//                 options={StatusList}
//               />
//             )}
//             {role?.title === ROLES.Trainer && (
//               <div>
//                 <div>
//                   <DropZone
//                     className="col-span-1"
//                     label={t('Auth.RegisterTrainer.trainerAttachment')}
//                     name="trainer_attachment"
//                     Title={t('browseDocument')}
//                     SubTitle={t('Quote.fileSubTitle', { fileSize: '25MB' })}
//                     setValue={setFieldValue}
//                     acceptTypes="application/pdf"
//                     value={values.trainer_attachment ?? []}
//                     variant={fileInputEnum.LinkFileInput}
//                     isMulti
//                     size={25}
//                   />
//                 </div>
//               </div>
//             )}
//             {role?.title === ROLES.Trainer && (
//               <Map
//                 className="col-span-2"
//                 name="trainer.location"
//                 locationValue={values?.trainer?.location}
//                 isCompulsory
//                 locationLabel={t('Trainer.invoice.trainerLocation')}
//                 setFieldValue={setFieldValue}
//                 setLatLng={setLatLng}
//                 center={{ lat: -3.745, lng: -38.523 }}
//               />
//             )}
//             <div className="flex justify-end gap-4 col-span-2">
//               <Button
//                 className="min-w-[90px]"
//                 variants="whiteBordered"
//                 onClickHandler={() => {
//                   setData(null);
//                   modal.closeModal();
//                 }}
//               >
//                 {t('Button.cancelButton')}
//               </Button>

//               <Button
//                 className={`min-w-[90px] ${
//                   isAddLoading || isUpdateLoading
//                     ? 'disabled:opacity-50 pointer-events-none'
//                     : ''
//                 }`}
//                 disabled={isAddLoading || isUpdateLoading}
//                 type="submit"
//                 variants="primary"
//                 isLoading={isAddLoading || isUpdateLoading}
//               >
//                 {t('Button.submit')}
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </Modal>
//   );
// };

const addEditUser = () => {
  return <h1>hello</h1>;
};
export default addEditUser;
