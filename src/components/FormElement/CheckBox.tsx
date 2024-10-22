// ** components **

// ** style **
import { useField } from 'formik';
import ErrorMessage from './ErrorMessage';
import './style/checkbox.css';

// ** type **
import ToolTip from 'components/Tooltip';
import { ICheckboxProps } from './types/index';

const Checkbox = ({
  text,
  name,
  parentClass,
  disabled = false,
  value,
  onChange,
  customClass,
  labelClass,
  check,
  id,
  isLoading = false,
  showError = true,
  isTooltip = false,
}: ICheckboxProps) => {
  const [field] = name ? useField(name) : [];
  return (
    <>
      <div className={`flex relative group z-0 ${parentClass ?? ''} `}>
        {isLoading ? (
          <div className="flex gap-1">
            <div className="lazy h-[20px] w-5 rounded-full overflow-hidden" />
            <div className="lazy h-[20px] flex-[1_0_0%] min-w-[50px]" />
          </div>
        ) : (
          <>
            <input
              type="checkbox"
              className={`checkbox-input ${customClass ?? ''}  ${
                disabled ? '!cursor-default' : ''
              } `}
              id={id}
              name={name}
              disabled={disabled}
              value={value}
              onChange={!disabled ? onChange ?? field?.onChange : undefined}
              checked={check}
            />
            {text ? (
              <>
                <label
                  className={`text-sm left-4 text-dark max-w-[calc(100%_-_20px)] w-full ps-1.5 truncate ${
                    labelClass ?? ''
                  } ${disabled ? 'cursor-default' : ''}`}
                  htmlFor={id}
                  title={text}
                >
                  {text}
                </label>
                {isTooltip ? <ToolTip text={text} position="left" /> : ''}
              </>
            ) : (
              ''
            )}
          </>
        )}
      </div>

      {name && showError ? <ErrorMessage name={name} /> : ''}
    </>
  );
};

export default Checkbox;
