import { IconInputProps } from '../types/icons';

const DownloadFile = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      className={` ${className ?? ''}`}
    >
      <path d="M9 11V17L11 15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 17L7 15" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownloadFile;
