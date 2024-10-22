import { PRIVACY_POLICY } from 'constants/navigation.constant';
import { ROLES } from 'constants/roleAndPermission.constant';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser, getIsAuthenticated } from 'redux-toolkit/slices/authSlice';
import { SidebarSelector } from 'redux-toolkit/slices/sidebarSlice';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const openSidebar = useSelector(SidebarSelector);
  const isLogedIn = useSelector(getIsAuthenticated);
  const user = useSelector(getCurrentUser);
  return (
    <footer
      className={`${
        !isLogedIn
          ? 'text-grayText tracking-normal'
          : ' border-t border-solid border-navText/10 bg-siteBG2 text-black '
      } text-center fixed bottom-0 w-full z-1 text-sm py-4 right-0  ${
        user?.role_name !== ROLES.CompanyManager
          ? isLogedIn
            ? openSidebar
              ? 'max-w-[calc(100%_-_270px)]'
              : 'max-w-[calc(100%_-_100px)]'
            : ''
          : ''
      }`}
    >
      {t('footer.copyright')}-{year} |{' '}
      <Link target="_blank" to={PRIVACY_POLICY}>
        {t('footer.policy')}
      </Link>
    </footer>
  );
};

export default Footer;
