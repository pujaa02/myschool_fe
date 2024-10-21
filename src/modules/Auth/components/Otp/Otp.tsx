// ** library **
import { Form, Formik, FormikValues } from 'formik';

// ** components
import OTPInput from 'react-otp-input';

// ** constants **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** hooks **
import { useAxiosPost } from 'hooks/useAxios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// ** styles **
import '../../pages/VerifyCode/style/verifyCode.css';

type otpProps = {
  email: string;
};

const Otp = ({ email }: otpProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [otpVerifyApi] = useAxiosPost();
  const [otp, setOtp] = useState({ otpValue: '' });

  const OnSubmit = async (data: FormikValues) => {
    const otpTemp = {
      email,
      type: 'FORGOT',
      otp: data.otpValue,
    };
    const response = await otpVerifyApi('/auth/otp-verification', otpTemp);
    if (!response.error) {
      navigate(PUBLIC_NAVIGATION.resetPassword, {
        state: { access_token: response.data.access_token },
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={otp}
      onSubmit={(values) => OnSubmit(values)}
    >
      {({ values }) => (
        <Form>
          <div className="py-10">
            <OTPInput
              inputStyle="otp-input"
              numInputs={6}
              onChange={(val) => {
                return setOtp({ otpValue: val });
              }}
              value={values.otpValue}
              placeholder="------"
              inputType="number"
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
              containerStyle="flex justify-between"
            />
          </div>

          <div className="mb-10">
            <button className="w-full bg-primary font-medium p-3 text-center text-white rounded-lg hover:bg-secondary transition-all">
              {t('Auth.OtpScreen.verifyAccountBtnText')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Otp;
