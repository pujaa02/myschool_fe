// ** Types **
import { ButtonProps } from './type';

// ** style **
import Loaders from 'components/Loaders';
import ToolTip from 'components/Tooltip';
import './style/index.css';

const Button = ({
  // parentClass,
  small,
  className,
  children,
  type = 'button',
  disabled,
  onClickHandler,
  variants,
  value,
  name,
  isLoading,
  customStyle,
  tooltipText,
  tooltipPosition,
  spanClass,
}: ButtonProps) => {
  // previous default variant was whiteBordered
  const getButtonClasses = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'button primary ';
      case 'primary2':
        return 'button primary2 ';
      case 'primary2Border':
        return 'button primary2Border ';
      case 'danger':
        return 'button danger ';
      case 'dangerBorder':
        return 'button dangerBorder ';
      case 'red':
        return 'button red ';
      case 'orange':
        return 'button orange ';
      case 'gray':
        return 'button gray ';
      case 'grayLight':
        return 'button grayLight ';
      case 'secondary':
        return 'button secondary ';
      case 'primaryBordered':
        return 'button primaryBordered ';
      case 'secondaryBordered':
        return 'button secondaryBordered ';
      case 'whiteBordered':
        return 'button ';
      case 'purple':
        return 'button purple';
      case 'green':
        return 'button green';
      case 'selectedGreen':
        return 'button selectedGreen';
      case 'grayOutline':
        return 'button grayOutline';
      case 'greenLowOpacity':
        return 'button greenLowOpacity';
      default:
        return '';
    }
  };

  return (
    <>
      {onClickHandler || type !== 'button' ? (
        // <div className={`${parentClass ?? ''}`}>
        //   </div>
        <button
          type={type}
          style={customStyle}
          disabled={disabled ?? isLoading}
          className={` ${tooltipText ? 'relative group' : ''} ${
            variants ? getButtonClasses(variants) : ''
          }  ${small ? ' !py-1.5 !px-2.5 !font-normal ' : ''} ${
            isLoading && 'flex justify-center items-center gap-0.5'
          }  ${className ?? ''}`}
          onClick={onClickHandler}
          name={name}
        >
          {value}
          {children}
          {isLoading ? <Loaders type="Spin" className="ms-1" /> : ''}
          {tooltipText && (
            <ToolTip
              text={tooltipText}
              position={`${tooltipPosition ?? 'left'}`}
              spanClass={spanClass}
            />
          )}
        </button>
      ) : (
        <span
          style={customStyle}
          className={` ${tooltipText ? 'relative group' : ''} ${
            variants ? getButtonClasses(variants) : ''
          } ${small ? '!py-1.5 !px-2.5 !font-normal ' : ''}${className ?? ''}`}
        >
          {value}
          {children}
          {tooltipText && (
            <ToolTip
              text={tooltipText}
              position={`${tooltipPosition ?? 'left'}`}
              spanClass={spanClass}
            />
          )}
        </span>
      )}
    </>
  );
};

export default Button;
