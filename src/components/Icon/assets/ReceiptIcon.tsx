import { IconInputProps } from '../types/icons';

const ReceiptIcon = ({ className }: IconInputProps) => {
  return (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth={1.5}
        className={` ${className ?? ''}`}
        stroke="currentColor"
      >
        <path
          d="M16.5 4.5V6.315C16.5 7.5 15.75 8.25 14.565 8.25H12V3.0075C12 2.175 12.6825 1.5 13.515 1.5C14.3325 1.5075 15.0825 1.8375 15.6225 2.3775C16.1625 2.925 16.5 3.675 16.5 4.5Z"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.5 5.25V15.75C1.5 16.3725 2.20498 16.725 2.69998 16.35L3.9825 15.39C4.2825 15.165 4.7025 15.195 4.9725 15.465L6.21748 16.7175C6.50998 17.01 6.99002 17.01 7.28252 16.7175L8.54251 15.4575C8.80501 15.195 9.225 15.165 9.5175 15.39L10.8 16.35C11.295 16.7175 12 16.365 12 15.75V3C12 2.175 12.675 1.5 13.5 1.5H5.25H4.5C2.25 1.5 1.5 2.8425 1.5 4.5V5.25Z"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4.5 6.75H9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.0625 9.75H8.4375" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
};

export default ReceiptIcon;
