// ** external packages **
import { startOfDay } from 'date-fns';
import { useRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import MaskedInput from 'react-text-mask';

// ** redux **

// ** components **

// ** types **
import { FormFieldProps } from '../types/formField.types';

// ** others **
import { reactDatePickerSelectedDate } from '../helper';
import { getCurrentUserDateFormat } from 'redux-toolkit/slices/authSlice';
export const DateFormField = <TFormValues extends Record<string, unknown>>(
  props: FormFieldProps<TFormValues>
) => {
  const {
    id,
    name,
    label,
    error,
    selected,
    isClearable,
    popperPosition,
    disabled,
    popperPlacement,
    required,
    minDate,
    maxDate,
    showMonthDropdown,
    showYearDropdown,
    labelClass = '',
    dateFormat,
    getOnChangeDateValue,
    ...otherFieldProps
  } = props;

  const dateRef = useRef<HTMLDivElement>(null);
  const userDateFormat = useSelector(getCurrentUserDateFormat);

  const setMaskInput = () => {
    if (userDateFormat === 'yyyy/MM/dd') {
      return [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/];
    }
    return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  };

  return (
    <div className="form__Group">
      <label htmlFor={id} className={`if__label ${labelClass}`}>
        {label}
        {required ? <span className="required__sign">*</span> : ''}
      </label>
      <div ref={dateRef} className="">
        <Controller
          name={name}
          control={otherFieldProps.control}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              isClearable={isClearable}
              dateFormat={dateFormat || userDateFormat || 'MM-dd-yyyy'}
              onChange={(e) => {
                getOnChangeDateValue?.(dateRef.current?.querySelector('input'));
                onChange(e ? startOfDay(e).toISOString() : e);
              }}
              autoComplete="new-password"
              selected={reactDatePickerSelectedDate(
                value || selected || undefined
              )}
              placeholderText={
                dateFormat || userDateFormat?.toUpperCase() || 'MM-dd-yyyy'
              }
              popperProps={{
                ...(popperPosition && { strategy: popperPosition }),
              }}
              customInput={
                <MaskedInput type="text" mask={() => setMaskInput()} />
              }
              {...(popperPlacement && { popperPlacement })}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
              {...(showYearDropdown && { showYearDropdown })}
              {...(showMonthDropdown && { showMonthDropdown })}
              scrollableYearDropdown
              scrollableMonthYearDropdown
              dropdownMode="select"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          )}
        />
      </div>
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  );
};

export default DateFormField;
