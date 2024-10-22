import { IconInputProps } from '../types/icons';

const FilterIcon2 = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.2"
      stroke="currentColor"
      className={` ${className ?? ''}`}
    >
      <path
        d="M4.33301 14.6667V10"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.33301 3.33331V1.33331"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.667 14.6667V12.6667"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.667 5.99998V1.33331"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.33301 4.66665V8.66665C6.33301 9.39998 5.99967 9.99998 4.99967 9.99998H3.66634C2.66634 9.99998 2.33301 9.39998 2.33301 8.66665V4.66665C2.33301 3.93331 2.66634 3.33331 3.66634 3.33331H4.99967C5.99967 3.33331 6.33301 3.93331 6.33301 4.66665Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.667 7.33333V11.3333C13.667 12.0667 13.3337 12.6667 12.3337 12.6667H11.0003C10.0003 12.6667 9.66699 12.0667 9.66699 11.3333V7.33333C9.66699 6.6 10.0003 6 11.0003 6H12.3337C13.3337 6 13.667 6.6 13.667 7.33333Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FilterIcon2;
