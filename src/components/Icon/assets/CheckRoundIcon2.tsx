import { IconInputProps } from '../types/icons';

const CheckRoundIcon2 = ({ className }: IconInputProps) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      className={` ${className ?? ''}`}
    >
      <path
        d="M31.1654 15.6976V17.0009C31.1636 20.0559 30.1744 23.0284 28.3453 25.4752C26.5161 27.922 23.945 29.712 21.0155 30.5781C18.0859 31.4443 14.9548 31.3403 12.0892 30.2816C9.22358 29.2229 6.77696 27.2663 5.11423 24.7035C3.45149 22.1407 2.66174 19.109 2.86274 16.0607C3.06374 13.0124 4.24474 10.1107 6.22959 7.78847C8.21445 5.46619 10.8968 3.84774 13.8766 3.17449C16.8565 2.50124 19.9741 2.80926 22.7645 4.05261M31.1654 5.66761L16.9987 19.8484L12.7487 15.5984"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckRoundIcon2;
