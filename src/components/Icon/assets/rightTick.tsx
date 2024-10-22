import { IconInputProps } from '../types/icons';

export const RightTickStrokeSD = ({ className }: IconInputProps) => {
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
        d="M8.00065 14.6667C11.6673 14.6667 14.6673 11.6667 14.6673 7.99999C14.6673 4.33333 11.6673 1.33333 8.00065 1.33333C4.33398 1.33333 1.33398 4.33333 1.33398 7.99999C1.33398 11.6667 4.33398 14.6667 8.00065 14.6667Z"
        stroke="#898989"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.16602 7.99999L7.05268 9.88666L10.8327 6.11333"
        stroke="#898989"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
