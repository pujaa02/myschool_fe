import { ROLES } from 'constants/roleAndPermission.constant';
import { useSelector } from 'react-redux';
import {
  getCurrentUser,
  getIsAuthenticated,
} from 'redux-toolkit/slices/authSlice';
import { SidebarSelector } from 'redux-toolkit/slices/sidebarSlice';

const Footer = () => {
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
        user?.role_name !== ROLES.Teacher
          ? isLogedIn
            ? openSidebar
              ? 'max-w-[calc(100%_-_270px)]'
              : 'max-w-[calc(100%_-_100px)]'
            : ''
          : ''
      }`}
    >
      {'footer.copyright'}-{year} |{' '}
    </footer>
  );
};

export default Footer;
