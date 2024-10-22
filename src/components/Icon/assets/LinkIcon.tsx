import { IconInputProps } from '../types/icons';

const LinkIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.2"
      className={` ${className ?? ''}`}
    >
      <path
        d="M7.19297 7.08745L5.75214 8.52829C4.95297 9.32745 4.95297 10.6166 5.75214 11.4158C6.5513 12.215 7.84047 12.215 8.63964 11.4158L10.9088 9.14662C12.5013 7.55412 12.5013 4.96412 10.9088 3.37162C9.3163 1.77912 6.7263 1.77912 5.1338 3.37162L2.66047 5.84495C1.29547 7.20995 1.29547 9.42662 2.66047 10.7975"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    //
  );
};

export default LinkIcon;
