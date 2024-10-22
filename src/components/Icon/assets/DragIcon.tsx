import { IconInputProps } from '../types/icons';

const DragIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${className ?? ''}`}
    >
      <path
        d="M6 5.48047C6.82843 5.48047 7.5 4.8089 7.5 3.98047C7.5 3.15204 6.82843 2.48047 6 2.48047C5.17157 2.48047 4.5 3.15204 4.5 3.98047C4.5 4.8089 5.17157 5.48047 6 5.48047Z"
        fill="black"
      />
      <path
        d="M6 11.4805C6.82843 11.4805 7.5 10.8089 7.5 9.98047C7.5 9.15204 6.82843 8.48047 6 8.48047C5.17157 8.48047 4.5 9.15204 4.5 9.98047C4.5 10.8089 5.17157 11.4805 6 11.4805Z"
        fill="black"
      />
      <path
        d="M6 17.4805C6.82843 17.4805 7.5 16.8089 7.5 15.9805C7.5 15.152 6.82843 14.4805 6 14.4805C5.17157 14.4805 4.5 15.152 4.5 15.9805C4.5 16.8089 5.17157 17.4805 6 17.4805Z"
        fill="black"
      />
      <path
        d="M12 5.48047C12.8284 5.48047 13.5 4.8089 13.5 3.98047C13.5 3.15204 12.8284 2.48047 12 2.48047C11.1716 2.48047 10.5 3.15204 10.5 3.98047C10.5 4.8089 11.1716 5.48047 12 5.48047Z"
        fill="black"
      />
      <path
        d="M12 11.4805C12.8284 11.4805 13.5 10.8089 13.5 9.98047C13.5 9.15204 12.8284 8.48047 12 8.48047C11.1716 8.48047 10.5 9.15204 10.5 9.98047C10.5 10.8089 11.1716 11.4805 12 11.4805Z"
        fill="black"
      />
      <path
        d="M12 17.4805C12.8284 17.4805 13.5 16.8089 13.5 15.9805C13.5 15.152 12.8284 14.4805 12 14.4805C11.1716 14.4805 10.5 15.152 10.5 15.9805C10.5 16.8089 11.1716 17.4805 12 17.4805Z"
        fill="black"
      />
    </svg>
  );
};

export default DragIcon;
