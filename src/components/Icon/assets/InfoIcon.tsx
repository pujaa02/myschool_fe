import { IconInputProps } from '../types/icons';

const InfoIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
    >
      <path
        d="M9.99992 1.66658C5.41659 1.66658 1.66659 5.41658 1.66659 9.99992C1.66659 14.5833 5.41659 18.3333 9.99992 18.3333C14.5833 18.3333 18.3333 14.5833 18.3333 9.99992C18.3333 5.41659 14.5833 1.66659 9.99992 1.66658Z"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.3333L10 9.16659"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0046 6.66675L9.99715 6.66675"
        stroke="CurrentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InfoIcon;
