import { Form, Formik } from 'formik';

// ** hooks **
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// ** component **
import Button from 'components/Button/Button';
import OTPInput from 'react-otp-input';

// ** constant **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** service **
import {
  getActiveUserDataApi,
  useVerificationCodeVerify,
} from 'modules/Auth/services';

// ** redux **
import { setToken } from 'redux-toolkit/slices/tokenSlice';

// ** style **
import { setToast } from 'redux-toolkit/slices/toastSlice';
import { customRandomNumberGenerator } from 'utils';
import './style/verifyCode.css';

const VerifyCode = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { verificationCodeApi, isLoading } = useVerificationCodeVerify();
  const { getActiveUser } = getActiveUserDataApi();

  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    if (state === null || !state?.token || !state.secret) {
      navigate(PUBLIC_NAVIGATION.login);
    }
  }, [state]);

  const OnSubmit = async () => {
    const config = {
      headers: {
        Authorization: `jwt ${state.token}`,
      },
    };

    const response = await verificationCodeApi(
      {
        code: verificationCode,
        secret: state.secret,
        is_remember: state.is_remember,
      },
      config
    );
    if (response?.data?.user?.verified) {
      dispatch(setToken({ token: response?.data?.access_token }));
      await getActiveUser();
    } else if (response?.data?.verified === false) {
      dispatch(
        setToast({
          variant: 'Error',
          message: `${t('invalidOTP')}`,
          type: 'error',
          id: customRandomNumberGenerator(),
        })
      );
    }
  };

  return (
    <section className="verify-code-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="verify-container auth-scroll">
        <h1 className="text-blacktheme text-3xl font-semibold mb-2">
          {t('Auth.AuthCode.verifyAccountText')}
        </h1>
        <p className="text-base text-grayText mt-4">
          <span className="text-blacktheme font-semibold">{state?.email}</span>
          {t('Auth.AuthCode.enterCodeText')}
        </p>
        <Formik
          enableReinitialize
          initialValues={{ verificationCode }}
          onSubmit={OnSubmit}
        >
          {({ values }) => (
            <Form>
              <div className="py-10">
                <OTPInput
                  inputStyle="otp-input"
                  numInputs={6}
                  onChange={(value) => {
                    setVerificationCode(String(value));
                  }}
                  value={values.verificationCode}
                  placeholder="------"
                  inputType="number"
                  renderInput={(props) => <input {...props} />}
                  shouldAutoFocus
                  containerStyle="flex justify-between"
                />
              </div>

              <div className="mb-10">
                <Button
                  isLoading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  value={t('Auth.AuthCode.verifyButtonText')}
                  className="w-full bg-primary font-medium p-3 text-center text-white rounded-lg hover:bg-secondary transition-all"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default VerifyCode;
