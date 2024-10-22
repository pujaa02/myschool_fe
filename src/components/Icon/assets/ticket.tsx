import { IconInputProps } from '../types/icons';

const TicketStrokeSD = ({ className }: IconInputProps) => {
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
        d="M5.46005 18.49V15.57C5.46005 14.6 6.22005 13.73 7.30005 13.73C8.27005 13.73 9.14005 14.49 9.14005 15.57V18.38C9.14005 20.33 7.52005 21.95 5.57005 21.95C3.62005 21.95 2.00005 20.32 2.00005 18.38V12.22C1.89005 6.6 6.33005 2.05 11.95 2.05C17.57 2.05 22 6.6 22 12.11V18.27C22 20.22 20.38 21.84 18.43 21.84C16.48 21.84 14.86 20.22 14.86 18.27V15.46C14.86 14.49 15.62 13.62 16.7 13.62C17.67 13.62 18.54 14.38 18.54 15.46V18.49"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TicketStrokeSD;
