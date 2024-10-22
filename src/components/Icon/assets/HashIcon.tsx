import { IconInputProps } from '../types/icons';

const HashIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={`!stroke-none ${className ?? ''}`}
    >
      <g>
        <path
          d="M20 14h-4.3l.7-4H20c.6 0 1-.4 1-1s-.4-1-1-1h-3.2l.7-3.8c.1-.5-.2-1.1-.8-1.2h-.1c-.5-.1-1.1.2-1.2.7v.1L14.7 8h-3.9l.7-3.8c.1-.5-.2-1.1-.8-1.2h-.1c-.5-.1-1.1.2-1.2.7v.1L8.7 8H4c-.6 0-1 .4-1 1s.4 1 1 1h4.3l-.7 4H4c-.6 0-1 .4-1 1s.4 1 1 1h3.2l-.7 3.8c-.1.5.2 1.1.8 1.2h.1c.5.1 1.1-.2 1.2-.7v-.1l.7-4.2h3.9l-.7 3.8c-.1.5.2 1.1.8 1.2h.1c.5.1 1.1-.2 1.2-.7v-.1l.8-4.2H20c.6 0 1-.4 1-1s-.4-1-1-1zM9.7 14l.7-4h3.9l-.7 4z"
          fill="currentColor"
          opacity="1"
        />
      </g>
    </svg>
  );
};

export default HashIcon;
