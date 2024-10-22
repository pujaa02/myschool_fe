import { IconInputProps } from '../types/icons';

const StarSpeedIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      className={` ${className ?? ''}`}
    >
      <path
        d="M16.6717 5.64449L18.1992 8.69948C18.405 9.12198 18.9575 9.52281 19.4234 9.60948L22.1859 10.0645C23.9517 10.357 24.3634 11.6353 23.0959 12.9136L20.94 15.0695C20.5825 15.427 20.3767 16.1312 20.4959 16.6403L21.1134 19.3053C21.6009 21.407 20.4742 22.2303 18.6217 21.1253L16.0325 19.587C15.5667 19.3053 14.7867 19.3053 14.3209 19.587L11.7317 21.1253C9.8792 22.2195 8.75255 21.407 9.24005 19.3053L9.85755 16.6403C9.97672 16.142 9.77088 15.4378 9.41338 15.0695L7.25756 12.9136C5.99006 11.6461 6.40172 10.3678 8.16756 10.0645L10.93 9.60948C11.3959 9.53365 11.9484 9.12198 12.1542 8.69948L13.6817 5.64449C14.4942 3.98699 15.8376 3.98699 16.6717 5.64449Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66602 5.41699H2.16602"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.41602 20.583H2.16602"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.24935 13H2.16602" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default StarSpeedIcon;
