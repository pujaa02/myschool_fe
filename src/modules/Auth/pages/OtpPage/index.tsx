// ** component **
import Button from 'components/Button/Button';
import Otp from 'modules/Auth/components/Otp/Otp';

// ** constant **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** hooks **
import { useAxiosPost } from 'hooks/useAxios';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const [forgotPasswordApi] = useAxiosPost();
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state === null) {
      navigate(PUBLIC_NAVIGATION.login);
    }
  }, [state]);

  const handleOtp = async () => {
    const forgotPasswordObject = {
      email: state?.email,
      type: 'FORGOT',
    };
    await forgotPasswordApi('/auth/forgot-password', forgotPasswordObject);
  };

  return (
    <section className="otp-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="bg-white max-w-[85%] sm:max-w-[510px] max-h-[calc(100dvh-180px)] p-10 rounded-3xl overflow-y-auto my-4 ">
        <h1 className="text-blacktheme text-3xl font-semibold mb-2">
          {t('Auth.OtpScreen.verifyAccountTitle')}
        </h1>
        <p className="text-base text-grayText mt-4">
          {t('Auth.OtpScreen.verifyText1')}
          <span className="text-blacktheme font-semibold"> {state?.email} </span>
          {t('Auth.OtpScreen.verifyText2')}
        </p>
        <Otp email={state?.email} />

        <p className="text-center">
          {t('Auth.OtpScreen.resendOTPContent')} &nbsp;
          <Button
            onClickHandler={handleOtp}
            className="text-secondary hover:text-primary font-medium cursor-pointer"
          >
            {t('Auth.OtpScreen.resendText')}
          </Button>
        </p>
      </div>
    </section>
  );
};

export default OtpPage;
