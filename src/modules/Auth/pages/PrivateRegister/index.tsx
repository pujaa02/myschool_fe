// ** libraries **
import { Form, Formik, FormikValues } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import PhoneNumberInput from 'components/FormElement/PhoneNumberInput';

// ** constants **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** hooks **
import { useAxiosPost } from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';

// ** types **
import { PrivateMembersInitialProps } from 'modules/Client/types';

// ** validation schema **
import { MemberValidationSchema } from 'modules/Client/validation';

// ** style **
import '../Register/style/index.css';

const Register = () => {
  const { t } = useTranslation();
  const [privateMemberRegister, { isLoading }] = useAxiosPost();
  const navigate = useNavigate();

  const initialValues: PrivateMembersInitialProps = {
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    codice_fiscale: '',
    job_title: '',
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

      const { error } = await privateMemberRegister(
        `/auth/register/private-individual`,
        {
          ...memberData,
        }
      );
      if (!error) {
        navigate(PUBLIC_NAVIGATION.login);
      }
    }
  };

  return (
    <section className="register-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center px-4">
      <div className="max-w-[510px] ">
        <div className="p-4 md:p-6 bg-white rounded-3xl my-4 no-scrollbar max-h-[calc(100dvh_-_170px)] overflow-auto">
          <h2 className="text-blacktheme text-3xl font-semibold mb-6 2xl:mb-8">
            {t('PrivateMembers.Register')}
          </h2>
          <div>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={MemberValidationSchema()}
              onSubmit={(values) => OnSubmit(values)}
            >
              {({ values }) => (
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
                      'PrivateMembers.clientForm.fieldInfos.codiceFiscalePlaceHolder'
                    )}
                    type="text"
                    isCompulsory
                    value={values.codice_fiscale}
                    label={t('PrivateMembers.clientForm.fieldInfos.codiceFiscale')}
                    name="codice_fiscale"
                  />
                  <PhoneNumberInput
                    isCompulsory
                    placeholder={t(
                      'PrivateMembers.clientForm.fieldInfos.contactPlaceHolder'
                    )}
                    label={t('PrivateMembers.clientForm.fieldInfos.contact')}
                    name="contact"
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
                  />
                  <InputField
                    placeholder={t(
                      'PrivateMembers.clientForm.fieldInfos.rolePlaceHolder'
                    )}
                    type="text"
                    isCompulsory
                    value={values.job_title}
                    label={t('PrivateMembers.clientForm.fieldInfos.role')}
                    name="job_title"
                  />
                  <div className="col-span-2">
                    <Button
                      isLoading={isLoading}
                      disabled={isLoading}
                      type="submit"
                      value={t('Button.saveButton')}
                      className={`w-full bg-primary font-medium p-3 text-center text-white rounded-lg hover:bg-secondary transition-all ${
                        isLoading ? 'disabled:opacity-50 pointer-events-none' : ''
                      }`}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex mx-auto justify-center px-2 mt-10">
            <p className="text-graytext">
              {t('Auth.RegisterCommon.alreadyMemberText')}&nbsp;
            </p>
            <Link
              to={PUBLIC_NAVIGATION.login}
              className="text-secondary transition-all "
            >
              {t('Auth.Login.loginButtonText')}
            </Link>
          </div>
          <div className="pt-5 mt-5 border-t border-solid border-borderColor text-center">
            <Link
              to={PUBLIC_NAVIGATION.register}
              className="text-ic_1 text-base inline-block underline underline-offset-4"
            >
              {t('Auth.RegisterCommon.signUpCompanyManager')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
