import { IconInputProps } from '../types/icons';

const BookmarkIcon2 = ({ className }: IconInputProps) => {
  return (
    <svg
      stroke="currentColor"
      strokeWidth="1.5"
      className={` ${className ?? ''}`}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 5V7.42C21 9 20 10 18.42 10H15V3.01C15 1.9 15.91 1 17.02 1C18.11 1.01 19.11 1.45 19.83 2.17C20.55 2.9 21 3.9 21 5Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 6V20C1 20.83 1.93998 21.3 2.59998 20.8L4.31 19.52C4.71 19.22 5.27 19.26 5.63 19.62L7.28998 21.29C7.67998 21.68 8.32002 21.68 8.71002 21.29L10.39 19.61C10.74 19.26 11.3 19.22 11.69 19.52L13.4 20.8C14.06 21.29 15 20.82 15 20V3C15 1.9 15.9 1 17 1H6H5C2 1 1 2.79 1 5V6Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 8H11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.75 12H10.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    // <svg
    //   width="16"
    //   height="16"
    //   viewBox="0 0 16 16"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   stroke="currentColor"
    //   strokeWidth="1.2"
    //   className={` ${className ?? ''}`}
    // >
    //   <path
    //     d="M6.16699 6.03333C7.35366 6.46666 8.64699 6.46666 9.83366 6.03333"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    //   <path
    //     d="M11.2129 1.33334H4.78622C3.36622 1.33334 2.21289 2.49334 2.21289 3.90668V13.3C2.21289 14.5 3.07289 15.0067 4.12622 14.4267L7.37956 12.62C7.72622 12.4267 8.28622 12.4267 8.62622 12.62L11.8796 14.4267C12.9329 15.0133 13.7929 14.5067 13.7929 13.3V3.90668C13.7862 2.49334 12.6329 1.33334 11.2129 1.33334Z"
    //     // strokeWidth='1.5'
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
  );
};

export default BookmarkIcon2;
