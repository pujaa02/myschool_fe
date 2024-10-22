import { IconInputProps } from '../types/icons';

const LinkIcon3 = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={` ${className ?? ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M5.79643 19C4.61289 18.8887 3.44494 18.3321 2.54171 17.362C0.486096 15.1516 0.486096 11.5258 2.54171 9.31539L5.95217 5.65783C8.00778 3.44739 11.3871 3.44739 13.4583 5.65783C15.5139 7.86828 15.5139 11.494 13.4583 13.7045L11.7608 15.5333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2036 4C19.3871 4.11132 20.5551 4.6679 21.4583 5.63795C23.5139 7.8484 23.5139 11.4742 21.4583 13.6846L18.0478 17.3422C15.9922 19.5526 12.6129 19.5526 10.5417 17.3422C8.4861 15.1317 8.4861 11.506 10.5417 9.29551L12.2392 7.46673"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LinkIcon3;
