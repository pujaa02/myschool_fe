import { IconInputProps } from '../types/icons';

const FileIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
      strokeWidth="2"
      stroke="currentColor"
    >
      <g clipPath="url(#clip0_1244_22816)">
        <path
          d="M29.75 10.4154V24.582C29.75 28.832 27.625 31.6654 22.6667 31.6654H11.3333C6.375 31.6654 4.25 28.832 4.25 24.582V10.4154C4.25 6.16536 6.375 3.33203 11.3333 3.33203H22.6667C27.625 3.33203 29.75 6.16536 29.75 10.4154Z"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.543 6.875V9.70833C20.543 11.2667 21.818 12.5417 23.3763 12.5417H26.2096"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.332 18.918H16.9987"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.332 24.582H22.6654"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1244_22816">
          <rect width="34" height="34" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FileIcon;
