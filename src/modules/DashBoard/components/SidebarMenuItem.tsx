// ** Import Packages **
import Tippy from '@tippyjs/react';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ** Hook **

// ** Icon **
import Icon, { IconTypes } from 'components/Icon';

// ** Constant **
import {
  getSidebarIsCollapse,
  setSidebarIsCollapse,
} from 'redux-toolkit/slices/commonSlice';
// import { IconTypeJson } from 'indexDB/indexdb.type';
import IconAnimation from 'components/IconAnimation';

interface Props {
  id: string;
  label: string;
  link: string;
  icon: IconTypes;
  // animationIcon: IconTypeJson;
  children?: Array<{ id: string; label: string; link: string }>;
  openSubMenu: string;
  setOpenSubMenu?: Dispatch<SetStateAction<string>>;
}

const SidebarMenuItem = (props: Props) => {
  const {
    id,
    label,
    link,
    icon,
    // animationIcon,
    children,
    openSubMenu,
    setOpenSubMenu,
  } = props;
  const hasSubMenu = !!children?.length;

  // ** Hooks **
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ** Custom Hook **
  const { isTabletView } = useWindowDimensions();
  const sidebarIsCollapse = useSelector(getSidebarIsCollapse);

  // **remove last char of link for the match add modules routes ** //
  const linkOfActiveMenu = link;
  const isMenuActive =
    linkOfActiveMenu === PRIVATE_NAVIGATION.dashboard.view
      ? location.pathname === linkOfActiveMenu
      : location.pathname.startsWith(
          link.substring(0, linkOfActiveMenu.length - 1)
        );
  const isSubMenuActive = (subMenuId: string) => {
    if (!hasSubMenu) {
      return false;
    }
    const subMenu = children.find((item) => item.id === subMenuId);
    return subMenu && location.pathname.includes(link + subMenu.link);
  };

  const sidebarItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    focusToSideBarItem();
    window.addEventListener('resize', focusToSideBarItem);
    return () => {
      window.removeEventListener('resize', focusToSideBarItem);
    };
  }, []);

  const focusToSideBarItem = useCallback(() => {
    if (sidebarItemRef.current) {
      sidebarItemRef.current.scrollIntoView();
    }
  }, [sidebarItemRef]);

  function conditionalRef(condition: boolean, ref: RefObject<HTMLDivElement>) {
    return condition ? ref : null;
  }

  return (
    <div
      id={id}
      className={`s__Menu__Item ${isMenuActive ? 'active' : ''} 
      `}
      onClick={() => {
        if (isTabletView) {
          dispatch(setSidebarIsCollapse(!sidebarIsCollapse));
        }
        if (setOpenSubMenu) {
          if (hasSubMenu) {
            setOpenSubMenu((prev) => (prev && id === prev ? '' : id));
          } else {
            setOpenSubMenu('');
          }
        }
      }}
      ref={conditionalRef(isMenuActive, sidebarItemRef)}
      // {...(isMenuActive && { ref: sidebarItemRef })}
    >
      <Tippy content={label} disabled={!sidebarIsCollapse} placement="right">
        <Link
          to={link}
          className="s__Menu__Item__Link"
          style={{ pointerEvents: `${id === 'search' ? 'none' : 'auto'}` }}
        >
          <IconAnimation
            iconType={icon}
            // animationIconType={animationIcon}
            textLabel={label}
            className="s__Menu__Icon !w-[24px] !h-[24px] "
            textLabelClassName="s__Menu__Text"
            iconClassName="animated_Icon"
          />

          {hasSubMenu ? (
            <Icon className="w-[20px]" iconType="signupBackArrowFilled" />
          ) : (
            <></>
          )}
        </Link>
      </Tippy>
      {hasSubMenu && openSubMenu === id ? (
        <div className="s__Submenu__Wrapper">
          {children.map((subMenu) => (
            <div
              key={subMenu.id}
              className={`s__Menu__Item no__Icon ${
                isSubMenuActive(subMenu.id) ? 'sub-active' : ''
              }`}
              onClick={() => navigate(`${link}${subMenu.link}`)}
            >
              <button
                className={`s__Menu__Item__Link ${
                  isSubMenuActive(subMenu.id) ? 'active' : ''
                }`}
              >
                <p className="s__Menu__Text">{subMenu.label}</p>
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SidebarMenuItem;
