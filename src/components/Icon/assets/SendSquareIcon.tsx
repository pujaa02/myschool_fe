import { IconInputProps } from '../types/icons';

const SendSquareIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path
        d="M5.99967 14.6667H9.99967C13.333 14.6667 14.6663 13.3333 14.6663 9.99999V5.99999C14.6663 2.66666 13.333 1.33333 9.99967 1.33333H5.99967C2.66634 1.33333 1.33301 2.66666 1.33301 5.99999V9.99999C1.33301 13.3333 2.66634 14.6667 5.99967 14.6667Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.05957 5.12H9.88624V7.95333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.88662 5.12L6.11328 8.89333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 11.0067C6.59333 11.8733 9.40667 11.8733 12 11.0067"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendSquareIcon;
