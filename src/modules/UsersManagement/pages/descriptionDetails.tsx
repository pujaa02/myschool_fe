// import Button from 'components/Button/Button';
// import TextArea from 'components/FormElement/TextArea';
// import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
// import { ROLES } from 'constants/roleAndPermission.constant';
// import { Form, Formik, FormikValues } from 'formik';
// import { useAxiosDelete, useAxiosPost } from 'hooks/useAxios';
// import { useModal } from 'hooks/useModal';
// import { useQueryGetFunction } from 'hooks/useQuery';
// import _ from 'lodash';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
// import { useLanguage } from 'redux-toolkit/slices/languageSlice';
// import { getRoles } from 'redux-toolkit/slices/rolePermissionSlice';
// import { DescriptionDetailsProps, User } from '../types';
// import DescriptionDisplay from './descriptionDisplay';

const DescriptionDetails = () =>
  // { user, t }: DescriptionDetailsProps
  {
    //   const [trainerPost] = useAxiosPost();
    //   const [trainerDelete] = useAxiosDelete();
    //   const deleteModal = useModal();
    //   const [noteSlug, setNoteSlug] = useState<string>();
    //   const CurrentUser = useSelector(getCurrentUser);
    //   const { response, refetch } = useQueryGetFunction('/trainer/notes', {
    //     option: { userId: user?.id, roleId: CurrentUser?.id },
    //   });
    //   const { language } = useSelector(useLanguage);
    //   const initialValues = {
    //     notes: '',
    //   };
    //   const currentRole = useSelector(getRoles).find(
    //     (role) => role.name === ROLES.Admin
    //   );
    //   const OnSubmit = async (values: FormikValues) => {
    //     const data = {
    //       trainer_id: user?.id,
    //       notes: values.notes,
    //       trainer_name: user?.full_name,
    //       role: user?.role_id,
    //     };
    //     const response = await trainerPost(`/trainer/notes`, data);
    //     if (response?.data?.id) {
    //       refetch();
    //       values.notes = '';
    //     }
    //   };
    //   const onDelete = async () => {
    //     if (noteSlug) {
    //       const response = await trainerDelete(
    //         `/trainer/notes/${noteSlug}?role=${currentRole?.id}`,
    //         { trainerName: user?.full_name }
    //       );
    //       if (_.isEmpty(response.error)) {
    //         deleteModal.closeModal();
    //         refetch();
    //       }
    //     }
    //   };

    return (
      <h1>hello discriptiondetails</h1>
      //     <div className="bg-siteBG p-5 rounded-lg flex flex-col gap-y-5">
      //       {response?.data?.data?.length > 0 && (
      //         <DescriptionDisplay
      //           t={t}
      //           descriptionNotes={response?.data?.data}
      //           CurrentUser={CurrentUser as User | null}
      //           storeLang={language}
      //           deleteModal={deleteModal}
      //           setNoteSlug={setNoteSlug}
      //           className="grid grid-cols-2 gap-5 max-h-full"
      //           moreButtonClass=" col-span-2 mt-2"
      //         />
      //       )}
      //       <div className="flex flex-col gap-5 bg-white shadow-md px-5 py-6 rounded-lg">
      //         <Formik
      //           enableReinitialize
      //           initialValues={initialValues}
      //           onSubmit={(values) => OnSubmit(values)}
      //         >
      //           {({ values }) => (
      //             <Form className="flex flex-col gap-4">
      //               <>
      //                 <TextArea
      //                   rows={3}
      //                   placeholder={t('orderCommentTitle')}
      //                   value={values.notes}
      //                   name="notes"
      //                 />
      //                 <Button className="w-fit ml-auto" variants="primary" type="submit">
      //                   {t('SendMail.send')}
      //                 </Button>
      //               </>
      //             </Form>
      //           )}
      //         </Formik>
      //       </div>
      //       {deleteModal.isOpen && (
      //         <ConfirmationPopup
      //           modal={deleteModal}
      //           bodyText={t('deleteDescription')}
      //           variants="primary"
      //           deleteTitle={t('Button.deleteTitle')}
      //           confirmButtonText={t('Button.deleteButton')}
      //           confirmButtonFunction={onDelete}
      //           confirmButtonVariant="primary"
      //           cancelButtonText={t('Button.cancelButton')}
      //           cancelButtonFunction={() => {
      //             setNoteSlug('');
      //             deleteModal.closeModal();
      //           }}
      //         />
      //       )}
      //     </div>
    );
  };
export default DescriptionDetails;
