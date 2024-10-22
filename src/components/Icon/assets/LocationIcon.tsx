import { IconInputProps } from '../types/icons';

const LocationIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={1.5}
      height={24}
      width={24}
      className={` ${className ?? ''}`}
    >
      <g opacity="0.3">
        <path d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z" />
        <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" />
      </g>
    </svg>

    // <svg
    //   viewBox="0 0 24 25"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   strokeWidth={1.5}
    //   stroke="currentColor"
    //   height={24}
    //   width={24}
    //   className={` ${className ?? ''}`}
    // >
    //   <path
    //     d="M12.6334 12.1265L10.3977 14.3622C9.16097 15.5989 9.16097 17.6126 10.3977 18.8494C11.6344 20.0861 13.6481 20.0861 14.8849 18.8494L18.4049 15.3294C20.8784 12.8559 20.8784 8.84445 18.4049 6.35511C15.9314 3.88163 11.9199 3.88163 9.43053 6.35511L5.59349 10.1922C3.46884 12.3168 3.46884 15.7575 5.59349 17.8822"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
  );
};

export default LocationIcon;
