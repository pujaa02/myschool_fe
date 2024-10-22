import { IconInputProps } from '../types/icons';

const UserGroupIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.2"
      className={` ${className ?? ''}`}
    >
      <path
        d="M6.10671 7.24668C6.04004 7.24001 5.96004 7.24001 5.88671 7.24668C4.30004 7.19334 3.04004 5.89334 3.04004 4.29334C3.04004 2.66001 4.36004 1.33334 6.00004 1.33334C7.63337 1.33334 8.96004 2.66001 8.96004 4.29334C8.95337 5.89334 7.69337 7.19334 6.10671 7.24668Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9402 2.66666C12.2335 2.66666 13.2735 3.71332 13.2735 4.99999C13.2735 6.25999 12.2735 7.28666 11.0268 7.33332C10.9735 7.32666 10.9135 7.32666 10.8535 7.33332"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.77348 9.70666C1.16014 10.7867 1.16014 12.5467 2.77348 13.62C4.60681 14.8467 7.61348 14.8467 9.44681 13.62C11.0601 12.54 11.0601 10.78 9.44681 9.70666C7.62014 8.48666 4.61348 8.48666 2.77348 9.70666Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2266 13.3333C12.7066 13.2333 13.1599 13.04 13.5332 12.7533C14.5732 11.9733 14.5732 10.6867 13.5332 9.90668C13.1666 9.62668 12.7199 9.44001 12.2466 9.33334"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserGroupIcon;
