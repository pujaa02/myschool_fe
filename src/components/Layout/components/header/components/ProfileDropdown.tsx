import Button from 'components/Button/Button';
import Image from 'components/Image';
import 'components/Layout/components/style/topHeader.css';
import { REACT_APP_API_BASE_URL } from 'config';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { ROLES } from 'constants/roleAndPermission.constant';
import { useModal } from 'hooks/useModal';
import { useToggleDropdown } from 'hooks/useToggleDropdown';
import _ from 'lodash';
import { useLogout } from 'modules/Auth/services';
import AccessDeniedModal from 'modules/CompanyManager/components/AccessDenidedModal';
import ChangePassword from 'modules/Profile/ChangePassword';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { clearCompany, useCompany } from 'redux-toolkit/slices/companySlice';
import { clearActiveSidebar } from 'redux-toolkit/slices/sidebarSlice';

export const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const profileDropdown = useToggleDropdown();
  const { logoutApi } = useLogout();
  const user = useSelector(getCurrentUser);
  const changePasswordModal = useModal();
  const AccessModal = useModal();
  const navigate = useNavigate();
  const logout = async () => {
    setTimeout(() => {
      dispatch(clearCompany());
    }, 0);
    await logoutApi();
  };

  const handleChangePassword = () => {
    changePasswordModal.openModal();
    profileDropdown.closeDropDown();
  };
  const handleViewProfile = () => {
    navigate(PRIVATE_NAVIGATION.userProfile.viewProfile.path);
    dispatch(clearActiveSidebar());
    profileDropdown.closeDropDown();
  };

  const handleAccountSettings = () => {
    navigate(PRIVATE_NAVIGATION.userProfile.accountSettings.path);
    dispatch(clearActiveSidebar());
    profileDropdown.closeDropDown();
  };
  const ActiveCompany = useSelector(useCompany);

  return (
    <>
      <div className="relative" ref={profileDropdown.dropdownRef}>
        <Button
          className="profile-dropdown-container"
          onClickHandler={profileDropdown.toggleDropdown}
        >
          <span className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={
                user?.profile_image
                  ? `${REACT_APP_API_BASE_URL}/${user?.profile_image}`
                  : './images/no-image.png'
              }
              imgClassName="w-full h-full object-cover"
              alt={user ? `${user.full_name}'s Profile` : 'User Profile Image'}
            />
          </span>
          <span className="block max-w-[calc(100%_-_50px)] ps-1.5 text-sm truncate">
            {user?.full_name}
          </span>
          <Image
            iconName="chevronLeft"
            iconClassName="stroke-[3] -rotate-90 w-4 h-4"
          />
        </Button>
        {profileDropdown.isDropdownOpen && (
          <div className="profile-card">
            <div className="profile-wrapper">
              <span className="flex w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={
                    user?.profile_image
                      ? `${REACT_APP_API_BASE_URL}/${user?.profile_image}`
                      : '/images/no-image.png'
                  }
                  imgClassName="w-full h-full object-cover"
                  alt={user ? `${user.full_name}'s Profile` : 'User Profile Image'}
                />
              </span>
              <span className="block max-w-[calc(100%_-_40px)] ps-2 w-full">
                <span className="block truncate text-sm text-dark font-normal">
                  {user?.full_name}
                </span>
                <span className="block truncate text-xs text-ic_1 font-normal">
                  {user?.email}
                </span>
              </span>
            </div>
            <div className=" p-2 flex flex-col gap-y-1">
              {(user?.role_name === ROLES.CompanyManager ||
                user?.role_name === ROLES.PrivateIndividual) && (
                <Button
                  className="profile-item text-left"
                  onClickHandler={() => {
                    navigate(PRIVATE_NAVIGATION.dashboard.view.path);
                    profileDropdown.closeDropDown();
                  }}
                >
                  <span className="flex w-5 h-5">
                    <Image
                      iconName="dashboardStrokeSD"
                      iconClassName="w-full h-full"
                    />
                  </span>
                  <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                    {t('Header.profileDropdown.dashboardLabel')}
                  </span>
                </Button>
              )}
              {(user?.role_name === ROLES.CompanyManager ||
                user?.role_name === ROLES.PrivateIndividual) && (
                <Button
                  className="profile-item text-left"
                  onClickHandler={() => {
                    navigate(
                      user?.role_name === ROLES.CompanyManager
                        ? PRIVATE_NAVIGATION.companyManager.courses.list.path
                        : PRIVATE_NAVIGATION.privateIndividual.courses.list.path,
                      {
                        state: {
                          comingFromManagerForm: true,
                        },
                      }
                    );
                    profileDropdown.closeDropDown();
                  }}
                >
                  <span className="flex w-5 h-5">
                    <Image
                      iconName="notePencilStrokeSD"
                      iconClassName="w-full h-full"
                    />
                  </span>
                  <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                    {t('Header.profileDropdown.coursesLabel')}
                  </span>
                </Button>
              )}
              {user?.role_name === ROLES.CompanyManager && (
                <Button
                  className="profile-item text-left"
                  onClickHandler={() => {
                    navigate(
                      PRIVATE_NAVIGATION.companyManager.attendeeList.list.path,
                      {
                        state: {
                          comingFromManagerProfile: true,
                        },
                      }
                    );
                    profileDropdown.closeDropDown();
                  }}
                >
                  <span className="flex w-5 h-5">
                    <Image iconName="userIcon2" iconClassName="w-full h-full" />
                  </span>
                  <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                    {t('Header.profileDropdown.attendee')}
                  </span>
                </Button>
              )}
              {(user?.role_name === ROLES.CompanyManager ||
                user?.role_name === ROLES.PrivateIndividual) && (
                <Button
                  className="profile-item text-left"
                  onClickHandler={() => {
                    navigate(
                      user?.role_name === ROLES.CompanyManager
                        ? PRIVATE_NAVIGATION.companyManager.myCourses.list.path
                        : PRIVATE_NAVIGATION.privateIndividual.myCourses.list.path
                    );
                    profileDropdown.closeDropDown();
                  }}
                >
                  <span className="flex w-5 h-5">
                    <Image iconName="bookIcon" iconClassName="w-full h-full" />
                  </span>
                  <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                    {t('Header.profileDropdown.myCoursesLabel')}
                  </span>
                </Button>
              )}
              {(user?.role_name === ROLES.CompanyManager ||
                user?.role_name === ROLES.PrivateIndividual) && (
                <Button
                  className="profile-item text-left"
                  onClickHandler={() => {
                    navigate(
                      user?.role_name === ROLES.CompanyManager
                        ? PRIVATE_NAVIGATION.companyManager.calendar.view.path
                        : PRIVATE_NAVIGATION.privateIndividual.calendar.view.path
                    );
                    profileDropdown.closeDropDown();
                  }}
                >
                  <span className="flex w-5 h-5">
                    <Image iconName="calendarIcon2" iconClassName="w-full h-full" />
                  </span>
                  <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                    {t('Header.profileDropdown.calendarLabel')}
                  </span>
                </Button>
              )}

              {user?.role_name === ROLES.CompanyManager && (
                <Button
                  className="profile-item text-left"
                  onClickHandler={() => {
                    if (ActiveCompany?.company?.id) {
                      navigate(
                        PRIVATE_NAVIGATION.companyManager.requestCourse.list.path
                      );
                      profileDropdown.closeDropDown();
                    } else {
                      AccessModal.openModal();
                    }
                  }}
                >
                  <span className="flex w-5 h-5">
                    <Image iconName="bookIcon" iconClassName="w-full h-full" />
                  </span>
                  <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                    {t('Header.profileDropdown.requestCoursesLabel')}
                  </span>
                </Button>
              )}

              <Button
                className="profile-item text-left"
                onClickHandler={handleViewProfile}
              >
                <span className="flex w-5 h-5">
                  <Image iconName="profileIcon" iconClassName="w-full h-full " />
                </span>
                <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                  {t('Header.profileDropdown.viewProfileLabel')}
                </span>
              </Button>
              {user?.role_name !== ROLES.SalesRep &&
                user?.role_name !== ROLES.Accounting && (
                  <Button
                    className="profile-item text-left"
                    onClickHandler={handleAccountSettings}
                  >
                    <span className="flex w-5 h-5">
                      <Image iconName="cogIcon" iconClassName="w-full h-full" />
                    </span>
                    <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                      {t('Header.profileDropdown.accountLabel')}
                    </span>
                  </Button>
                )}
              {user?.role_name !== ROLES.CompanyManager &&
                user?.role_name !== ROLES.PrivateIndividual && (
                  <Button
                    className="profile-item text-left"
                    onClickHandler={handleChangePassword}
                  >
                    <span className="flex w-5 h-5">
                      <Image iconName="lockIcon" iconClassName="w-full h-full " />
                    </span>
                    <span className="block max-w-[calc(100%_-_28px)] ps-2 w-full">
                      {t('Header.profileDropdown.changePasswordLabel')}
                    </span>
                  </Button>
                )}
              <Button onClickHandler={logout} className="profile-logout">
                <div className="max-w-[calc(100%_-_28px)] text-left w-full flex justify-start">
                  <span className="flex w-5 h-5 me-2">
                    <Image iconName="logoutIcon" iconClassName="w-full h-full " />
                  </span>
                  {t('Header.profileDropdown.logoutLabel')}
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
      {changePasswordModal?.isOpen && <ChangePassword modal={changePasswordModal} />}
      {AccessModal.isOpen &&
        ROLES.CompanyManager === user?.role_name &&
        _.isEmpty(ActiveCompany.company) && (
          <AccessDeniedModal modal={AccessModal} />
        )}
    </>
  );
};
