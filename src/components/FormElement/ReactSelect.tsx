/* eslint-disable @typescript-eslint/no-shadow */
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';

// ** type **
import { IReactSelect, ObjectOption, Option } from './types';

// ** components **
import ErrorMessage from './ErrorMessage';

// ** style constants **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { DropdownLoaderTypes } from 'constants/common.constant';
import { SelectStyle } from './constants/reactSelect';
import './style/filterSelectCategory.css';

const ReactSelect = (props: IReactSelect) => {
  const {
    isSearchable = true,
    onChange,
    placeholder,
    options,
    objectOptions,
    isCompulsory = false,
    isClearable = false,
    isMulti = false,
    label,
    labelClass,
    disabled,
    selectedValue,
    parentClass,
    className,
    isLoading = false,
    information,
    isInput = false,
    warnings = [],
    menuPlacement = 'auto',
    loaderType = DropdownLoaderTypes.Skeleton,
    ...rest
  } = props;
  const [field, , helpers] = rest?.name ? useField(rest?.name) : [];
  const [inputValue, setInputValue] = useState<string>('');
  const [propOptions, setPropOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (options && Array.isArray(options)) {
      setPropOptions(options);
    }
  }, [options, objectOptions]);
  useEffect(() => {
    if (objectOptions && Array.isArray(objectOptions)) {
      setPropOptions(objectOptions as Option[]);
    }
  }, [objectOptions]);

  const handleChange = (option: Option | Option[]) => {
    helpers?.setValue(
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option)?.value
    );
  };

  const getValue = (): Option | Option[] | undefined => {
    if (options) {
      if (!options) {
        return isMulti ? [] : undefined;
      }
      const checkInputValue = Array.isArray(options)
        ? options?.filter((a) => a?.label?.includes(inputValue))
        : [];
      if (selectedValue) {
        if (Array.isArray(selectedValue)) {
          return options?.filter((option: Option) =>
            selectedValue.includes(String(option?.value))
          );
        }
        return options.find((option: Option) => option?.value === selectedValue);
      }
      if (
        checkInputValue?.length === 0 &&
        !propOptions?.find((a) => a.value === inputValue) &&
        inputValue?.length > 0
      ) {
        setPropOptions([{ label: inputValue, value: inputValue }, ...options]);
      }
      if (isMulti) {
        if (Array.isArray(field?.value) && Array.isArray(options)) {
          return options?.filter(
            (option: Option) => field?.value?.indexOf(option.value) >= 0
          );
        }
      } else {
        return propOptions?.find((option: Option) => option?.value === field?.value);
      }
    } else if (objectOptions) {
      if (selectedValue) {
        return (objectOptions as Option[])?.find((option) => {
          if (option?.value) {
            if (typeof option.value === 'object') {
              return (
                JSON.stringify(Object.values(option.value).sort()) ===
                JSON.stringify(Object.values(selectedValue).sort())
              );
            }
          }
          return false;
        });
      }
    }
  };
  const handleRemoveOption = (valueToRemove: string | number | boolean) => {
    helpers?.setValue(
      (field?.value || []).filter((data: string) => data !== valueToRemove)
    );
  };

  const formatOptionLabel = ({ label, icon }: ObjectOption) => {
    return (
      <div className="flex items-center p-1">
        <Image iconName={icon} iconClassName="w-5 h-5" />
        &nbsp; -&nbsp; <span>{label}</span>
      </div>
    );
  };
  return (
    <div className={` ${parentClass ?? ''} `}>
      {loaderType === DropdownLoaderTypes.Skeleton && isLoading ? (
        <div className="lazy h-[50px]" />
      ) : (
        <>
          {label && (
            <label
              className={` text-sm text-black leading-4 inline-block mb-2 ${
                labelClass ?? ''
              }`}
            >
              {label}

              {isCompulsory && <span className=" text-red-700">*</span>}
            </label>
          )}

          <Select
            isSearchable={isSearchable}
            {...field}
            onChange={(e) => {
              return onChange
                ? onChange(e as Option | Option[], 'Add')
                : handleChange(e as Option | Option[]);
            }}
            name={rest.name}
            value={getValue() ? getValue() : null}
            placeholder={placeholder ?? ''}
            options={propOptions ?? options}
            isMulti={isMulti}
            isClearable={isClearable}
            menuPlacement={menuPlacement}
            isDisabled={disabled}
            className={className ?? ''}
            menuPortalTarget={document.body}
            isLoading={isLoading}
            styles={SelectStyle as StylesConfig<ObjectOption, boolean> | undefined}
            controlShouldRenderValue={!isMulti}
            onInputChange={(element) => {
              if (isInput) {
                setInputValue(element);
              }
            }}
            formatOptionLabel={objectOptions ? formatOptionLabel : undefined}
          />
          {isCompulsory && rest?.name ? <ErrorMessage name={rest?.name} /> : ''}
          {isMulti && (
            <div
              className={`flex flex-wrap gap-4 ${
                getValue() &&
                Array.isArray(getValue()) &&
                (getValue() as Option[]).length > 0
                  ? 'pt-5'
                  : ''
              }`}
            >
              {propOptions.length > 0 &&
                propOptions.map((data: Option, index: number) => {
                  if (
                    getValue() &&
                    Array.isArray(getValue()) &&
                    (getValue() as Option[])?.find((findData) => {
                      return findData.value === data.value;
                    })
                  ) {
                    const isWarning = warnings?.includes(data?.value as number);
                    return (
                      <div
                        className="flex items-center gap-x-2.5 py-2.5 px-3 bg-primary/10 rounded-lg"
                        key={`multi_${index + 1}`}
                      >
                        <span className="text-sm text-primary leading-5 inline-flex gap-1">
                          {isWarning ? (
                            <Image iconName="redExclamationMarkIcon" />
                          ) : (
                            ''
                          )}
                          {data.label}
                        </span>

                        <Button
                          parentClass="h-fit"
                          className="w-4 h-4 select-none rounded-full hover:bg-primary hover:text-white border border-solid border-primary inline-block p-[3px] cursor-pointer active:scale-90 transition-all duration-300"
                          onClickHandler={() => {
                            handleRemoveOption(data.value);
                            if (onChange) {
                              onChange([data], 'Removed');
                            }
                          }}
                        >
                          <Image
                            iconName="crossIcon"
                            iconClassName="w-full h-full"
                          />
                        </Button>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          )}
          {information && (
            <div className="flex items-center mt-2">
              <p className="block text-sm text-lightgrey leading-4  ">
                {information}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReactSelect;
