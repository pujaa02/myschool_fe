import { IconInputProps } from '../types/icons';

const EditIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      className={` ${className ?? ''}`}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0399 3.02L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96C22.3399 6.6 22.9799 5.02 20.9799 3.02C18.9799 1.02 17.3999 1.66 16.0399 3.02Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9102 4.15C15.5802 6.54 17.4502 8.41 19.8502 9.09"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon;