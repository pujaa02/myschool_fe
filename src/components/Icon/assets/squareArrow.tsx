import { IconInputProps } from '../types/icons';

export const ArrowSquareStrokeSD = ({ className }: IconInputProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15.0996 16.44C14.7896 20.04 12.9396 21.51 8.88961 21.51L8.75961 21.51C4.28961 21.51 2.49961 19.72 2.49961 15.25L2.49961 8.73002C2.49961 4.26002 4.28961 2.47002 8.75961 2.47002L8.88961 2.47002C12.9096 2.47002 14.7596 3.92002 15.0896 7.46002"
        stroke="#FF6060"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.00086 12L20.3809 12"
        stroke="#FF6060"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.15 15.35L21.5 12L18.15 8.65001"
        stroke="#FF6060"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
