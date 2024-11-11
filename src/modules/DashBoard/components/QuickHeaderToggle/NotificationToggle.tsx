// import { useToggleDropdown } from 'hooks/useToggleDropdown';
// import { useEffect, useLayoutEffect, useRef } from 'react';
// import Notification from '../Notification';
// import NotificationCount from '../Notification/NotificationCount';
// import {
//   getIsViewUpdateStatus,
//   getViewDiscardPromptStatus,
//   setOpenDiscardConformationModal,
// } from 'redux/slices/commonSlice';
// import { useSelector, useDispatch } from 'react-redux';

const NotificationToggle = () => {
  // const dispatch = useDispatch();
  // const viewDiscardPromptStatus = useSelector(getViewDiscardPromptStatus);
  // const isViewUpdateStatus = useSelector(getIsViewUpdateStatus);
  // const slideRef = useRef<HTMLDivElement>(null);
  // const { dropdownRef, isDropdownOpen, toggleDropdown } = useToggleDropdown();

  // useEffect(() => {
  //   const htmlTag = document.getElementsByTagName('html');
  //   if (isDropdownOpen) {
  //     htmlTag[0].setAttribute('class', `notification__open`);
  //   }
  // }, [isDropdownOpen]);

  // useLayoutEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // const handleClickOutside = (event: MouseEvent) => {
  //   const htmlElemTag = document.getElementsByTagName('html')[0];
  //   if (
  //     slideRef.current &&
  //     !slideRef.current.contains(event.target as Node) &&
  //     htmlElemTag.classList.contains('notification__open')
  //   ) {
  //     toggleDropdown();
  //     htmlElemTag.removeAttribute('class');
  //   }
  // };

  // const onToggle = () => {
  //   if (isViewUpdateStatus && viewDiscardPromptStatus) {
  //     dispatch(setOpenDiscardConformationModal({ status: true }));
  //   } else {
  //     toggleDropdown();
  //   }
  // };

  return (
    <div
      className="notification__wrapper inline-flex mr-[10px] relative z-[7] cursor-pointer"
      // ref={dropdownRef}
    >
      {/* notification sake class is notification__btn__animate */}
      {/* <NotificationCount toggleDropdown={onToggle} />
      <Notification slideRef={slideRef} /> */}
      <p>notify</p>
    </div>
  );
};

export default NotificationToggle;
