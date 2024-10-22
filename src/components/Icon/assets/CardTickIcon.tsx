import { IconInputProps } from '../types/icons';

const CardTickIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={` ${className ?? ''}`}
    >
      <path
        d="M1.58203 6.16675H9.2487"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 11.5H5.58333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.25 11.5H9.91667"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9154 7.85325V11.2399C14.9154 13.5799 14.322 14.1666 11.9554 14.1666H4.54203C2.17536 14.1666 1.58203 13.5799 1.58203 11.2399V5.75992C1.58203 3.41992 2.17536 2.83325 4.54203 2.83325H9.2487"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 4.49992L12.25 5.49992L14.9167 2.83325"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CardTickIcon;
