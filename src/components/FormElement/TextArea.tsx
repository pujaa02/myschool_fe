import { useField } from 'formik';
import React from 'react';

// ** type **
import { TextAreaProps } from './types';

// ** components **
import ErrorMessage from './ErrorMessage';

// ** style **
import Image from 'components/Image';
import './style/textarea.css';

const TextArea: React.FC<TextAreaProps> = ({
  name,
  resizeDisable,
  label,
  id,
  rows,
  cols,
  placeholder,
  parentClass,
  isCompulsory,
  disabled,
  icon,
  maxLength,
  onKeyDown,
  onBlur,
  onChange,
  labelClass,
  inputClass,
  isLoading = false,
  loaderType = 'Skeleton',
}) => {
  const [field] = useField(name);
  return (
    <div className={`w-full ${parentClass ?? ''}`}>
      {isLoading && loaderType === 'Skeleton' ? (
        <div className="lazy h-[80px]" />
      ) : (
        <>
          {label && (
            <label
              className={`text-sm text-black leading-4 inline-block mb-2 ${
                labelClass ?? ''
              }`}
              htmlFor={name}
            >
              {label}
              {isCompulsory && <span className="text-red-700">*</span>}
            </label>
          )}
          <textarea
            onKeyDown={onKeyDown}
            {...field}
            onChange={onChange ?? field.onChange}
            className={`text-area ${resizeDisable && 'textarea-disable-resize'} ${
              inputClass ?? ''
            }`}
            maxLength={maxLength}
            onBlur={onBlur}
            id={id}
            name={name}
            rows={rows}
            cols={cols}
            disabled={disabled ?? false}
            value={field.value ?? ''}
            placeholder={placeholder}
          />
          {isLoading && loaderType === 'Spin' ? (
            <div className="relative ">
              <Image loaderClassName="absolute right-3 bottom-2" loaderType="Spin" />
            </div>
          ) : (
            ''
          )}
          <ErrorMessage name={name} />
          {icon}
        </>
      )}
    </div>
  );
};

export default TextArea;
