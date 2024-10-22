import { IconInputProps } from '../types/icons';

const EmailTemplateIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width={24}
      height={24}
      className={` ${className ?? ''}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3333 13.6663H4.66659C2.66659 13.6663 1.33325 12.6663 1.33325 10.333V5.66634C1.33325 3.33301 2.66659 2.33301 4.66659 2.33301H11.3333C13.3333 2.33301 14.6666 3.33301 14.6666 5.66634V10.333C14.6666 12.6663 13.3333 13.6663 11.3333 13.6663Z"
        stroke="white"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3334 6L9.24674 7.66667C8.56008 8.21333 7.43341 8.21333 6.74674 7.66667L4.66675 6"
        stroke="white"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EmailTemplateIcon;
