import { IconInputProps } from '../types/icons';

const BulkUpload = ({ className }: IconInputProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      className={` ${className ?? ''}`}
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <path
        d="M6.21289 4.33333L7.91956 2.62666L9.62622 4.33333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.91992 9.45334V2.67334"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66699 8C2.66699 10.9467 4.66699 13.3333 8.00033 13.3333C11.3337 13.3333 13.3337 10.9467 13.3337 8"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BulkUpload;
