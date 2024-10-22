import { IconInputProps } from '../types/icons';

const AccessIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth="1.5"
      stroke="currentColor"
      className={` ${className ?? ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10V8C6 4.69 7 2 12 2C16.5 2 18 4 18 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AccessIcon;
