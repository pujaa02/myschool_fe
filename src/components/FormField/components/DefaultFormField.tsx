// import Icon from 'components/Icon/index2';
import { FormFieldProps } from '../types/formField.types';

const DefaultFormField = <TFormValues extends Record<string, unknown>>(
  fieldProps: FormFieldProps<TFormValues>
) => {
  const {
    id,
    name,
    error,
    register,
    label,
    required,
    iconPosition,
    icon,
    type,
    className,
    fieldLimit,
    disabled = false,
    ...rest
  } = fieldProps;

  // remove unwanted props
  delete rest.wrapperClass;

  return (
    <>
      <label htmlFor={id} className="">
        {label}
        {required ? <span className="required__sign">*</span> : ''}
      </label>
      <div
        className={`${icon ? 'ipel__wrapper ip__form__hasIcon' : ''}
       ${iconPosition === 'right' ? 'ip__form__hasIcon__right' : ''} `}
      >
        <input
          disabled={disabled}
          type={type}
          className={`ip__input ${className}`}
          {...(register && register(name))}
          {...rest}
          maxLength={fieldLimit || 100}
        />
      </div>
      {error && <p className="ip__Error">{error.message}</p>}
    </>
  );
};

export default DefaultFormField;
