import { IconInputProps } from '../types/icons';

const UserProfile = ({ className }: IconInputProps) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M11.1466 9.96409C11.0549 9.95492 10.9449 9.95492 10.8441 9.96409C8.66243 9.89075 6.92993 8.10325 6.92993 5.90325C6.92993 3.65742 8.74493 1.83325 10.9999 1.83325C13.2458 1.83325 15.0699 3.65742 15.0699 5.90325C15.0608 8.10325 13.3283 9.89075 11.1466 9.96409Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.56341 13.3467C4.34507 14.8317 4.34507 17.2517 6.56341 18.7276C9.08424 20.4142 13.2184 20.4142 15.7392 18.7276C17.9576 17.2426 17.9576 14.8226 15.7392 13.3467C13.2276 11.6692 9.09341 11.6692 6.56341 13.3467Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserProfile;
