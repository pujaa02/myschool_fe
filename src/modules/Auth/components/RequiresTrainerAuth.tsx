// ** Packages **
import { isEmpty } from 'lodash';
import React, { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { LanguagesDropdown } from 'components/Layout/components/header/components/LanguagesDropdown';
import PageLoader from 'components/Loaders/PageLoader';

// ** Redux **
import { PRIVACY_POLICY } from 'constants/navigation.constant';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { useLogout } from '../services';

import ErrorBoundary from 'modules/Auth/pages/ErrorBoundary';
import { ErrorBoundary as ErrorBoundaryDependency } from 'react-error-boundary';
// ** lazy **
const Toast = React.lazy(() => import('components/Toast'));
const SocketComponent = React.lazy(
  () => import('components/Socket/SocketComponent')
);

const RequiresTrainerAuth = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  const { logoutApi } = useLogout();
  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    if (!checkProfileSetup()) {
      navigate('/', {
        state: {
          isFirstTimeLogin: true,
        },
      });
    }
  }, [user]);

  const checkProfileSetup = () => {
    return isEmpty(user?.trainer?.location);
  };

  const logout = async () => {
    await logoutApi();
  };

  return (
    <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
      <header className="bg-white py-4 border-b border-gray-200">
        <div className="nav flex justify-between items-center gap-6 px-10">
          <div className="logo">
            <Button>
              <Image
                src="/images/pe_full_logo.svg"
                imgClassName="w-16 sm:w-auto max-h-[56px]"
                alt="Logo"
              />
            </Button>
          </div>
          <div>
            <div className="flex gap-4 items-center">
              <LanguagesDropdown isCommon />
              <Button className="button primary" onClickHandler={logout}>
                <Image iconName="logoutIcon" iconClassName="mr-2" />
                {t('Header.profileDropdown.logoutLabel')}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <Suspense fallback={<PageLoader />}>
        <Toast />
        <SocketComponent />
        <Outlet />
      </Suspense>
      <footer
        className="
        text-grayText tracking-normal   text-center fixed bottom-0 w-full z-1 text-sm py-4 right-0 "
      >
        {t('footer.copyright')}-{year} |
        <Link target="_blank" to={PRIVACY_POLICY}>
          {t('footer.policy')}
        </Link>
      </footer>
    </ErrorBoundaryDependency>
  );
};

export default RequiresTrainerAuth;
