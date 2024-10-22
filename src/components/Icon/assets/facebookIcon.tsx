import { IconInputProps } from '../types/icons';

const FacebookIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C18.6274 0 24 5.37259 24 12C24 18.6274 18.6274 24 12 24C5.37259 24 0 18.6274 0 12C0 5.37259 5.37259 0 12 0Z"
        fill="url(#paint0_linear_723_10039)"
      />
      <path
        d="M13.5593 23.8993V14.6303H16.1724L16.5188 11.3681H13.5593L13.5637 9.73515C13.5637 8.88428 13.6445 8.42858 14.8667 8.42858H16.5004V5.16577H13.8867C10.7472 5.16577 9.64237 6.74824 9.64237 9.40984V11.3683H7.6853V14.6309H9.64237V23.7679C10.4048 23.9198 11.193 24.0001 12.0001 24.0001C12.5214 24.0001 13.0423 23.9664 13.5593 23.8993Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_723_10039"
          x1="12"
          y1="-0.218652"
          x2="12"
          y2="25.0234"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B2FF" />
          <stop offset="1" stopColor="#006AFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default FacebookIcon;
