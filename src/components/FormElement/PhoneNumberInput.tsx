import { useField } from 'formik';
import PhoneInput, { FlagProps } from 'react-phone-number-input';

// ** component **
import ErrorMessage from './ErrorMessage';

// ** type **
import { IPhoneInputField } from './types';

// ** style **
import './style/phoneinput.css';

import 'react-phone-number-input/style.css';

const renderFlagComponent = ({ country }: FlagProps) => {
  return <div>{country}</div>;
};

const PhoneNumberInput = ({
  label,
  name,
  placeholder,
  labelClass,
  parentClass,
  isCompulsory,
  setFieldTouched,
  isLoading = false,
  isDisabled = false,
  isUpdateForm = false,
}: IPhoneInputField) => {
  const [field, , helpers] = useField(name);
  return (
    <div className={`w-full ${parentClass}`}>
      {isLoading ? (
        <div className="lazy h-[50px]" />
      ) : (
        <>
          {label && (
            <label
              htmlFor={name}
              className={`text-sm text-black leading-4 inline-block mb-2 ${
                labelClass ?? ''
              }`}
            >
              {label}
              {isCompulsory && <span className="text-red-700">*</span>}
            </label>
          )}
          <PhoneInput
            placeholder={placeholder}
            className="phone-input"
            value={field.value}
            international
            defaultCountry="IT"
            flagComponent={renderFlagComponent}
            withCountryCallingCode
            onChange={(value) => {
              helpers.setValue(value ?? '');
            }}
            onBlur={() => {
              if (setFieldTouched) setFieldTouched(name, true, true);
            }}
            disabled={isDisabled}
          />
          {!isUpdateForm && <ErrorMessage name={name} />}
        </>
      )}
    </div>
  );
};

export default PhoneNumberInput;
