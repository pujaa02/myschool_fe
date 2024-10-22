import { IconInputProps } from '../types/icons';

const GoogleMeetIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
    >
      <g clipPath="url(#clip0_1219_93613)">
        <path
          d="M15.8398 12.0012L18.5694 15.0875L22.2398 17.4077L22.8798 12.0202L22.2398 6.75305L18.499 8.79155L15.8398 12.0012Z"
          fill="#00832D"
        />
        <path
          d="M0 16.9058V21.4956C0 22.5449 0.8592 23.3948 1.92 23.3948H6.56L7.52 19.9256L6.56 16.9058L3.376 15.9562L0 16.9058Z"
          fill="#0066DA"
        />
        <path
          d="M6.56 0.604614L0 7.09363L3.376 8.04324L6.56 7.09363L7.504 4.11501L6.56 0.604614Z"
          fill="#E94235"
        />
        <path d="M6.56 7.0929H0V16.9056H6.56V7.0929Z" fill="#2684FC" />
        <path
          d="M26.4306 3.35301L22.2386 6.75262V17.4073L26.4498 20.8227C27.0802 21.3102 28.0018 20.8654 28.0018 20.0725V4.08738C28.0018 3.28495 27.0594 2.84497 26.4306 3.35301ZM15.8386 12.0008V16.9071H6.55859V23.3962H20.3186C21.3794 23.3962 22.2386 22.5463 22.2386 21.4969V17.4073L15.8386 12.0008Z"
          fill="#00AC47"
        />
        <path
          d="M20.3186 0.604614H6.55859V7.09363H15.8386V12L22.2386 6.75494V2.50384C22.2386 1.45452 21.3794 0.604614 20.3186 0.604614Z"
          fill="#FFBA00"
        />
      </g>
      <defs>
        <clipPath id="clip0_1219_93613">
          <rect
            width="28"
            height="22.7907"
            fill="white"
            transform="translate(0 0.604614)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GoogleMeetIcon;
