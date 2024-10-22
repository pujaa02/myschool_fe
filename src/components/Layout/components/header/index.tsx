import 'components/Layout/components/style/topHeader.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyDropdown } from './components/CompanyDropdown';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../../../constants/roleAndPermission.constant';
import { getCurrentUser } from '../../../../redux-toolkit/slices/authSlice';
import {
  SidebarSelector,
  hideSidebar,
  showSidebar,
} from '../../../../redux-toolkit/slices/sidebarSlice';
import Button from '../../../Button/Button';
import { LanguagesDropdown } from './components/LanguagesDropdown';
import { NotificationDropdown } from './components/NotificationDropdown';
import { ProfileDropdown } from './components/ProfileDropdown';

export const CommonHeader = () => {
  const { t } = useTranslation();
  const openSidebar = useSelector(SidebarSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);
  return (
    <header
      className={`${
        user?.role_name !== ROLES.CompanyManager &&
        user?.role_name !== ROLES.PrivateIndividual
          ? 'header-container px-4 relative z-2'
          : ' bg-white px-4'
      }`}
    >
      {user?.role_name !== ROLES.CompanyManager &&
      user?.role_name !== ROLES.PrivateIndividual ? (
        <Button
          className="absolute w-8 h-8 p-1.5 select-none rounded-full border bg-white flex items-center justify-center top-7 cursor-pointer -left-4"
          onClickHandler={() => {
            if (openSidebar) dispatch(hideSidebar());
            else dispatch(showSidebar());
          }}
        >
          <Image
            iconName="chevronRight"
            iconClassName={`${
              openSidebar
                ? 'rotate-180 transition-all duration-500'
                : 'transition-all duration-500'
            }`}
          />
        </Button>
      ) : (
        ''
      )}
      <nav className="flex basis-full border-b items-center w-full mx-auto relative transition-all duration-500 py-3 z-1">
        <div className="w-full flex items-center justify-end ms-auto ps-4 sm:justify-between sm:gap-x-3 sm:order-3">
          {user?.role_name === ROLES.CompanyManager ||
          user?.role_name === ROLES.PrivateIndividual ? (
            <Button onClickHandler={() => navigate('/')}>
              <Image
                src="/images/pe_full_logo.svg"
                imgClassName="w-16 sm:w-auto max-h-[56px]"
                alt="Logo"
              />
            </Button>
          ) : (
            <div className="prolevenWhiz-text">
              {t('Header.prolevenWhiz')}
              <Image iconClassName="w-6 h-6 ms-2" iconName="magicPen" />
            </div>
          )}
          <div className="flex flex-wrap gap-2 ms-auto">
            {user?.role_name === ROLES.CompanyManager && <CompanyDropdown />}
            <LanguagesDropdown />
            <NotificationDropdown />
            <ProfileDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
};
