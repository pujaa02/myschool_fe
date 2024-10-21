import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// ** components **
import Image from 'components/Image';

// ** constants **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';
import { registerInitialValues } from 'modules/Auth/components/Register/constants';

// ** types **
import { ActiveStateType, RegisterInitialValueType } from './types';

// ** style **
import './style/index.css';

// ** lazy **
const RegisterCompanyInfo = React.lazy(
  () => import('modules/Auth/components/Register/RegisterCompanyInfo')
);
const RegisterManagerInfo = React.lazy(
  () => import('modules/Auth/components/Register/RegsiterManagerInfo')
);
const AdditionalInfo = React.lazy(
  () => import('modules/Auth/components/Register/AdditionalInfo')
);

const Register = () => {
  const { t } = useTranslation();

  const [registerFormInitialValue, setRegisterFormInitialValue] =
    useState<RegisterInitialValueType>(registerInitialValues);
  const [active, setActive] = useState<ActiveStateType>({
    current: 1,
    companyInfoForm: {
      complete: false,
    },
    managerInfoForm: {
      complete: false,
    },
    additionalInfoForm: {
      complete: false,
    },
  });

  const renderForm = () => {
    switch (active.current) {
      case 1:
        return (
          <RegisterCompanyInfo
            setRegisterInitialValue={setRegisterFormInitialValue}
            registerInitialValue={registerFormInitialValue}
            currentStep={active.current}
            setActive={setActive}
          />
        );
      case 2:
        return (
          <RegisterManagerInfo
            setRegisterInitialValue={setRegisterFormInitialValue}
            registerInitialValue={registerFormInitialValue}
            currentStep={active.current}
            setActive={setActive}
          />
        );
      case 3:
        return (
          <AdditionalInfo
            setRegisterInitialValue={setRegisterFormInitialValue}
            registerInitialValue={registerFormInitialValue}
            currentStep={active.current}
            setActive={setActive}
          />
        );
      default:
        break;
    }
  };

  return (
    <section className="register-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center px-4">
      <div className="max-w-[510px] ">
        <div className="p-4 md:p-6 bg-white rounded-3xl my-4 no-scrollbar h-[calc(100dvh_-_170px)] overflow-auto">
          <h2 className="text-blacktheme text-3xl font-semibold mb-6 2xl:mb-8">
            {t('Auth.RegisterCommon.signUpText')}
          </h2>
          <ul className="flex items-start justify-between max-w-[426px] mx-auto mb-8 2xl:mb-12">
            <li className="relative group z-1 justify-center items-center flex flex-col">
              <span
                className={`wizard-icon-style ${
                  active.current === 1
                    ? 'text-primary ring-1 ring-primary bg-white'
                    : ' bg-offWhite2 text-grayText'
                } ${
                  active?.companyInfoForm?.complete &&
                  'bg-primary text-white before:!border-primary'
                }`}
              >
                <Image iconName="companyInfo" />
              </span>
              <span
                className={`text-center text-sm font-medium leading-5 mt-2.5 max-w-[96px] ${
                  active.current === 1
                    ? 'text-primary font-semibold'
                    : ' text-grayText'
                } ${
                  active?.companyInfoForm?.complete && 'text-primary font-semibold'
                }`}
              >
                {t('Auth.RegisterCommon.companyInfoText')}
              </span>
            </li>
            <li className="relative group z-1 justify-center items-center flex flex-col">
              <span
                className={`wizard-icon-style ${
                  active.current === 2
                    ? 'text-primary ring-1 ring-primary bg-white'
                    : ' bg-offWhite2 text-grayText'
                } ${
                  active?.managerInfoForm?.complete &&
                  'bg-primary text-white before:!border-primary'
                }`}
              >
                <Image iconName="userProfile" />
              </span>
              <span
                className={`text-center text-sm font-medium leading-5 mt-2.5 max-w-[96px] ${
                  active.current === 2
                    ? 'text-primary font-semibold'
                    : ' text-grayText'
                } ${
                  active?.managerInfoForm?.complete && 'text-primary font-semibold'
                }`}
              >
                {t('Auth.RegisterCommon.managerInfoText')}
              </span>
            </li>
            <li className="relative group z-1 justify-center items-center flex flex-col">
              <span
                className={`wizard-icon-style
            ${
              active.current === 3
                ? 'text-primary ring-1 ring-primary bg-white'
                : ' bg-offWhite2 text-grayText'
            } ${
                  active?.additionalInfoForm?.complete &&
                  'bg-primary text-white before:!border-primary'
                }`}
              >
                <Image iconName="infoIcon" />
              </span>
              <span
                className={`text-center text-sm font-medium leading-5 mt-2.5 max-w-[96px] ${
                  active.current === 3
                    ? 'text-primary font-semibold'
                    : ' text-grayText'
                } ${
                  active?.additionalInfoForm?.complete &&
                  'text-primary font-semibold'
                }`}
              >
                {t('Auth.RegisterCommon.additionalInfoText')}
              </span>
            </li>
          </ul>

          {renderForm()}

          <div className="flex mx-auto justify-center px-2 mt-5">
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
              to={PUBLIC_NAVIGATION.privateMember}
              className="text-ic_1 text-base inline-block underline underline-offset-4"
            >
              {t('Auth.RegisterCommon.signUpPrivateMember')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
