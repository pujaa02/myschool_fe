import { IconInputProps } from '../types/icons';

export const DotsThreeStrokeSD = ({ className }: IconInputProps) => {
  return (
    <svg
      className={` ${className ?? ''}`}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="30" height="30" rx="4" fill="#F4F4F4" />
      <circle cx="15.5" cy="9.5" r="1.5" fill="#111111" />
      <circle cx="15.5" cy="15.5" r="1.5" fill="#111111" />
      <circle cx="15.5" cy="21.5" r="1.5" fill="#111111" />
    </svg>
  );
};
