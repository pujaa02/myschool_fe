// ** hooks **
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

// ** component **
import Button from 'components/Button/Button';
import CopyIcon from 'components/Icon/assets/CopyIcon';
import Image from 'components/Image';

// ** component **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** services **
import { useQR } from 'modules/Auth/services';

const QrCode = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { get2FAuthQR } = useQR();

  const [qrData, setQrData] = useState({
    qrCode: '',
    secretKey: '',
    secretKeyRaw: '',
  });
  const [tokenString, setTokenString] = useState();

  useEffect(() => {
    if (state === null && !state?.token) {
      navigate(PUBLIC_NAVIGATION.login);
    } else {
      setTokenString(state?.token);
      showQR();
    }
  }, []);

  const showQR = async () => {
    const config = {
      headers: {
        Authorization: `jwt ${state.token}`,
      },
    };
    const data = await get2FAuthQR(config);
    setQrData(data.data.QRCode);
    setQrData({
      qrCode: data.data.QRCode,
      secretKey: data.data.secret,
      secretKeyRaw: data.data.secretWithoutEncryption,
    });
  };

  const handleContinue = () => {
    navigate(PUBLIC_NAVIGATION.verifyCode, {
      state: {
        secret: qrData.secretKey,
        token: tokenString,
        is_remember: state?.is_remember,
      },
    });
  };

  const handlePrevious = () => {
    navigate(PUBLIC_NAVIGATION.login);
  };

  const splitSecretKey = () => {
    if (qrData.secretKeyRaw) {
      const resultArray = [];
      for (let i = 0; i < qrData.secretKeyRaw.length; i += 4) {
        resultArray.push(qrData.secretKeyRaw.slice(i, i + 4));
      }
      return resultArray.map((data) => (
        <span
          key={data}
          className="block text-center bg-gray-50 border border-solid border-gray-300 rounded-md py-1"
        >
          {data}
        </span>
      ));
    }
  };

  return (
    <section className="qr-code-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="bg-white max-w-[85%] sm:max-w-[510px] max-h-[calc(100dvh-180px)] p-10 rounded-3xl overflow-y-auto my-4 auth-scroll">
        <h1 className="text-blacktheme text-3xl font-semibold mb-2">
          {t('Auth.TwoFactorScreen.twoFactorTitle')}
        </h1>
        <p className="text-base text-grayText mb-10 mt-4">
          {t('Auth.TwoFactorScreen.twoFactorDescription')}
        </p>
        <div className="my-8 flex justify-center">
          <div className="w-44 h-44 rounded-md border border-solid border-dark/10 p-3.5 ">
            {qrData?.qrCode && <Image src={qrData.qrCode} />}
          </div>
        </div>
        <p className="text-base mb-4 text-center text-dark/70">
          {t('Auth.TwoFactorScreen.enterManually')}
        </p>
        <div className="bg-gray-100 p-4 rounded-xl my-4">
          <div className="grid grid-cols-4 gap-2">{splitSecretKey()}</div>
          <div className="text-center mt-1">
            <Button
              small
              variants="primary"
              className="w-fit gap-1 mx-auto"
              onClickHandler={() => {
                navigator.clipboard.writeText(qrData?.secretKeyRaw);
              }}
            >
              <Button className="w-4 h-4 inline-block">
                <CopyIcon className="w-full h-full" />
              </Button>
              {t('Auth.TwoFactorScreen.copyKey')}
            </Button>
          </div>
        </div>
        <p className="text-base text-center text-dark/70">
          {t('Auth.TwoFactorScreen.otpInformation')}
        </p>
        <div className="flex justify-between mt-5">
          <Button
            variants="whiteBordered"
            className="w-full me-2 justify-center"
            value={t('Auth.RegisterCommon.previousButtonText')}
            onClickHandler={handlePrevious}
          />
          <Button
            className="w-full ms-2 justify-center"
            variants="primary"
            value={t('Auth.RegisterCommon.continueButtonText')}
            onClickHandler={handleContinue}
          />
        </div>
      </div>
    </section>
  );
};

export default QrCode;
