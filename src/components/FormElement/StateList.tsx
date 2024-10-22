// StateDropdown.tsx
import React from 'react';

// ** component **
import ReactSelect from './ReactSelect';

// ** type **
import { LocationDropdownProps } from './types';

const StateDropdown: React.FC<LocationDropdownProps> = ({
  states,
  selectedCountry,
  selectedState,
  parentClass,
  name,
  placeholder,
  label,
}) => {
  const filteredStates = states?.filter(
    (state) => state.country_id === selectedCountry?.toString()
  );
  const options = filteredStates?.map((state) => ({
    value: state.id,
    label: state.name,
  }));

  return (
    <div className={`${parentClass ?? ''}`}>
      <ReactSelect
        label={label}
        isMulti={false}
        name={name}
        placeholder={placeholder}
        options={options ?? []}
        isCompulsory
        selectedValue={selectedState}
      />
    </div>
  );
};

export default StateDropdown;
