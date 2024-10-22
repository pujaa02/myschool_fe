import { useField, useFormikContext } from 'formik';
import ErrorMessage from './ErrorMessage';
import './style/radioInput.css';
import { IRadioProps, Option } from './types';

const RadioButtonGroup = ({
  name,
  options,
  label,
  parentClass,
  isCompulsory,
  optionWrapper,
  readOnly,
  isDisabled = false,
  className,
  isLoading = false,
  setSelectedValue,
  selectedValue,
  onChange,
}: IRadioProps) => {
  const formik = useFormikContext();
  const [field] = name && !readOnly ? useField(name) : [];
  const handleRadioChange = (option: string) => {
    if (!isDisabled) {
      if (field && name) {
        field.onChange({ target: { value: option, name } });
        formik.setFieldTouched(name, true, false);
      } else if (setSelectedValue) {
        setSelectedValue(option);
      }
    }
  };

  const getCheckedValue = () => {
    if (field) {
      const fieldValue =
        typeof field.value === 'boolean' ? String(field.value) : field.value;
      return fieldValue;
    }
    return selectedValue;
  };

  return (
    <div className={`${parentClass ?? ''}`}>
      {isLoading ? (
        <div className="flex gap-1">
          <div className="lazy h-[20px] flex-[1_0_0%] min-w-[50px]" />
        </div>
      ) : (
        <>
          {label && (
            <label
              className={`${
                className ?? 'text-dark'
              } block leading-normal text-sm mb-2`}
            >
              {label}
              {isCompulsory && <span className=" text-red-700">*</span>}
            </label>
          )}
        </>
      )}
      <div className={`option-wrapper ${optionWrapper ?? ''}`}>
        {options.map((option: Option, index: number) => (
          <div key={`radio_${index + 1}`}>
            {isLoading ? (
              <div className="flex gap-1 mt-2">
                <div className="lazy h-[20px] w-5 rounded-full overflow-hidden" />
                <div className="lazy h-[20px] flex-[1_0_0%] min-w-[50px]" />
              </div>
            ) : (
              <div className="flex radio-option">
                <input
                  className="radioButton peer"
                  type="radio"
                  id={`${name}_${index}`}
                  name={name}
                  value={option.value}
                  checked={option.value === getCheckedValue()}
                  disabled={isDisabled}
                  onChange={
                    onChange || (() => handleRadioChange(option.value as string))
                  }
                />
                <label
                  className="text-sm left-4 text-dark max-w-[calc(100%_-_16px)] w-full ps-1.5"
                  htmlFor={`${name}_${index}`}
                >
                  {option.label}
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
      {formik && name ? <ErrorMessage name={name} /> : ''}
    </div>
  );
};

export default RadioButtonGroup;
