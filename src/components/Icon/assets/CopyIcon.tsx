import { IconInputProps } from '../types/icons';

const CopyIcon = ({ className }: IconInputProps) => {
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
        d="M10.6663 8.59999V11.4C10.6663 13.7333 9.73301 14.6667 7.39967 14.6667H4.59967C2.26634 14.6667 1.33301 13.7333 1.33301 11.4V8.59999C1.33301 6.26666 2.26634 5.33333 4.59967 5.33333H7.39967C9.73301 5.33333 10.6663 6.26666 10.6663 8.59999Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6663 4.59999V7.39999C14.6663 9.73333 13.733 10.6667 11.3997 10.6667H10.6663V8.59999C10.6663 6.26666 9.73301 5.33333 7.39967 5.33333H5.33301V4.59999C5.33301 2.26666 6.26634 1.33333 8.59967 1.33333H11.3997C13.733 1.33333 14.6663 2.26666 14.6663 4.59999Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CopyIcon;
