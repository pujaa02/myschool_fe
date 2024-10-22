import { IconInputProps } from '../types/icons';

const CrossRoundedIcon2 = ({ className }: IconInputProps) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      className={` ${className ?? ''}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.75 1.404a6.346 6.346 0 1 0 0 12.692 6.346 6.346 0 0 0 0-12.692ZM2.447 2.447a7.5 7.5 0 1 1 10.606 10.606A7.5 7.5 0 0 1 2.447 2.447ZM5.61 5.61a.577.577 0 0 1 .816 0L7.75 6.934l1.323-1.323a.577.577 0 0 1 .816.816L8.566 7.75l1.323 1.323a.577.577 0 0 1-.816.816L7.75 8.566 6.427 9.889a.577.577 0 0 1-.816-.816L6.934 7.75 5.611 6.427a.577.577 0 0 1 0-.816Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CrossRoundedIcon2;
