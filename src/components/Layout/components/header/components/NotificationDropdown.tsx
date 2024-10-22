import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'components/Layout/components/style/topHeader.css';
import { PRIVATE_NAVIGATION } from '../../../../../constants/navigation.constant';
import { useToggleDropdown } from '../../../../../hooks/useToggleDropdown';
import { useIsRead } from '../../../../../redux-toolkit/slices/notificationReadSlice';
import Button from '../../../../Button/Button';

export const NotificationDropdown = () => {
  const { t } = useTranslation();

  const { isRead } = useSelector(useIsRead);

  const navigate = useNavigate();

  const notificationDropdown = useToggleDropdown();

  const { hasData, handleIsRead, notification, isLoading, notificationCount } =
    useGetNotifications();

  return (
    <div className="relative group" ref={notificationDropdown.dropdownRef}>
      <Button
        className="notification-dropdown-container"
        onClickHandler={notificationDropdown.toggleDropdown}
      >
        <Image iconName="notificationBellIcon" />
        {(!isRead || notificationCount > 0) && (
          <span className="notification-badge" />
        )}
      </Button>

      <div className="notification-card">
        <div className="tab-header p-5 flex justify-between px-5 border-b border-solid border-gray-200">
          <div>
            <Button className="text-xl leading-7 text-dark font-semibold me-1">
              {t('Header.notificationDropdown.title')}
            </Button>
            {notificationCount > 0 && (
              <span className="text-danger">{notificationCount}</span>
            )}
          </div>
          {hasData && (
            <Button
              disabled={isRead}
              onClickHandler={() => handleIsRead()}
              className={`notification-mark-tab ${
                !isRead ? 'hover:text-primary' : ''
              }`}
            >
              <Image
                iconName="checkRoundIcon"
                width={24}
                height={24}
                iconClassName="w-5 h-5 block "
              />
              <span className="max-w-[calc(100%_-_20px)] ps-1">
                {t('Header.notificationDropdown.markTab')}
              </span>
            </Button>
          )}
        </div>
        <div className="tab-wrapper">
          <div className="max-h-[calc(100dvh_-_310px)] min-h-[76px] overflow-auto no-scrollbar">
            <NotificationList
              notificationData={[...notification].splice(0, 3)}
              handleIsRead={handleIsRead}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="notification-view-more">
          <Button
            className="flex items-center gap-1 justify-center text-sm cursor-pointer"
            onClickHandler={() => {
              navigate(PRIVATE_NAVIGATION.notifications.view.path);
              notificationDropdown.toggleDropdown();
            }}
            type="button"
          >
            {t('Header.notificationDropdown.notify')}
            <span className="w-4 h-4 block">
              <Image
                iconName="arrowRightIcon"
                width={24}
                height={24}
                iconClassName="w-full h-full"
              />
            </span>
          </Button>
        </div>
      </div>
      {/* {notificationDropdown.isDropdownOpen && (
      )} */}
    </div>
  );
};
