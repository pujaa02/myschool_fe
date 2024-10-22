import { IconInputProps } from '../types/icons';

const MailIcon = ({ className }: IconInputProps) => {
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
        d="M11.333 13.6667H4.66634C2.66634 13.6667 1.33301 12.6667 1.33301 10.3333V5.66667C1.33301 3.33334 2.66634 2.33334 4.66634 2.33334H11.333C13.333 2.33334 14.6663 3.33334 14.6663 5.66667V10.3333C14.6663 12.6667 13.333 13.6667 11.333 13.6667Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3337 6L9.24699 7.66667C8.56032 8.21333 7.43366 8.21333 6.74699 7.66667L4.66699 6"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MailIcon;
