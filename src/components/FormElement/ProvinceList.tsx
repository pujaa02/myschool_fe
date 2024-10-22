import { useField } from 'formik';
import React, { useEffect } from 'react';
import { RegionDropdown } from 'react-country-region-selector';
import ErrorMessage from './ErrorMessage';
import { LocationDropdownProps } from './types';

import {
  addEventListeners,
  initializeCustomSelect,
} from 'utils/countryProvinceSelector';

import './style/countrySelect.css';

const ProvinceDropDown: React.FC<LocationDropdownProps> = ({
  selectedCountry,
  parentClass,
  name,
  label,
  disabled,
  className,
  placeholder,
  selectedState,
  isCompulsory = false,
  onChange,
  isLoading = false,
}) => {
  const [, , helpers] = useField(name);
  const handleChange = (option?: string) => {
    if (option) {
      helpers?.setValue(option);
    }
  };

  useEffect(() => {
    onChange?.('');
    const existingElement = document.getElementById('xyz') as HTMLElement;
    const select = document.getElementById('province') as HTMLSelectElement;
    const selectWrapperIsExits = document.getElementById('select-province-wrapper');

    if (selectedCountry && select) {
      setTimeout(() => {
        const { styledSelect, optionList } = initializeCustomSelect(
          existingElement,
          select,
          'select-province-wrapper',
          selectWrapperIsExits,
          true,
          selectedState,
          onChange
        );
        addEventListeners(styledSelect, optionList, select, helpers, onChange);
      }, 0);
    }
  }, [selectedCountry]);

  return (
    <>
      {isLoading ? (
        <div className={parentClass}>
          <div className="lazy h-[50px]" />
        </div>
      ) : (
        <div className={`w-full ${parentClass ?? ''}`} id="xyz">
          {label && (
            <label className="text-sm text-black leading-4 inline-block mb-2">
              {label}
              {isCompulsory && <span className=" text-red-700">*</span>}
            </label>
          )}
          <RegionDropdown
            blankOptionLabel={placeholder}
            defaultOptionLabel={placeholder}
            country={selectedCountry ?? ''}
            value={selectedState ?? ''}
            disabled={disabled}
            onChange={onChange || handleChange}
            classes={`inputField min-h-12 ${className ?? ''}`}
            id="province"
          />
          {isCompulsory && name ? <ErrorMessage name={name} /> : ''}
        </div>
      )}
    </>
  );
};

export default ProvinceDropDown;
