// ** libraries **
import { Form, Formik, FormikValues } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';

// ** constants **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** hooks */
import { useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// ** validation **
import { ResetPasswordValidationSchema } from 'modules/Auth/validationSchema';
import { setToast } from 'redux-toolkit/slices/toastSlice';
import { customRandomNumberGenerator } from 'utils';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state } = useLocation();

  const navigate = useNavigate();
  const [resetPasswordApi, { isLoading }] = useAxiosPost();

  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (state === null) {
      navigate(PUBLIC_NAVIGATION.login);
    }
  }, [state]);

  const OnSubmit = async (data: FormikValues) => {
    if (data) {
      const resetPassword = {
        password: data.password,
      };
      const config = {
        headers: {
          Authorization: `jwt ${state.access_token}`,
        },
      };
      const response = await resetPasswordApi(
        '/auth/set-password',
        resetPassword,
        config
      );
      if (!response.error) {
        navigate(PUBLIC_NAVIGATION.login);
      } else if (response.error) {
        dispatch(
          setToast({
            variant: 'Error',
            message: t('sessionExpire.otp'),
            type: 'error',
            id: customRandomNumberGenerator(),
          })
        );
      }
    }
  };

  return (
    <section className="reset-password-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="bg-white w-[60%] max-w-[85%] sm:max-w-[510px] max-h-[calc(100dvh-180px)] p-10 rounded-3xl overflow-y-auto my-4 ">
        <h1 className="text-blacktheme text-3xl font-semibold mb-6">
          {t('Auth.ResetPassword.resetPassword')}
        </h1>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetPasswordValidationSchema()}
          onSubmit={(values) => OnSubmit(values)}
        >
          {({ values }) => (
            <Form>
              <InputField
                parentClass="mb-4"
                placeholder={t('Auth.ResetPassword.passwordPlaceholder')}
                type={showPassword.password ? 'text' : 'password'}
                value={values.password}
                icon={
                  <Button
                    className="cursor-pointer"
                    onClickHandler={() =>
                      setShowPassword((prev) => {
                        return { ...prev, password: !showPassword.password };
                      })
                    }
                  >
                    <Image
                      iconName={
                        showPassword.password ? 'eyeIcon' : 'passwordEyeStrokeSD'
                      }
                      iconClassName="w-[18px] h-[18px]"
                    />
                  </Button>
                }
                label={t('UserProfile.ChangePassword.newPasswordLabel')}
                name="password"
              />
              <InputField
                placeholder={t('Auth.ResetPassword.confirmPasswordPlaceholder')}
                type={showPassword.confirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                icon={
                  <Button
                    className="cursor-pointer"
                    onClickHandler={() =>
                      setShowPassword((prev) => {
                        return {
                          ...prev,
                          confirmPassword: !showPassword.confirmPassword,
                        };
                      })
                    }
                  >
                    <Image
                      iconName={
                        showPassword.confirmPassword
                          ? 'eyeIcon'
                          : 'passwordEyeStrokeSD'
                      }
                      iconClassName="w-[18px] h-[18px]"
                    />
                  </Button>
                }
                label={t('Auth.ResetPassword.confirmPassword')}
                name="confirmPassword"
              />
              <div className="mt-10">
                <Button
                  isLoading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-primary font-medium p-3 text-center text-white rounded-lg hover:bg-secondary transition-all"
                >
                  {t('Auth.ResetPassword.resetPassword')}
                </Button>
              </div>

              <p className="text-center mt-5">
                {t('Auth.ForgotPassword.rememberPassword')}&nbsp;
                <Link
                  to={PUBLIC_NAVIGATION.login}
                  className="text-secondary hover:text-primary font-medium"
                >
                  {t('Auth.ForgotPassword.loginText')}
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
