// ** imports **
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// ** components **
import InputField from 'components/FormElement/InputField';
import PhoneNumberInput from 'components/FormElement/PhoneNumberInput';
import { Modal } from 'components/Modal/Modal';

// ** constants **
import { ROLES } from 'constants/roleAndPermission.constant';

// ** hooks **
import { useAxiosPatch, useAxiosPost } from 'hooks/useAxios';

// ** types **
import {
  PrivateMembersDetailsProps,
  PrivateMembersInitialProps,
} from 'modules/Client/types';

// ** validation **
import { MemberValidationSchema } from 'modules/Client/validation';

// ** redux **
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const AddEditMemberModal = ({
  modal,
  data,
  refetch,
  role,
}: PrivateMembersDetailsProps) => {
  const user = useSelector(getCurrentUser);
  const { t } = useTranslation();
  const [clientCreateApi] = useAxiosPost();
  const [clientUpdateApi] = useAxiosPatch();
  const formikRef = useRef<FormikProps<FormikValues>>();
  const initialValues: PrivateMembersInitialProps = {
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? '',
    email: data?.email ?? '',
    contact: data?.contact ?? '',
    codice_fiscale: data?.private_individual?.codice_fiscale ?? '',
    job_title: data?.private_individual?.job_title ?? '',
  };

  const OnSubmit = async (members: FormikValues) => {
    if (members) {
      const memberData = {
        ...members,
      };
      const formData = new FormData();
      Object.entries(memberData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (data) {
        const { error } = await clientUpdateApi(
          `/private-individual/${data?.username}`,
          {
            ...memberData,
            role,
          }
        );
        if (!error) {
          modal.closeModal();
          refetch();
        }
      } else {
        const { error } = await clientCreateApi(`/private-individual`, {
          ...memberData,
          role,
        });
        if (!error) {
          modal.closeModal();
          refetch();
        }
      }
    }
  };

  useEffect(() => {
    if (data?.contact) {
      if (!isValidPhoneNumber(data?.contact.toString())) {
        // Ensure formikRef.current is not null or undefined
        if (formikRef.current) {
          // Set field error for 'contact' field
          formikRef.current.setFieldError('contact', 'Contact invalid');
        }
      }
    }
  }, [data]);

  const handleSubmitRef = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };
  return (
    <Modal
      headerTitle={
        data
          ? t('PrivateMembers.clientForm.editTitle')
          : t('PrivateMembers.clientForm.addTitle')
      }
      footerButtonTitle={t('Button.cancelButton')}
      showFooter
      footerSubmitButtonTitle={data ? t('editFooterTitle') : t('addFooterTitle')}
      footerSubmit={handleSubmitRef}
      modal={modal}
      closeOnOutsideClick
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={MemberValidationSchema()}
        onSubmit={(values) => OnSubmit(values)}
        innerRef={formikRef as React.Ref<FormikProps<FormikValues>>}
      >
        {({ values, errors }) => (
          <Form className="grid grid-cols-2 gap-4">
            <InputField
              placeholder={t(
                'PrivateMembers.clientForm.fieldInfos.firstNamePlaceHolder'
              )}
              type="text"
              isCompulsory
              value={values.first_name}
              label={t('PrivateMembers.clientForm.fieldInfos.firstName')}
              name="first_name"
            />
            <InputField
              placeholder={t(
                'PrivateMembers.clientForm.fieldInfos.lastNamePlaceHolder'
              )}
              type="text"
              isCompulsory
              value={values.last_name}
              label={t('PrivateMembers.clientForm.fieldInfos.lastName')}
              name="last_name"
            />
            <InputField
              placeholder={t(
                'PrivateMembers.clientForm.fieldInfos.emailPlaceHolder'
              )}
              type="text"
              isCompulsory
              value={values.email}
              label={t('PrivateMembers.clientForm.fieldInfos.email')}
              name="email"
              isDisabled={user?.role_name !== ROLES.Admin && !!data?.email}
            />
            <div>
              <PhoneNumberInput
                isCompulsory
                placeholder={t(
                  'PrivateMembers.clientForm.fieldInfos.contactPlaceHolder'
                )}
                label={t('PrivateMembers.clientForm.fieldInfos.contact')}
                name="contact"
                isUpdateForm={!!data?.contact}
              />
              {data?.contact && (
                <span className="error-message">{errors?.contact as string}</span>
              )}
            </div>
            <InputField
              placeholder={t(
                'PrivateMembers.clientForm.fieldInfos.codiceFiscalePlaceHolder'
              )}
              type="text"
              isCompulsory
              value={values.codice_fiscale}
              label={t('PrivateMembers.clientForm.fieldInfos.codiceFiscale')}
              name="codice_fiscale"
            />
            <InputField
              placeholder={t('PrivateMembers.clientForm.fieldInfos.rolePlaceHolder')}
              type="text"
              isCompulsory
              value={values.job_title}
              label={t('PrivateMembers.clientForm.fieldInfos.role')}
              name="job_title"
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
