// ** external packages **
import { Controller } from 'react-hook-form';

// ** components **
import Icon from 'components/Icon';

//  ** types **
import { FormFieldProps } from '../types/formField.types';

// ** others **
import { changeMaskInputValueFunction } from 'utils/util';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';

// this component is not in use - replaced
const MaskInputFormField = <TFormValues extends Record<string, unknown>>(
  fieldProps: FormFieldProps<TFormValues>
) => {
  const {
    id,
    label,
    required,
    className,
    name,
    error,
    icon,
    iconPosition,
    fieldLimit,
    control,
    maskInputType = '',
    iconClass,
    labelClass = '',
    ...rest
  } = fieldProps;
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
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, name: maskInputName } }) => {
            const { placeholder } = rest;
            return (
              <MaskedTextBoxComponent
                mask="(999) 999-9999"
                placeholder={placeholder}
                className={`ip__input ${className}`}
                floatLabelType="Never"
                name={maskInputName}
                aria-invalid={false}
                htmlAttributes={{
                  maxLength: `${fieldLimit}` || '100',
                  tabIndex: '-1',
                }}
                value={`${value}`}
                onChange={(e: any) =>
                  changeMaskInputValueFunction(
                    e.target.value,
                    maskInputType,
                    onChange
                  )
                }
              />
            );
          }}
        />
        {icon && <Icon className={iconClass} iconType={icon} />}
      </div>
      {error && <p className="ip__Error">{error.message}</p>}
    </>
  );
};

export default MaskInputFormField;
