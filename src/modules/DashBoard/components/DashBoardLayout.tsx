// ** external packages **
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ** components **
import {
  getSidebarIsCollapse,
  setSidebarIsCollapse,
} from 'redux-toolkit/slices/commonSlice';
import Header from './Header';
import Sidebar from './Sidebar';

// ** redux slice ** //

interface Props {
  children: React.ReactNode;
  headerTitle: string;
}

const DashBoardLayout = ({ children, headerTitle }: Props) => {
  const dispatch = useDispatch();
  const sidebarIsCollapse = useSelector(getSidebarIsCollapse);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clearSelected = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        sidebarRef.current.contains(e.target as Node) &&
        sidebarIsCollapse
      ) {
        dispatch(setSidebarIsCollapse(!sidebarIsCollapse));
      }
    };
    window.addEventListener('mousedown', clearSelected);
    return () => window.removeEventListener('mousedown', clearSelected);
  });

  return (
    <>
      <div
        className={`dashMainWrapper w-full flex ${
          sidebarIsCollapse ? '' : 'sidebar__Collapse'
        }`}
      >
        <Sidebar sidebarRef={sidebarRef} />
        <div className="i__Dashboard__Wrapper w-[calc(100%_-_280px)] ml-auto relative min-h-screen duration-300 xl:w-[calc(100%_-_250px)] md:w-full ">
          <Header headerTitle={headerTitle} />
          <div className="pageContent pageContent__setting min-h-[calc(100dvh_-_108px)] px-[25px] py-0 md:pt-[10px] md:px-[15px]">
            {children}
          </div>
        </div>
      </div>
      <></>
    </>
  );
};

export default DashBoardLayout;
