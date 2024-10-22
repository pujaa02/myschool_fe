import { IconInputProps } from '../types/icons';

const StopwatchIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      className={` ${className ?? ''}`}
    >
      <path
        d="M8.0013 14.6667C4.7813 14.6667 2.16797 12.0533 2.16797 8.83333C2.16797 5.61333 4.7813 3 8.0013 3C11.2213 3 13.8346 5.61333 13.8346 8.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0039 11V14.8117"
        strokeWidth="1.18375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.2109H12.0071"
        strokeWidth="1.57833"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 5.33325V8.66659" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6 1.33325H10"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StopwatchIcon;
