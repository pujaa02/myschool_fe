import { IconInputProps } from '../types/icons';

const BookmarkIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.2"
      className={` ${className ?? ''}`}
    >
      <path
        d="M6.16699 6.03333C7.35366 6.46666 8.64699 6.46666 9.83366 6.03333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2129 1.33334H4.78622C3.36622 1.33334 2.21289 2.49334 2.21289 3.90668V13.3C2.21289 14.5 3.07289 15.0067 4.12622 14.4267L7.37956 12.62C7.72622 12.4267 8.28622 12.4267 8.62622 12.62L11.8796 14.4267C12.9329 15.0133 13.7929 14.5067 13.7929 13.3V3.90668C13.7862 2.49334 12.6329 1.33334 11.2129 1.33334Z"
        // strokeWidth='1.5'
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookmarkIcon;
