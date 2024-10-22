import { IconInputProps } from '../types/icons';

const ExclamationMarkIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={` ${className ?? ''}`}
    >
      <path d="M9.00195 4.5V9.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.99609 12.5H9.00508" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ExclamationMarkIcon;
