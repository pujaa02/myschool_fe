import { IconInputProps } from '../types/icons';

const TrainerIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={` ${className ?? ''}`}
    >
      <path
        d="M21.17 8.58003V15.42C21.17 16.54 20.57 17.58 19.6 18.15L13.66 21.58C12.69 22.14 11.49 22.14 10.51 21.58L4.57 18.15C3.6 17.59 3 16.55 3 15.42V8.58003C3 7.46003 3.6 6.41999 4.57 5.84999L10.51 2.42C11.48 1.86 12.68 1.86 13.66 2.42L19.6 5.84999C20.57 6.41999 21.17 7.45003 21.17 8.58003Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0898 10.9998C13.3766 10.9998 14.4198 9.95662 14.4198 8.6698C14.4198 7.38298 13.3766 6.33984 12.0898 6.33984C10.8029 6.33984 9.75977 7.38298 9.75977 8.6698C9.75977 9.95662 10.8029 10.9998 12.0898 10.9998Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0898 16.6603C16.0898 14.8603 14.2998 13.4004 12.0898 13.4004C9.87984 13.4004 8.08984 14.8603 8.08984 16.6603"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrainerIcon;
