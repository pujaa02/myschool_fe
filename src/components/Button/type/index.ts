import { MouseEventHandler } from 'react';

export interface ButtonProps {
  parentClass?: string;
  type?: 'button' | 'submit' | 'reset';
  value?: string;
  className?: string;
  spanClass?: string;
  small?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClickHandler?: MouseEventHandler<HTMLElement>;
  name?: string;
  isLoading?: boolean;
  customStyle?: React.CSSProperties;
  variants?:
    | 'primary'
    | 'primary2'
    | 'primary2Border'
    | 'secondary'
    | 'primaryBordered'
    | 'secondaryBordered'
    | 'danger'
    | 'dangerBorder'
    | 'red'
    | 'orange'
    | 'gray'
    | 'whiteBordered'
    | 'purple'
    | 'grayLight'
    | 'green'
    | 'selectedGreen'
    | 'grayOutline'
    | 'greenLowOpacity';
  tooltipText?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}
