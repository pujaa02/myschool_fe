import { IconInputProps } from '../types/icons';

const DownloadFile2 = ({ className }: IconInputProps) => {
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
        d="M9.78662 11.6664L8.07995 13.373L6.37329 11.6664"
        stroke="#069FC1"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.08008 6.54715L8.08008 13.3271"
        stroke="#069FC1"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 8C13.3333 5.05333 11.3333 2.66667 7.99992 2.66667C4.66659 2.66667 2.66659 5.05333 2.66658 8"
        stroke="#069FC1"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownloadFile2;
