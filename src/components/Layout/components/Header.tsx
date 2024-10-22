import Button from 'components/Button/Button';
import Image from 'components/Image';
import 'components/Layout/components/style/topHeader.css';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from 'redux-toolkit/slices/authSlice';
import { CommonHeader } from '../components/header/index';
import { LanguagesDropdown } from './header/components/LanguagesDropdown';

const Header = () => {
  return (
    <>
      {useSelector(getIsAuthenticated) ? (
        <CommonHeader />
      ) : (
        !window.location.pathname.includes('/exam/') && (
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
                </div>
              </div>
            </div>
          </header>
        )
      )}
    </>
  );
};

export default Header;
