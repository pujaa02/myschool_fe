import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SidebarSelector, activeSidebar } from 'redux-toolkit/slices/sidebarSlice';
import { NavigationItemType } from '../constants';

interface IMenu {
  menuData: NavigationItemType;
  activeData: string | null;
  hide?: boolean;
  setActiveSubMenu: (activeSubmenu: string) => void;
}

const SideBarMenu = ({ menuData, activeData, hide, setActiveSubMenu }: IMenu) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openSidebar = useSelector(SidebarSelector);
  const [childToggle, setChildToggle] = useState(hide);

  useEffect(() => {
    if (hide === false) {
      setChildToggle(false);
    }
    if (hide === true) {
      setChildToggle(true);
    }
  }, [hide]);

  const showSidebarSubmenu = () => {
    if (openSidebar) {
      if (
        menuData.isOpen &&
        menuData.subRoute !== null &&
        menuData.subRoute !== undefined &&
        menuData?.subRoute &&
        menuData?.subRoute?.length > 0
      ) {
        return true;
      }
    } else if (
      menuData.subRoute !== null &&
      menuData.subRoute !== undefined &&
      menuData?.subRoute &&
      menuData?.subRoute?.length > 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <li className="group/main">
      <Button
        className={`text-sm cursor-pointer flex items-center transition-all duration-500 group 
        ${
          menuData.uniqueId === activeData ||
          menuData.subRoute?.find(
            (item) =>
              item.uniqueId === activeData || activeData === menuData.uniqueId
          )
            ? 'bg-siteBG2 text-primary font-semibold  leading-[2.5]'
            : 'bg-transparent hover:bg-siteBG2  text-navText hover:text-dark  leading-[1.8]'
        } 
        ${
          openSidebar
            ? ' w-full rounded-l-lg py-3 ps-8 pe-2.5 '
            : ' w-fit p-2.5 rounded-lg ms-2.5'
        }
        `}
        onClickHandler={() => {
          setActiveSubMenu(menuData.uniqueId);
          if (!(activeData === menuData.uniqueId && !menuData.subRoute)) {
            if (menuData.path !== null) {
              navigate(menuData.path);
            } else if (menuData.subRoute !== null) {
              setChildToggle(!childToggle);
            }
          } else if (menuData.path !== null) {
            navigate(menuData.path);
          }
        }}
      >
        <Button className="inline-block w-5 h-5 text-current">
          <Image
            iconName={`${menuData.icon}`}
            iconClassName={
              'stroke-current w-full h-full flex-shrink-0'
              // ${menuData.uniqueId === activeData ? 'flex-shrink-0' : 'flex-shrink-0'}`
            }
          />
        </Button>
        {openSidebar && (
          <Button
            className={`
          text-current block  overflow-hidden whitespace-nowrap max-w-[calc(100%_-_24px)] ps-3.5`}
          >
            {menuData.label}
          </Button>
        )}
        {openSidebar && menuData.subRoute && (
          <Button className="flex items-center justify-center ms-auto me-2 w-3.5 h-3.5 ">
            <Image
              iconName="chevronRight"
              iconClassName={`transition-all duration-500 ${
                menuData.isOpen ? ' rotate-90' : ''
              }`}
            />
          </Button>
        )}
      </Button>

      {showSidebarSubmenu() ? (
        <div
          className={`${
            openSidebar
              ? ''
              : 'opacity-0 group-hover/main:opacity-100 pointer-events-none group-hover/main:pointer-events-auto  group-hover/main:-translate-y-10 -translate-y-10 -translate-x-3 group-hover/main:translate-x-0 top-auto absolute left-full bg-white p-4 min-w-[200px] rounded-lg shadow-header shadow-dark/10 transition-all duration-300'
          } `}
        >
          <ul
            className={`${
              openSidebar
                ? ' mt-3.5 ps-8 pt-4 before:absolute before:content-[""] before:left-8 before:top-0 before:w-px before:h-[calc(100%_-_8px)] before:bg-gray-300'
                : ' '
            }  flex flex-col gap-y-3.5 relative`}
          >
            {menuData.subRoute?.map((item) => (
              <li key={item?.id} className="">
                <Button
                  onClickHandler={() => {
                    if (activeData === item.uniqueId) {
                      dispatch(
                        activeSidebar({
                          isActive: item.uniqueId,
                          isOpen: true,
                        })
                      );
                    }
                    navigate(item.path);
                  }}
                  className={`text-left block font-medium text-sm leading-4 relative transition-all duration-300 
                  ${
                    openSidebar
                      ? 'ps-6 before:absolute before:content-[""] before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-px before:bg-gray-300'
                      : ' '
                  }
                  ${
                    activeData === item.uniqueId
                      ? 'text-primary'
                      : 'text-grayText hover:text-primary'
                  }  `}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </li>
  );
};

export default SideBarMenu;
