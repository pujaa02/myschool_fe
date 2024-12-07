// ** Import Packages **
import { useDispatch, useSelector } from 'react-redux';
import Image from 'components/Image'
import useAuth from 'hooks/useAuth';
import { useToggleDropdown } from 'hooks/useToggleDropdown';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { getIsViewUpdateStatus, getViewDiscardPromptStatus, setOpenDiscardConformationModal } from 'redux-toolkit/slices/commonSlice';
import ClickableEmail from 'components/ClickableComponents/ClickableEmail';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { useNavigate } from 'react-router-dom';


const ProfileToggle = () => {
  const { logout } = useAuth();
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const viewDiscardPromptStatus = useSelector(getViewDiscardPromptStatus);
  const isViewUpdateStatus = useSelector(getIsViewUpdateStatus);
  const { dropdownRef, isDropdownOpen, toggleDropdown } = useToggleDropdown();

  // ** custom hooks **

  const onToggle = () => {
    if (isViewUpdateStatus && viewDiscardPromptStatus) {
      dispatch(setOpenDiscardConformationModal({ status: true }));
    } else {
      toggleDropdown();
    }
  };

  return (
    <div
      className="topH__profile__wrapper ml-[15px] relative flex items-center"
      ref={dropdownRef}
    >
      <button
        onClick={onToggle}
        className="profile w-[40px] h-[40px] rounded-[8px] shadow-[0px_4px_4px_#dee2e64d] cursor-pointer"
      >
        <Image
          imgPath={user?.profile_image || ''}
          first_name={user?.first_name || ''}
          last_name={user?.last_name || ''}
          serverPath
          height={40}
          width={40}
          color={user?.initial_color || ''}
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute top-[100%] right-0 z-[5] pt-[10px]">
          <div className="profile__card w-[345px] max-w-[290px] shadow-[0px_3px_17px_#0000001a] rounded-[10px] bg-ipWhite__bgColor">
            <div className="profile__box p-[20px] flex flex-wrap sm:p-[15px]">
              <div className="img__wrapper w-[70px] h-[70px] rounded-[15px] overflow-hidden sm:w-[50px] sm:h-[50px] sm:rounded-[10px]">
                <Image
                  imgPath={user?.profile_image || ''}
                  first_name={user?.first_name || ''}
                  last_name={user?.last_name || ''}
                  serverPath
                  height={70}
                  width={70}
                  color={user?.initial_color || ''}
                />
              </div>
              <div className="right w-[calc(100%_-_72px)] pl-[15px] sm:w-[calc(100%_-_52px)]">
                <h3 className="text-[16px] font-biotif__Medium text-ipBlack__textColor leading-[19px]">
                  {`${user?.first_name} ${user?.last_name}` }
                </h3>
                {user?.email ? <ClickableEmail mail={user?.email} /> : null}

                <div>
                  <Button
                    className="primary__Btn profile__btn mt-[10px] py-[6px] px-[13px] text-[14px] font-biotif__Regular"
                    onClick={() => {
                      const navigationLink =
                        PRIVATE_NAVIGATION.settings.generalSettings
                          .personalSettings.view;
                      navigate(navigationLink);
                    }}
                  >
                    <Icon iconType="profileFilledBlueIcon" />
                    Profile
                  </Button>
                </div>
              </div>
            </div>
            <div className="footer__btn flex items-center justify-end py-[16px] px-[20px]">
              <button
                className="text-[14px] font-biotif__Regular text-black__TextColor500 duration-500 hover:text-primaryColor"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileToggle;
