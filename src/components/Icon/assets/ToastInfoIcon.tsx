import { IconInputProps } from '../types/icons';

const ToastInfoIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
      stroke="currentColor"
      strokeWidth="3"
    >
      <path
        d="M16 2.66683C8.66665 2.66683 2.66665 8.66683 2.66665 16.0002C2.66665 23.3335 8.66665 29.3335 16 29.3335C23.3333 29.3335 29.3333 23.3335 29.3333 16.0002C29.3333 8.66683 23.3333 2.66683 16 2.66683Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21.3335L16 14.6668"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0073 10.6665L15.9953 10.6665"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ToastInfoIcon;
