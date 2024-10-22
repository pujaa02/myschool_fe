import { IconInputProps } from '../types/icons';

const ChevronRight = ({ className }: IconInputProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={24}
      width={24}
      className={` ${className ?? ''}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>

    // <svg
    //   className={` ${className ?? ''}`}
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="7"
    //   height="12"
    //   viewBox="0 0 7 12"
    //   fill="none"
    // >
    //   <path
    //     d="M5.92308 1L1 5.92308L5.92308 10.8462"
    //     stroke="currentColor"
    //     strokeWidth="2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
  );
};

export default ChevronRight;
