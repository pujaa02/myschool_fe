import { IconInputProps } from '../types/icons';

const Box3DIcon = ({ className }: IconInputProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="512"
        height="512"
        x="0"
        y="0"
        viewBox="0 0 64 64"
        fill="currentColor"
        opacity="1"
        className={` ${className ?? ''}`}
      >
        <g>
          <path
            d="M32.001 58c-.346 0-.69-.089-1-.268l-20.785-12a2 2 0 0 1-1-1.732V20a2 2 0 0 1 1-1.732l20.785-12a2.001 2.001 0 0 1 2 0l20.783 12a2 2 0 0 1 1 1.732v24a2 2 0 0 1-1 1.732l-20.783 12c-.31.179-.654.268-1 .268zM13.216 42.845 32.001 53.69l18.783-10.845v-21.69L32.001 10.31 13.216 21.155z"
            fill="currentColor"
          />
          <path
            d="M32.001 58a2 2 0 0 1-2-2V32a2 2 0 0 1 4 0v24a2 2 0 0 1-2 2z"
            fill="currentColor"
          />
          <path
            d="M31.999 34a1.98 1.98 0 0 1-.998-.269l-20.785-12a2 2 0 1 1 1.999-3.463l20.785 12A2 2 0 0 1 31.999 34z"
            fill="currentColor"
          />
          <path
            d="M32.003 34a2.001 2.001 0 0 1-1.002-3.732l20.783-12a2 2 0 1 1 2 3.464l-20.783 12a1.987 1.987 0 0 1-.998.268z"
            fill="currentColor"
          />
        </g>
      </svg>
    </>
  );
};

export default Box3DIcon;
