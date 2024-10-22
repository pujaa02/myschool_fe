import { IconInputProps } from '../types/icons';

const LineMenuIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      strokeWidth="1.2"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
    >
      <path d="M 2 3.66675 H 14" strokeLinecap="round" />
      <path d="M 2 8.26675 H 14" strokeLinecap="round" />
      <path d="M 2 12.76675 H 14" strokeLinecap="round" />
      {/* <path d="M2 4.66675H14" strokeLinecap="round" />
      <path d="M2 8H14" strokeLinecap="round" />
      <path d="M2 11.3333H14" strokeLinecap="round" /> */}
    </svg>
  );
};

export default LineMenuIcon;
