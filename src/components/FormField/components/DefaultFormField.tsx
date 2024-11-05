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
    type,
    fieldLimit,
    disabled = false,
    ...rest
  } = fieldProps;

  // remove unwanted props
  delete rest.wrapperClass;

  return (
    <>
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : ''}
      </label>
      <div className="">
        <input
          disabled={disabled}
          type={type}
          className="w-full p-2 border border-gray-300 rounded-md"
          {...(register && register(name))}
          {...rest}
          maxLength={fieldLimit || 100}
        />
      </div>
      {error && <p className="text-red-600">{error.message}</p>}
    </>
  );
};

export default DefaultFormField;
