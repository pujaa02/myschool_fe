// ** Packages **
// import { useRef } from "react";
// import { useSelector } from "react-redux";

// ** Redux **
// import { getSidebarIsCollapse } from "redux/slices/commonSlice";
// import { getCurrentUser } from "redux/slices/authSlice";

// ** Components **
import Footer from 'components/Layout/components/Footer';
import Header from 'components/Layout/components/Header';
import { ROLES } from 'constants/roleAndPermission.constant';
import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { SidebarSelector } from 'redux-toolkit/slices/sidebarSlice';
import Sidebar from './components/Sidebar';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  const user = useSelector(getCurrentUser);

  // const sidebarIsCollapse = useSelector(getSidebarIsCollapse);
  // const sidebarRef = useRef<HTMLDivElement>(null);
  // const CurrentUser = useSelector(getCurrentUser);

  // sidebarIsCollapse ? "" : "sidebar__collapse"
  const openSidebar = useSelector(SidebarSelector);
  return (
    <div className="main__wrapper">
      {user?.role_name === ROLES.Teacher || user?.role_name === ROLES.Admin ? (
        <>
          <Header />
          <div className="main__cn__wrapper max-h-[calc(100dvh_-_142px)] min-h-[70dvh] overflow-auto pb-5 pt-5">
            {children}
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Sidebar />
          <div
            className={`contentR__wrapper relative ms-auto transition-all duration-500 ${
              openSidebar ? 'w-[calc(100%_-_270px)]' : 'w-[calc(100%_-_100px)]'
            }`}
          >
            <Header />
            <div
              className="main__cn__wrapper h-[calc(100dvh_-_89px)] overflow-auto z-1 pb-16 pt-6 px-4 sm:px-6 md:px-8"
              id="scrollable-form"
            >
              {children}
            </div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
