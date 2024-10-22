import { IconInputProps } from '../types/icons';

const ZoomIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
    >
      <mask
        id="mask0_1219_93584"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="26"
        height="26"
      >
        <path
          d="M12.6275 25.6275C19.6014 25.6275 25.2549 19.974 25.2549 13C25.2549 6.02606 19.6014 0.372559 12.6275 0.372559C5.6535 0.372559 0 6.02606 0 13C0 19.974 5.6535 25.6275 12.6275 25.6275Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_1219_93584)">
        <path
          d="M-0.685547 -0.313721H25.9419V26.3137H-0.685547V-0.313721Z"
          fill="#2D8CFF"
        />
      </g>
      <mask
        id="mask1_1219_93584"
        maskUnits="userSpaceOnUse"
        x="4"
        y="8"
        width="17"
        height="10"
      >
        <path
          d="M16.471 11.3594L20.0396 8.75159C20.3512 8.49767 20.5887 8.55669 20.5887 9.0261V16.9787C20.5887 17.5057 20.2922 17.4453 20.0396 17.2532L16.471 14.6453V11.3594ZM4.39258 9.04532V14.9747C4.39585 15.6185 4.65461 16.2345 5.11197 16.6875C5.56934 17.1405 6.18788 17.3933 6.8316 17.3904H15.4787C15.5956 17.3908 15.708 17.3448 15.7911 17.2624C15.8742 17.1801 15.9213 17.0682 15.922 16.9512V11.0218C15.9187 10.3781 15.66 9.76199 15.2026 9.309C14.7452 8.85601 14.1267 8.60318 13.483 8.6061H4.83591C4.71893 8.60574 4.60658 8.65176 4.52348 8.73409C4.44038 8.81642 4.3933 8.92834 4.39258 9.04532Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_1219_93584)">
        <path d="M3.70703 7.92102H21.2757V18.0779H3.70703V7.92102Z" fill="white" />
      </g>
    </svg>
  );
};

export default ZoomIcon;