import { IconInputProps } from '../types/icons';

const UnfilledCourseIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
    >
      <path
        d="M1.33398 5.66675H9.00065"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 11H5.33333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11H9.66667"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6673 7.35325V10.7399C14.6673 13.0799 14.074 13.6666 11.7073 13.6666H4.29398C1.92732 13.6666 1.33398 13.0799 1.33398 10.7399V5.25992C1.33398 2.91992 1.92732 2.33325 4.29398 2.33325H9.00065"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 6C14.1 6 15 5.1 15 4C15 2.9 14.1 2 13 2C11.9 2 11 2.9 11 4C11 5.1 11.9 6 13 6Z"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 3.19995V4.19995"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 4.7998H13.0018"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UnfilledCourseIcon;
