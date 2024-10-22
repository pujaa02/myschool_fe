import { IconInputProps } from '../types/icons';

const DownArrow = ({ className }: IconInputProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10646_65815)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.71752 5.97183C2.00922 5.67775 2.48409 5.67582 2.77817 5.96752L8.33499 11.4793C8.69884 11.8402 9.30116 11.8402 9.66501 11.4793L15.2218 5.96752C15.5159 5.67582 15.9908 5.67775 16.2825 5.97183C16.5742 6.26591 16.5723 6.74078 16.2782 7.03248L10.7213 12.5443C9.77271 13.4852 8.22729 13.4852 7.27865 12.5443L1.72183 7.03248C1.42775 6.74078 1.42582 6.26591 1.71752 5.97183Z"
          fill="#898989"
        />
      </g>
      <defs>
        <clipPath id="clip0_10646_65815">
          <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DownArrow;
