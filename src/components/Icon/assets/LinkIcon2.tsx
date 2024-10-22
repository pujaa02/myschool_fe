import { IconInputProps } from '../types/icons';

const LinkIcon2 = ({ className }: IconInputProps) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.2"
      className={` ${className ?? ''}`}
    >
      <path
        d="M10.1377 11.6663H11.15C13.1745 11.6663 14.837 10.0197 14.837 7.99967C14.837 5.98634 13.1812 4.33301 11.15 4.33301H10.1377"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.12233 4.33301H5.11676C3.08552 4.33301 1.42969 5.97967 1.42969 7.99967C1.42969 10.013 3.08552 11.6663 5.11676 11.6663H6.12233"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.45166 8H10.8147" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default LinkIcon2;
