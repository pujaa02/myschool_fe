import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import InputField from 'components/FormElement/InputField';
import PhoneNumberInput from 'components/FormElement/PhoneNumberInput';
import ReactSelect from 'components/FormElement/ReactSelect';

import { Modal } from 'components/Modal/Modal';

import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';

import { useQueryGetFunction } from 'hooks/useQuery';

import {
  ManagerCompany,
  ManagerInitialProps,
  ManagersDetailsProps,
} from 'modules/Client/types';

import { ROLES } from 'constants/roleAndPermission.constant';
import { useAxiosPatch, useAxiosPost } from 'hooks/useAxios';
import _ from 'lodash';
import { ManagerValidationSchema } from 'modules/Client/validation';
import { useEffect, useRef } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';

export const AddEditManagerModal = ({
  modal,
  data,
  refetch,
  role,
}: ManagersDetailsProps) => {
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);
  const { response, isLoading: getCompaniesDataLoading } = useQueryGetFunction(
    `/companies`,
    { option: { dropdown: true, label: 'name' }, role: role?.toString() }
  );
  const [clientCreateApi, { isLoading: creatingClientLoading }] = useAxiosPost();
  const [clientUpdateApi, { isLoading: updatingClientLoading }] = useAxiosPatch();
  const formikRef = useRef<FormikProps<FormikValues>>();

  const initialValues: ManagerInitialProps = {
    first_name: data?.user?.first_name ?? '',
    last_name: data?.user?.last_name ?? '',
    job_title: data?.job_title ?? '',
    email: data?.user?.email ?? '',
    contact: data?.user?.contact ?? '',
    role: role?.toString(),
    companies: Array.isArray(data?.company_manager)
      ? (data?.company_manager ?? [])
          .map(({ company }: { company: ManagerCompany }) => company?.id)
          .filter((id) => id !== undefined)
      : [],
  };

  useEffect(() => {
    if (data?.user?.contact) {
      if (!isValidPhoneNumber(data?.user?.contact.toString())) {
        // Ensure formikRef.current is not null or undefined
        if (formikRef.current) {
          // Set field error for 'contact' field
          formikRef.current.setFieldError('contact', 'Contact invalid');
        }
      }
    }
  }, [data]);

  const OnSubmit = async (managers: FormikValues) => {
    if (managers) {
      const filteredManagers = managers?.companies?.filter(
        (value: string) => value !== undefined
      );
      const managerData = {
        ...managers,
      };
      if (!_.isEmpty(managers?.companies)) {
        managerData.companies = managers?.companies && filteredManagers?.join(',');
      } else {
        delete managerData.companies;
      }

      const formData = new FormData();
      Object.entries(managerData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (data) {
        const response = await clientUpdateApi(
          `/managers/${data?.user?.username}`,
          managerData
        );
        if (response.data) {
          modal.closeModal();
          refetch();
        }
      } else {
        const response = await clientCreateApi(`/managers`, managerData);
        if (response.data) {
          modal.closeModal();
          refetch();
        }
      }
    }
  };
  const handleSubmitRef = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };
  return (
    <Modal
      headerTitle={
        data
          ? t('ClientManagers.clientForm.editTitle')
          : t('ClientManagers.clientForm.addTitle')
      }
      modal={modal}
      showFooter
      footerButtonTitle={t('Button.cancelButton')}
      footerSubmitButtonTitle={data ? t('editFooterTitle') : t('addFooterTitle')}
      footerSubmit={handleSubmitRef}
      closeOnOutsideClick
      isSubmitLoading={creatingClientLoading || updatingClientLoading}
    >
      <Formik
        validateOnMount
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ManagerValidationSchema()}
        onSubmit={(values) => OnSubmit(values)}
        innerRef={formikRef as React.Ref<FormikProps<FormikValues>>}
      >
        {({ values, errors }) => (
          <Form className="grid lg:grid-cols-2 gap-4">
            <InputField
              placeholder={t(
                'ClientManagers.clientForm.fieldInfos.firstNamePlaceHolder'
              )}
              type="text"
              isCompulsory
              value={values.first_name}
              label={t('ClientManagers.clientForm.fieldInfos.firstName')}
              name="first_name"
              isLoading={getCompaniesDataLoading}
            />
            <InputField
              placeholder={t(
                'ClientManagers.clientForm.fieldInfos.lastNamePlaceHolder'
              )}
              type="text"
              isCompulsory
              value={values.last_name}
              label={t('ClientManagers.clientForm.fieldInfos.lastName')}
              name="last_name"
              isLoading={getCompaniesDataLoading}
            />
            <InputField
              placeholder={t(
                'ClientManagers.clientForm.fieldInfos.jobTitlePlaceHolder'
              )}
              type="text"
              isCompulsory
              value={values.job_title}
              label={t('ClientManagers.clientForm.fieldInfos.jobTitle')}
              name="job_title"
              isLoading={getCompaniesDataLoading}
            />
            <div>
              <PhoneNumberInput
                isCompulsory
                placeholder={t(
                  'ClientManagers.clientForm.fieldInfos.contactPlaceHolder'
                )}
                label={t('ClientManagers.clientForm.fieldInfos.contact')}
                name="contact"
                isLoading={getCompaniesDataLoading}
                isUpdateForm={!!data?.user?.contact}
              />
              {data?.user?.contact && (
                <span className="error-message">{errors?.contact as string}</span>
              )}
            </div>

            <InputField
              parentClass="col-span-2"
              placeholder={t(
                'ClientManagers.clientForm.fieldInfos.emailPlaceHolder'
              )}
              type="text"
              isCompulsory
              value={values.email}
              label={t('ClientManagers.clientForm.fieldInfos.email')}
              name="email"
              isLoading={getCompaniesDataLoading}
              isDisabled={user?.role_name !== ROLES.Admin && !!data?.user?.email}
            />
            <div className="col-span-2">
              <ReactSelect
                name="companies"
                options={response?.data}
                placeholder={t(
                  'ClientManagers.clientForm.fieldInfos.companyPlaceHolder'
                )}
                label={t('ClientManagers.clientForm.fieldInfos.companies')}
                isMulti
                isLoading={getCompaniesDataLoading}
              />
              {!data && !getCompaniesDataLoading && (
                <div className="xl:col-span-2">
                  <Link
                    to={PRIVATE_NAVIGATION.clientsManagement.company.list.path}
                    state={{ isAddForm: true }}
                    className="text-ic_1 text-base inline-block cursor-pointer underline mt-3"
                  >
                    {t('ClientManagers.clientForm.fieldInfos.addCompanyLink')}
                  </Link>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
