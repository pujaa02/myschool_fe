import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

// ** components **
import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import PhoneNumberInput from 'components/FormElement/PhoneNumberInput';

// ** types **
import { RegisterInitialValueType } from 'modules/Auth/pages/Register/types';
import { RegisterComponentProps } from './types';

// ** validation **
import { RegisterManagerValidationSchema } from 'modules/Auth/validationSchema';

const RegisterManagerInfo = ({
  setActive,
  currentStep,
  registerInitialValue,
  setRegisterInitialValue,
}: RegisterComponentProps) => {
  const { t } = useTranslation();

  const OnPrevious = () => {
    setActive((prev) => {
      return {
        ...prev,
        current: currentStep - 1,
        managerInfoForm: { complete: false },
        companyInfoForm: { complete: false },
      };
    });
  };

  const OnSubmit = (data: RegisterInitialValueType) => {
    if (data) {
      setActive((prev) => {
        return {
          ...prev,
          current: currentStep + 1,
          managerInfoForm: { complete: true },
        };
      });
      setRegisterInitialValue((prev) => {
        return {
          ...prev,
          ...data,
        };
      });
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={registerInitialValue}
        validationSchema={RegisterManagerValidationSchema()}
        onSubmit={(values) => OnSubmit(values)}
      >
        {({ values }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                placeholder={t('Auth.RegisterManager.managerFirstNamePlaceHolder')}
                type="text"
                isCompulsory
                value={values.manager_first_name}
                label={t('Auth.RegisterManager.firstname')}
                name="manager_first_name"
              />
              <InputField
                placeholder={t('Auth.RegisterManager.managerLastNamePlaceHolder')}
                type="text"
                isCompulsory
                value={values.manager_last_name}
                label={t('Auth.RegisterManager.lastname')}
                name="manager_last_name"
              />
              <InputField
                placeholder={t('Auth.RegisterManager.managerJobTitlePlaceHolder')}
                type="text"
                isCompulsory
                value={values.manager_job_title}
                label={t('Auth.RegisterManager.jobTitle')}
                name="manager_job_title"
              />

              <PhoneNumberInput
                isCompulsory
                placeholder="(603) 555-0123"
                label={t('Auth.RegisterManager.contactNo')}
                name="manager_contact"
              />

              <InputField
                parentClass="md:col-span-2"
                placeholder={t('Auth.RegisterCompany.companyEmailPlaceHolder')}
                type="text"
                isCompulsory
                value={values.manager_email}
                label={t('Auth.RegisterManager.email')}
                name="manager_email"
              />

              <div className=" col-span-2">
                <p className="text-orange-500 text-m">{t('registerEmail.note')}</p>
              </div>
              <div className="flex my-4 w-full gap-2 justify-center col-span-2">
                <Button
                  variants="grayLight"
                  className="w-full min-w-[150px] justify-center"
                  value={t('Auth.RegisterCommon.previousButtonText')}
                  onClickHandler={OnPrevious}
                />
                <Button
                  variants="primary"
                  className="w-full min-w-[150px] justify-center"
                  type="submit"
                  value={t('Auth.RegisterCommon.nextButtonText')}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterManagerInfo;
