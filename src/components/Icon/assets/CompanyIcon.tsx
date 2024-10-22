import { IconInputProps } from '../types/icons';

const CompanyIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={` ${className ?? ''}`}
    >
      <path
        d="M8 1.33301L4 5.33301L5.33333 6.66634L8 3.99967L10.6667 6.66634L12 5.33301L8 1.33301Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14.6663L4 10.6663L5.33333 9.33301L8 11.9997L10.6667 9.33301L12 10.6663L8 14.6663Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1901 6.46808L11.6816 7.97656L13.1901 9.48504L14.6986 7.97656L13.1901 6.46808Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.85687 6.46808L1.34839 7.97656L2.85687 9.48504L4.36535 7.97656L2.85687 6.46808Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.95263 6.3501L6.30273 8L7.95263 9.6499L9.60253 8L7.95263 6.3501Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CompanyIcon;
