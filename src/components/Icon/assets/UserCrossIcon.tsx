import { IconInputProps } from '../types/icons';

const UserCrossIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={` ${className ?? ''}`}
    >
      <path
        d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.55664 16.5C2.55664 13.5975 5.44414 11.25 8.99914 11.25C9.71914 11.25 10.4166 11.3475 11.0691 11.5275"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 13.5C16.5 13.74 16.47 13.9725 16.41 14.1975C16.3425 14.4975 16.2225 14.79 16.065 15.045C15.5475 15.915 14.595 16.5 13.5 16.5C12.7275 16.5 12.03 16.2075 11.505 15.7275C11.28 15.5325 11.085 15.3 10.935 15.045C10.6575 14.595 10.5 14.0625 10.5 13.5C10.5 12.69 10.8225 11.9475 11.3475 11.4075C11.895 10.845 12.66 10.5 13.5 10.5C14.385 10.5 15.1875 10.8825 15.7275 11.4975C16.2075 12.03 16.5 12.735 16.5 13.5Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.2719 12.705L12.6895 14.2875"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7051 12.72L14.2951 14.3025"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserCrossIcon;
