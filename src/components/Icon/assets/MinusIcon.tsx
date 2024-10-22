import { IconInputProps } from '../types/icons';

const MinusIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      className={` ${className ?? ''}`}
      width="18"
      height="2"
      viewBox="0 0 18 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M1.5 1H16.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default MinusIcon;
