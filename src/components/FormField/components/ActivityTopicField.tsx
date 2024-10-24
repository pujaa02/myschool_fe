import Icon from 'components/Icon/index2';
import { FormFieldProps } from '../types/formField.types';

const ActivityTopicField = <TFormValues extends Record<string, unknown>>(
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
    iconClass,
    disabled = false,
    labelClass = '',
    ...rest
  } = fieldProps;

  // remove unwanted props
  delete rest.wrapperClass;

  const updatedRegister = Object.fromEntries(
    Object.entries(register?.(name) || {}).filter(([key]) => key !== 'onChange')
  );

  return (
    <>
      <label htmlFor={id} className={`if__label ${labelClass}`}>
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
          autoComplete="new-password"
          className={`ip__input ${className}`}
          {...updatedRegister}
          {...rest}
          maxLength={fieldLimit || 100}
        />
        {icon && (
          <Icon
            className={iconClass}
            iconType={icon}
            name={'dashboardStrokeSD'}
          />
        )}
      </div>
      {error && <p className="ip__Error">{error.message}</p>}
    </>
  );
};

export default ActivityTopicField;
