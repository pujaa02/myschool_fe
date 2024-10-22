import { IconInputProps } from '../types/icons';

const CrossIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      className={`stroke-current ${className ?? ''}`}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="2"
    >
      <path
        d="M1.49609 13.7246L13.4961 1.72461M1.49609 1.72461L13.4961 13.7246"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CrossIcon;
