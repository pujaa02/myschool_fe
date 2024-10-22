import { IconInputProps } from '../types/icons';

export const LeftArrowStrokeSD = ({ className }: IconInputProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currecolor"
      strokeWidth="1.5"
    >
      <path
        d="M9.61914 3.95334L13.6658 8.00001L9.61914 12.0467"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.33398 8H13.554"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
