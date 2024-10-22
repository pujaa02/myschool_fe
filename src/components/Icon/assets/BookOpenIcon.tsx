import { IconInputProps } from '../types/icons';

const BookOpenIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      className={` ${className ?? ''}`}
    >
      <path
        d="M23.8327 18.1345V5.05868C23.8327 3.75868 22.771 2.79451 21.4818 2.90285H21.4168C19.1418 3.09785 15.686 4.25701 13.7577 5.47035L13.5735 5.58951C13.2593 5.78451 12.7393 5.78451 12.4252 5.58951L12.1543 5.42701C10.226 4.22451 6.78102 3.07618 4.50602 2.89201C3.21685 2.78368 2.16602 3.75868 2.16602 5.04785V18.1345C2.16602 19.1745 3.01102 20.1495 4.05102 20.2795L4.36518 20.3228C6.71602 20.637 10.3452 21.8287 12.4252 22.9662L12.4685 22.9878C12.761 23.1503 13.2268 23.1503 13.5085 22.9878C15.5885 21.8395 19.2285 20.637 21.5902 20.3228L21.9477 20.2795C22.9877 20.1495 23.8327 19.1745 23.8327 18.1345Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 5.94727V22.1973" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8.39648 9.19727H5.95898"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.20898 12.4473H5.95898"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookOpenIcon;
