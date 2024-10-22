import { IconInputProps } from '../types/icons';

const SendIcon = ({ className }: IconInputProps) => {
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={` ${className ?? ''}`}
      >
        <path
          d="M3.60655 14.4998C2.85988 14.4998 2.38655 14.2464 2.08655 13.9464C1.49988 13.3598 1.08655 12.1131 2.40655 9.46644L2.98655 8.3131C3.05988 8.15977 3.05988 7.83977 2.98655 7.68644L2.40655 6.5331C1.07988 3.88644 1.49988 2.6331 2.08655 2.0531C2.66655 1.46644 3.91988 1.04644 6.55988 2.3731L12.2666 5.22644C13.6866 5.9331 14.4666 6.91977 14.4666 7.99977C14.4666 9.07977 13.6866 10.0664 12.2732 10.7731L6.56655 13.6264C5.27322 14.2731 4.31322 14.4998 3.60655 14.4998ZM3.60655 2.49977C3.24655 2.49977 2.96655 2.58644 2.79322 2.75977C2.30655 3.23977 2.49988 4.48644 3.29988 6.07977L3.87988 7.23977C4.09322 7.6731 4.09322 8.32644 3.87988 8.75977L3.29988 9.9131C2.49988 11.5131 2.30655 12.7531 2.79322 13.2331C3.27322 13.7198 4.51988 13.5264 6.11988 12.7264L11.8266 9.8731C12.8732 9.3531 13.4666 8.66644 13.4666 7.9931C13.4666 7.31977 12.8666 6.6331 11.8199 6.1131L6.11322 3.26644C5.09988 2.75977 4.22655 2.49977 3.60655 2.49977Z"
          fill="currentColor"
        />
        <path
          d="M7.22671 8.5H3.62671C3.35338 8.5 3.12671 8.27333 3.12671 8C3.12671 7.72667 3.35338 7.5 3.62671 7.5H7.22671C7.50004 7.5 7.72671 7.72667 7.72671 8C7.72671 8.27333 7.50004 8.5 7.22671 8.5Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

export default SendIcon;
