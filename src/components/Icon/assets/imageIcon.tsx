import { IconInputProps } from '../types/icons';

const ImageIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 30 30"
      className={` ${className ?? ''}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.75 28.4375H11.25C4.4625 28.4375 1.5625 25.5375 1.5625 18.75V11.25C1.5625 4.4625 4.4625 1.5625 11.25 1.5625H18.75C25.5375 1.5625 28.4375 4.4625 28.4375 11.25V18.75C28.4375 25.5375 25.5375 28.4375 18.75 28.4375ZM11.25 3.4375C5.4875 3.4375 3.4375 5.4875 3.4375 11.25V18.75C3.4375 24.5125 5.4875 26.5625 11.25 26.5625H18.75C24.5125 26.5625 26.5625 24.5125 26.5625 18.75V11.25C26.5625 5.4875 24.5125 3.4375 18.75 3.4375H11.25Z" />
      <path d="M11.25 13.4375C9.35 13.4375 7.8125 11.9 7.8125 10C7.8125 8.1 9.35 6.5625 11.25 6.5625C13.15 6.5625 14.6875 8.1 14.6875 10C14.6875 11.9 13.15 13.4375 11.25 13.4375ZM11.25 8.4375C10.3875 8.4375 9.6875 9.1375 9.6875 10C9.6875 10.8625 10.3875 11.5625 11.25 11.5625C12.1125 11.5625 12.8125 10.8625 12.8125 10C12.8125 9.1375 12.1125 8.4375 11.25 8.4375Z" />
      <path d="M3.33746 24.625C3.03746 24.625 2.73746 24.475 2.56246 24.2125C2.27496 23.7875 2.38746 23.2 2.82496 22.9125L8.98746 18.775C10.3375 17.8625 12.2 17.975 13.425 19.0125L13.8375 19.375C14.4625 19.9125 15.525 19.9125 16.1375 19.375L21.3375 14.9125C22.6625 13.775 24.75 13.775 26.0875 14.9125L28.125 16.6625C28.5125 17 28.5625 17.5875 28.225 17.9875C27.8875 18.375 27.3 18.425 26.9 18.0875L24.8625 16.3375C24.2375 15.8 23.175 15.8 22.55 16.3375L17.35 20.7999C16.025 21.9374 13.9375 21.9374 12.6 20.7999L12.1875 20.4375C11.6125 19.95 10.6625 19.9 10.025 20.3375L3.86246 24.475C3.69996 24.575 3.51246 24.625 3.33746 24.625Z" />
    </svg>
  );
};

export default ImageIcon;