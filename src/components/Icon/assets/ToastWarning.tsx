import { IconInputProps } from '../types/icons';

const ToastWarning = ({ className }: IconInputProps) => {
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
      <path d="M16 12V18.6667" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M16 28.5465H7.92001C3.29335 28.5465 1.36001 25.2399 3.60001 21.1999L7.76001 13.7065L11.68 6.66654C14.0533 2.38654 17.9467 2.38654 20.32 6.66654L24.24 13.7199L28.4 21.2132C30.64 25.2532 28.6933 28.5599 24.08 28.5599H16V28.5465Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9927 22.6665H16.0047"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ToastWarning;
