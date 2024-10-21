import { Form, Formik, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';

// ** constants **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** redux **
import { useAxiosPost } from 'hooks/useAxios';

// ** validation **
import { ForgotPasswordValidationSchema } from 'modules/Auth/validationSchema';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [forgotPasswordApi, { isLoading }] = useAxiosPost();

  const OnSubmit = async (userData: FormikValues) => {
    if (userData) {
      const forgotPasswordObject = {
        email: userData.email,
        type: 'FORGOT',
      };
      const { error } = await forgotPasswordApi(
        '/auth/forgot-password',
        forgotPasswordObject
      );
      if (!error) {
        navigate(PUBLIC_NAVIGATION.otp, { state: { email: userData.email } });
      }
    }
  };

  return (
    <section className="forgot-password-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="bg-white max-w-[85%] sm:max-w-[510px] max-h-[calc(100dvh-180px)] p-10 rounded-3xl overflow-y-auto my-4 ">
        <h1 className="text-blacktheme text-3xl font-semibold mb-2">
          {t('Auth.ForgotPassword.forgotPasswordTitle')}
        </h1>
        <p className="text-base text-grayText mb-10 mt-4">
          {t('Auth.ForgotPassword.description')}
        </p>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotPasswordValidationSchema()}
          onSubmit={(values) => OnSubmit(values)}
        >
          {({ values }) => (
            <Form>
              <div className="form-group2 mb-6">
                <InputField
                  value={values.email}
                  label={t('Auth.Login.email')}
                  placeholder={t('Auth.ForgotPassword.emailPlaceholder')}
                  type="text"
                  isCompulsory
                  name="email"
                />
              </div>

              <div className="mb-[72px]">
                <Button
                  isLoading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  className={`w-full bg-primary font-medium p-3 text-center text-white rounded-lg hover:bg-secondary transition-all ${
                    isLoading ? 'disabled:opacity-50 pointer-events-none' : ''
                  }`}
                >
                  {t('Auth.ResetPassword.resetPassword')}
                </Button>
              </div>
              <p className="text-center">
                {t('Auth.ForgotPassword.rememberPassword')}
                <Link
                  to={PUBLIC_NAVIGATION.login}
                  className="text-secondary hover:text-primary font-medium"
                >
                  &nbsp; {t('Auth.ForgotPassword.loginText')}
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
