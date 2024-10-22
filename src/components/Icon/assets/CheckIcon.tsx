import { IconInputProps } from '../types/icons';

const CheckIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={` ${className ?? ''}`}
    >
      <path
        d="M0.847656 4.75011L3.61266 7.51511L9.15243 1.98511"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
