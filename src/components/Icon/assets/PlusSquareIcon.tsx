import { IconInputProps } from '../types/icons';

const PlusSquareIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.1"
      className={` ${className ?? ''}`}
    >
      <path d="M5.3335 8.5H10.6668" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11.1667V5.83337" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.00016 15.1667H10.0002C13.3335 15.1667 14.6668 13.8334 14.6668 10.5V6.50004C14.6668 3.16671 13.3335 1.83337 10.0002 1.83337H6.00016C2.66683 1.83337 1.3335 3.16671 1.3335 6.50004V10.5C1.3335 13.8334 2.66683 15.1667 6.00016 15.1667Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusSquareIcon;
