import { IconInputProps } from '../types/icons';

const ToastSuccessIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        d="M9.97333 24.4668L14.1067 27.6668C14.64 28.2001 15.84 28.4668 16.64 28.4668H21.7067C23.3067 28.4668 25.04 27.2668 25.44 25.6668L28.64 15.9335C29.3067 14.0668 28.1067 12.4668 26.1067 12.4668H20.7733C19.9733 12.4668 19.3067 11.8001 19.44 10.8668L20.1067 6.60012C20.3733 5.40012 19.5733 4.06679 18.3733 3.66679C17.3067 3.26679 15.9733 3.80012 15.44 4.60012L9.97333 12.7335"
        strokeMiterlimit="10"
      />
      <path
        d="M3.17334 24.4667V11.4C3.17334 9.53337 3.97334 8.8667 5.84001 8.8667H7.17334C9.04001 8.8667 9.84001 9.53337 9.84001 11.4V24.4667C9.84001 26.3334 9.04001 27 7.17334 27H5.84001C3.97334 27 3.17334 26.3334 3.17334 24.4667Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ToastSuccessIcon;
