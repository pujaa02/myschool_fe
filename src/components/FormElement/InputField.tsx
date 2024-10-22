import { useField } from 'formik';
import { forwardRef, Ref } from 'react';

// ** component **
import ErrorMessage from './ErrorMessage';

// ** type **

//  ** style **
import './style/inputField.css';
import { InputProps } from './types';

const InputField = (
  {
    name,
    value,
    label,
    id,
    placeholder,
    className,
    isDisabled = false,
    type,
    onBlur,
    onKeyUp,
    onKeyDown,
    min,
    max,
    isCompulsory,
    onFocus,
    icon,
    parentClass,
    labelClass,
    maxLength,
    onChange,
    prefix,
    prefixBig,
    isLoading = false,
    customStyle,
    showError = true,
  }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  const [field] = useField(name);
  const getPrefixClass = () => {
    if (prefix && prefixBig) {
      return ' !ps-16 ';
    }
    if (prefix) {
      return ' !ps-12 ';
    }
    return '';
  };
  return (
    <div className={`w-full relative  ${parentClass ?? ''}`}>
      {isLoading ? (
        <div className="lazy h-[50px]" />
      ) : (
        <>
          {label && (
            <label
              className={`text-sm text-[#111111] leading-4 inline-block mb-2 ${
                labelClass ?? ''
              }`}
              htmlFor={name}
            >
              {label}
              {isCompulsory && <span className="text-red-700">*</span>}
            </label>
          )}
          {prefix && (
            <span
              className={`absolute bg-offWhite2 rounded-s-lg h-[47px] flex items-center justify-center text-sm leading-5 font-medium text-grayText left-0 text-center border-e border-solid border-borderColor ${
                prefix && !label ? ' top-0' : ' top-[29px]'
              } ${prefix && prefixBig ? ' w-14' : prefix ? ' w-10' : ''}`}
            >
              {prefix}
            </span>
          )}
          <input
            style={customStyle}
            className={`inputField ${getPrefixClass()} ${className ?? ''}`}
            id={id}
            ref={ref}
            placeholder={placeholder ?? ''}
            type={type}
            {...field}
            name={name}
            min={min}
            max={max}
            maxLength={maxLength}
            onFocus={onFocus}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            onChange={!isDisabled ? onChange ?? field.onChange : undefined}
            value={value ?? field.value ?? ''}
            onBlur={onBlur}
            autoComplete="off"
            disabled={isDisabled ?? false}
          />
          {icon && <span className="absolute top-11 right-5">{icon}</span>}
          {showError && <ErrorMessage name={name} />}
        </>
      )}
    </div>
  );
};

export default forwardRef(InputField);
