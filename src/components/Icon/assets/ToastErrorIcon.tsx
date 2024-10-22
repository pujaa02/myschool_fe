import { IconInputProps } from '../types/icons';

const ToastErrorIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
      stroke="currentColor"
      strokeWidth="3.5"
    >
      <path
        d="M15.6017 20.8966V20.0616C15.6017 17.3572 17.2722 15.9254 18.9426 14.7721C20.5731 13.6585 22.2035 12.2268 22.2035 9.60199C22.2035 5.94313 19.2606 3 15.6017 3C11.9429 3 9 5.94313 9 9.60199"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5849 26.4026H15.6207"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ToastErrorIcon;
