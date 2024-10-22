import { IconInputProps } from '../types/icons';

const MapMarker = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={` ${className ?? ''}`}
    >
      <path d="M7.9998 8.39365C9.07676 8.39365 9.9498 7.52061 9.9498 6.44365C9.9498 5.3667 9.07676 4.49365 7.9998 4.49365C6.92285 4.49365 6.0498 5.3667 6.0498 6.44365C6.0498 7.52061 6.92285 8.39365 7.9998 8.39365Z" />
      <path d="M2.76207 5.30625C3.99332 -0.106249 12.0121 -0.0999984 13.2371 5.3125C13.9558 8.4875 11.9808 11.175 10.2496 12.8375C8.99332 14.05 7.00582 14.05 5.74332 12.8375C4.01832 11.175 2.04332 8.48125 2.76207 5.30625Z" />
    </svg>
  );
};

export default MapMarker;
