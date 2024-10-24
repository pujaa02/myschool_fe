/* eslint-disable @typescript-eslint/no-shadow */
import Select, { StylesConfig } from 'react-select';

import { IconTypes } from 'components/Icon/types';
import Image from 'components/Image';
import { useField } from 'formik';
import ErrorMessage from './ErrorMessage';
import { SelectStyle } from './constants/reactSelect';

export interface TransformedDataItem {
  label: string;
  value: number;
  icon?: IconTypes;
}

interface IconReactSelectProps {
  label?: string;
  labelClass?: string;
  name: string;
  options: TransformedDataItem[];
  placeholder?: string;
  selectedValue?: string | string[] | number;
  isCompulsory?: boolean;
  margin?: string;
  width?: string;
  disabled?: boolean;
  variant?: '1' | '2' | '3';
  isSearchable?: boolean;
  isClearable?: boolean;
  typeAdd?: string;
  parentClass?: string;
  className?: string;
  isLoading?: boolean;
  information?: string;
  isCreatable?: boolean;
  readOnly?: boolean;
  loaderType?: string;
  onChange?: (
    option: TransformedDataItem | ReadonlyArray<TransformedDataItem> | null
  ) => void;
}

const IconReactSelect = ({
  placeholder,
  options,
  isCompulsory,
  label,
  labelClass,
  disabled,
  className,
  parentClass,
  isClearable,
  isLoading,
  ...rest
}: IconReactSelectProps) => {
  const [field, , helpers] = useField(rest.name);
  const handleChange = (
    selectedOption: TransformedDataItem | ReadonlyArray<TransformedDataItem> | null
  ) => {
    helpers.setValue(selectedOption);
  };
  const formatOptionLabel = ({ label, icon }: TransformedDataItem) => {
    return (
      <div className="flex items-center p-1">
        <Image iconName={icon} iconClassName="w-5 h-5" />
        &nbsp; -&nbsp; <span>{label}</span>
      </div>
    );
  };

  const getValue = () => {
    if (options && field.value) {
      const obj = (options as unknown as TransformedDataItem[]).find(
        (item) => item.value === field.value
      );
      if (obj) {
        return obj;
      }
    }

    return field.value;
  };

  return (
    <div className={` ${parentClass ?? ''}`}>
      {isLoading ? (
        <div className="lazy h-[80px]" />
      ) : (
        <>
          {label && (
            <label
              className={`text-sm text-black leading-4 inline-block mb-2 ${
                labelClass ?? ''
              }`}
            >
              {label}
              {isCompulsory && <span className="text-red-700">*</span>}
            </label>
          )}
          <Select
            name={rest.name}
            placeholder={placeholder ?? ''}
            value={getValue() ?? field.value}
            options={options}
            onChange={handleChange}
            onBlur={field.onBlur}
            formatOptionLabel={formatOptionLabel}
            isClearable={isClearable}
            menuPlacement="auto"
            isDisabled={disabled}
            className={className ?? ''}
            styles={
              SelectStyle as StylesConfig<TransformedDataItem, boolean> | undefined
            }
            menuPortalTarget={document.body}
          />
          <ErrorMessage name={rest.name} />
        </>
      )}
    </div>
  );
};

export default IconReactSelect;
