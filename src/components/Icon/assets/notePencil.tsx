import { IconInputProps } from '../types/icons';

const NotePencilStrokeSD = ({ className }: IconInputProps) => {
  return (
    <svg
      className={` ${className ?? ''}`}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        d="M22 16.74V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 3.93 12.7 5.05L12.53 5.16C12.24 5.34 11.76 5.34 11.47 5.16L11.22 5.01C9.44 3.9 6.26 2.84 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.15 11.47 21.2L11.51 21.22C11.78 21.37 12.21 21.37 12.47 21.22C14.39 20.16 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 5.49V20.49" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.75 8.49H5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 11.49H5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default NotePencilStrokeSD;
