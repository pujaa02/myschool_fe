import { IconInputProps } from '../types/icons';

const MarkAsSoldOut = ({ className }: IconInputProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 2.4375H4.5C3.36225 2.4375 2.4375 3.36225 2.4375 4.5V13.5C2.4375 14.6377 3.36225 15.5625 4.5 15.5625H11.25C11.5605 15.5625 11.8125 15.3105 11.8125 15C11.8125 14.6895 11.5605 14.4375 11.25 14.4375H4.5C3.98325 14.4375 3.5625 14.0168 3.5625 13.5V4.5C3.5625 3.98325 3.98325 3.5625 4.5 3.5625H6.1875V5.25C6.1875 5.97375 6.77625 6.5625 7.5 6.5625H9.75C10.4738 6.5625 11.0625 5.97375 11.0625 5.25V3.5625H12.75C13.2668 3.5625 13.6875 3.98325 13.6875 4.5V8.25C13.6875 8.5605 13.9395 8.8125 14.25 8.8125C14.5605 8.8125 14.8125 8.5605 14.8125 8.25V4.5C14.8125 3.36225 13.8877 2.4375 12.75 2.4375ZM9.9375 5.25C9.9375 5.3535 9.8535 5.4375 9.75 5.4375H7.5C7.3965 5.4375 7.3125 5.3535 7.3125 5.25V3.5625H9.9375V5.25Z"
        fill="currentColor"
      />
      <circle cx="12.5" cy="11.5" r="3.5" stroke="currentColor" />
      <path
        d="M12.9287 10.4287L13.9999 11.4999L12.9287 12.5711"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 11.5H13.9701"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MarkAsSoldOut;