import { IconInputProps } from '../types/icons';

const ChatBubbleIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.2"
      className={` ${className ?? ''}`}
    >
      <path
        d="M4.08333 11.7508H6.41667L9.01251 13.4775C9.39751 13.7342 9.91667 13.46 9.91667 12.9933V11.7508C11.6667 11.7508 12.8333 10.5841 12.8333 8.83415V5.33415C12.8333 3.58415 11.6667 2.41748 9.91667 2.41748H4.08333C2.33333 2.41748 1.16667 3.58415 1.16667 5.33415V8.83415C1.16667 10.5841 2.33333 11.7508 4.08333 11.7508Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChatBubbleIcon;
