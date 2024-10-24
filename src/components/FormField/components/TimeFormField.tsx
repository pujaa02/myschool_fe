// ** external packages **
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';

// ** components **

// ** types **
import { FormFieldProps } from '../types/formField.types';

// ** others **
import { reactDatePickerSelectedDate } from '../helper';
import Icon from 'components/Icon/index2';

export const TimeFormField = <TFormValues extends Record<string, unknown>>(
  props: FormFieldProps<TFormValues>
) => {
  const {
    id,
    name,
    label,
    icon,
    error,
    selected,
    isClearable,
    popperPosition,
    disabled,
    popperPlacement,
    required,
    iconClass,
    labelClass = '',
    minTime,
    maxTime,
    ...otherFieldProps
  } = props;

  return (
    <div className="form__Group">
      <label htmlFor={id} className={`if__label ${labelClass}`}>
        {label}
        {required ? <span className="required__sign">*</span> : ''}
      </label>
      <div className={`ip__react__datepicker ${icon ? 'ipel__wrapper' : ''}`}>
        <Controller
          name={name}
          control={otherFieldProps.control}
          render={({ field: { onChange, value, ref } }) => (
            <>
              <ReactDatePicker
                ref={ref}
                isClearable={isClearable}
                onChange={(e) => {
                  onChange(e);
                }}
                selected={reactDatePickerSelectedDate(
                  value || selected || undefined
                )}
                placeholderText="HH:mm"
                popperProps={{
                  ...(popperPosition && { strategy: popperPosition }),
                }}
                {...(popperPlacement && { popperPlacement })}
                disabled={disabled}
                minTime={new Date(minTime)}
                maxTime={new Date(maxTime)}
                timeFormat="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </>
          )}
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
    </div>
  );
};

export default TimeFormField;
