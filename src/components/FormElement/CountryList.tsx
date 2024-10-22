import React, { useEffect } from 'react';

// ** const **
import { CountryDropdown } from 'react-country-region-selector';

import {
  addEventListeners,
  initializeCustomSelect,
} from 'utils/countryProvinceSelector';

// ** type **
import { useField } from 'formik';
import ErrorMessage from './ErrorMessage';
import './style/countrySelect.css';
import { LocationDropdownProps } from './types';

const CountrySelect: React.FC<LocationDropdownProps> = ({
  selectedCountry,
  parentClass,
  label,
  name,
  disabled,
  className,
  placeholder,
  isCompulsory = false,
  isLoading = false,
}) => {
  const [, , helpers] = useField(name);

  const handleChange = (option?: string) => {
    helpers?.setValue(option);
  };

  useEffect(() => {
    const existingElement = document.getElementById('abc') as HTMLElement;
    const select = document.getElementById('country') as HTMLSelectElement;
    const nodes = document.querySelectorAll('.select-wrapper');
    if (nodes.length > 0) nodes[0].parentNode?.removeChild(nodes[0]);

    const selectWrapperIsExits = document.getElementById('select-wrapper');

    if (select) {
      const { styledSelect, optionList } = initializeCustomSelect(
        existingElement,
        select,
        'select-wrapper',
        selectWrapperIsExits,
        false,
        selectedCountry,
        handleChange
      );
      addEventListeners(styledSelect, optionList, select, helpers);
    }
  }, [selectedCountry]);

  return (
    <>
      {isLoading ? (
        <div className={parentClass}>
          <div className="lazy h-[50px]" />
        </div>
      ) : (
        <div className={`w-full ${parentClass ?? ''}`} id="abc">
          {label && (
            <label className="text-sm text-black leading-4 inline-block mb-2">
              {label}
              {isCompulsory && <span className=" text-red-700">*</span>}
            </label>
          )}
          <CountryDropdown
            defaultOptionLabel={placeholder}
            name={name}
            disabled={disabled}
            value={selectedCountry ?? ''}
            onChange={(e) => handleChange(e)}
            classes={`inputField min-h-12 ${className ?? ''}`}
            id="country"
          />
          {isCompulsory && name ? <ErrorMessage name={name} /> : ''}
        </div>
      )}
    </>
  );
};

export default CountrySelect;
