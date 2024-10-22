import { IconInputProps } from '../types/icons';

const MagicPen = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
    >
      <path
        d="M20.4986 20.5C19.6686 21.33 18.3286 21.33 17.4986 20.5L4.49859 7.5C3.66859 6.67 3.66859 5.33 4.49859 4.5C5.32859 3.67 6.66859 3.67 7.49859 4.5L20.4986 17.5C21.3286 18.33 21.3286 19.67 20.4986 20.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.98926 8.99L8.98926 5.99"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.499 2.44L13.999 2L14.439 3.5L13.999 5L15.499 4.56L16.999 5L16.559 3.5L16.999 2L15.499 2.44Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.49902 13.44L2.99902 13L3.43902 14.5L2.99902 16L4.49902 15.56L5.99902 16L5.55902 14.5L5.99902 13L4.49902 13.44Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MagicPen;
