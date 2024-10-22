import { IconInputProps } from '../types/icons';

const NotificationBellIcon = ({ className }: IconInputProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width={24}
        height={24}
        className={` ${className ?? ''}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        />
      </svg>

      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width={24}
        height={24}
        className={` ${className ?? ''}`}
      >
        <path
          d="M14.0232 3.39499C10.1615 3.39499 7.02319 6.53332 7.02319 10.395V13.7667C7.02319 14.4783 6.71986 15.5633 6.35819 16.17L5.01653 18.3983C4.18819 19.775 4.75986 21.3033 6.27653 21.8167C11.3049 23.4967 16.7299 23.4967 21.7582 21.8167C23.1699 21.35 23.7882 19.6817 23.0182 18.3983L21.6765 16.17C21.3265 15.5633 21.0232 14.4783 21.0232 13.7667V10.395C21.0232 6.54499 17.8732 3.39499 14.0232 3.39499Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M16.1819 3.73334C15.8202 3.62834 15.4469 3.54667 15.0619 3.5C13.9419 3.36 12.8686 3.44167 11.8652 3.73334C12.2036 2.87 13.0436 2.26334 14.0236 2.26334C15.0036 2.26334 15.8436 2.87 16.1819 3.73334Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5234 22.2367C17.5234 24.1617 15.9484 25.7367 14.0234 25.7367C13.0668 25.7367 12.1801 25.34 11.5501 24.71C10.9201 24.08 10.5234 23.1933 10.5234 22.2367"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg> */}
    </>
  );
};

export default NotificationBellIcon;
