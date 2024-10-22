import { IconInputProps } from '../types/icons';

const RequestIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 3.46321C9.28666 1.51226 12.9969 1.51226 15.2835 3.46321C17.5722 5.41415 17.5722 8.57752 15.2835 10.5285C14.8871 10.8692 14.4439 11.149 13.9752 11.3698C12.5204 12.0569 11.1437 13.2712 11.1437 14.8472V16.2747M11.1418 21.9848H11.1574V22H11.1418V21.9848Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RequestIcon;
