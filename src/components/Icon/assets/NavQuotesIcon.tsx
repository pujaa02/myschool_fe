import { IconInputProps } from '../types/icons';

const NavQuotesIcon = ({ className }: IconInputProps) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={` ${className ?? ''}`}
      >
        <path
          d="M15.7162 16.2234H8.49622"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.7162 12.0369H8.49622"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.2513 7.86008H8.49634"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9086 2.74979C15.9086 2.74979 8.23161 2.75379 8.21961 2.75379C5.45961 2.77079 3.75061 4.58679 3.75061 7.35679V16.5528C3.75061 19.3368 5.47261 21.1598 8.25661 21.1598C8.25661 21.1598 15.9326 21.1568 15.9456 21.1568C18.7056 21.1398 20.4156 19.3228 20.4156 16.5528V7.35679C20.4156 4.57279 18.6926 2.74979 15.9086 2.74979Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default NavQuotesIcon;