// ** libraries **
import { Form, Formik, FormikValues } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';

// ** constant **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** hooks **
import { useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** validation **
import { LoginValidationSchema } from 'modules/Auth/validationSchema';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginUserApi, { isLoading }] = useAxiosPost();
  const loginInitialValue = { email: '', password: '', is_remember: false };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const OnSubmit = async (userData: FormikValues) => {
    if (userData) {
      const loginData = {
        email: userData.email,
        password: userData.password,
        is_remember: userData.is_remember,
      };
      const response = await loginUserApi('/auth/login', loginData);
      if (!response?.data?.user?.secret_2fa && response?.data?.access_token) {
        navigate(PUBLIC_NAVIGATION.qr, {
          state: {
            token: response.data.access_token,
            is_remember: userData.is_remember,
          },
        });
      } else if (response?.data?.user?.secret_2fa && response.data.access_token) {
        navigate(PUBLIC_NAVIGATION.verifyCode, {
          state: {
            secret: response?.data?.user?.secret_2fa,
            token: response.data.access_token,
            is_remember: userData.is_remember,
          },
        });
      }
    }
  };

  useEffect(() => {
    navigate(PUBLIC_NAVIGATION.login);
  }, []);

  return (
    <section className="login-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="bg-white max-w-[85%] sm:max-w-[510px] max-h-[calc(100dvh-180px)] p-10 rounded-3xl overflow-y-auto my-4 auth-scroll">
        <h1 className="text-dark text-3xl font-semibold mb-2">
          {t('Auth.Login.signInText')}
        </h1>
        <p className="text-base text-grayText mb-10 mt-4">
          {t('Auth.Login.welcomeMessage')}
        </p>
        <Formik
          initialValues={loginInitialValue}
          validationSchema={LoginValidationSchema()}
          onSubmit={(values) => OnSubmit(values)}
        >
          {({ values, setFieldValue }) => (
            <div className="form-group2">
              <Form>
                <div className="grid grid-cols-1 gap-4">
                  <InputField
                    placeholder={t('Auth.Login.emailPlaceholder')}
                    type="text"
                    value={values.email}
                    label={t('Auth.Login.email')}
                    name="email"
                  />

                  <InputField
                    placeholder={t('Auth.Login.passwordPlaceholder')}
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    icon={
                      <Button
                        className="cursor-pointer w-5 h-5 text-grayText"
                        onClickHandler={() => setShowPassword(!showPassword)}
                      >
                        <Image
                          iconClassName="w-full h-full"
                          iconName={showPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                        />
                      </Button>
                    }
                    label={t('Auth.Login.password')}
                    name="password"
                  />
                </div>
                <div className="text-primary mt-4 mb-10 flex justify-between">
                  <Checkbox
                    name="is_remember"
                    onChange={() => {
                      setFieldValue('is_remember', !values.is_remember);
                    }}
                    check={values.is_remember}
                    text={t('Auth.Login.isRemember')}
                    labelClass="text-primary !text-base hover:text-secondary transition-all"
                  />
                  <Link
                    to={PUBLIC_NAVIGATION.forgotPassword}
                    className="hover:text-secondary transition-all"
                  >
                    {t('Auth.Login.forgotPasswordText')}
                  </Link>
                </div>
                <div>
                  <Button
                    isLoading={isLoading}
                    disabled={isLoading}
                    type="submit"
                    value={t('Auth.Login.loginButtonText')}
                    className={`w-full bg-primary font-medium p-3 text-center text-white rounded-lg hover:bg-secondary transition-all  ${
                      isLoading ? 'disabled:opacity-50 pointer-events-none' : ''
                    }`}
                  />
                </div>
                <div className="flex mx-auto px-2 mt-5 justify-center">
                  <p className="text-secondaryTextColor">
                    {t('Auth.Login.newUser')} &nbsp;
                  </p>
                  <Link
                    to={PUBLIC_NAVIGATION.register}
                    className="text-secondary transition-all "
                  >
                    {t('Auth.Login.createAnAccount')}
                  </Link>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default Login;
