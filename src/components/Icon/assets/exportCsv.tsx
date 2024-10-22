import { IconInputProps } from '../types/icons';

const ExportCsv = ({ className }: IconInputProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      className={` ${className ?? ''}`}
    >
      <path
        d="M8.66699 7.33334L14.1337 1.86667"
        stroke="#898989"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6668 4.53333V1.33333H11.4668"
        stroke="#898989"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33301 1.33333H5.99967C2.66634 1.33333 1.33301 2.66666 1.33301 5.99999V9.99999C1.33301 13.3333 2.66634 14.6667 5.99967 14.6667H9.99967C13.333 14.6667 14.6663 13.3333 14.6663 9.99999V8.66666"
        stroke="#898989"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExportCsv;
