import { FormFieldProps } from '../types/formField.types';
import { Controller } from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';

const PhoneNumberWithCountryCode = <
  TFormValues extends Record<string, unknown>
>(
  fieldProps: FormFieldProps<TFormValues>
) => {
  const { name, control, id, label, placeholder, labelClass, required, error } =
    fieldProps;

  return (
    <>
      <label htmlFor={id} className={`if__label ${labelClass}`}>
        {label}
        {required ? <span className="required__sign">*</span> : ''}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          const valueData = value ?? null;
          return (
            <PhoneInput
              country="us"
              placeholder={placeholder}
              onChange={(
                valueNo: string,
                data: CountryData,
                event: React.ChangeEvent<HTMLInputElement>,
                formattedValue: string
              ) => {
                if(formattedValue==="+"){
                  onChange("");
                }else{
                  onChange(formattedValue);
                }
                if (event.type === 'click') {
                  const el = document.getElementById(name);
                  el?.focus();
                }
              }}
              inputProps={{ id: name }}
              value={valueData as string}
            />
          );
        }}
      />
      {error && <p className="ip__Error">{error.message}</p>}
    </>
  );
};

export default PhoneNumberWithCountryCode;
