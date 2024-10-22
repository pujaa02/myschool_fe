import React, { useEffect } from 'react';

// ** const **
import ReactSelect from './ReactSelect';

// ** Hooks
import { useField } from 'formik';

// ** type **
import { useSelector } from 'react-redux';
import { getStateJson } from 'redux-toolkit/slices/countryJsonSlice';
import { LocationDropdownProps } from './types';

const CityDropdown: React.FC<LocationDropdownProps> = ({
  cities,
  selectedCity,
  parentClass,
  name,
  placeholder,
  label,
  disabled,
  className,
  selectedState,
  selectedCountry,
  isCompulsory = false,
  isCityByCountry = true,
  isLoading = false,
}) => {
  const [, , helpers] = useField(name);
  const states = useSelector(getStateJson);
  const selectedStates = states?.states?.filter(
    (state) => state.country_id === selectedCountry
  );

  let filteredCities:
    | {
        id: string;
        name: string;
        country_id?: string;
        state_id?: string;
      }[]
    | undefined = [];
  if (isCityByCountry) {
    filteredCities = cities?.filter((city) =>
      selectedStates.some((data) => data.id === city.state_id)
    );
  }
  if (!isCityByCountry) {
    filteredCities = cities?.filter((city) => city.state_id === selectedState);
  }
  const options = filteredCities?.map((city) => ({
    value: city.id,
    label: city.name,
  }));
  const isCityFromState = filteredCities?.some((c) => c.id === selectedCity);
  useEffect(() => {
    if (!isCityFromState) helpers?.setValue('');
  }, [selectedState]);
  return (
    <div className={`w-full ${parentClass ?? ''}`}>
      <ReactSelect
        label={label}
        isMulti={false}
        name={name}
        placeholder={placeholder}
        options={options ?? []}
        isCompulsory={isCompulsory}
        selectedValue={selectedCity}
        disabled={disabled}
        className={`${className ?? ''}`}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CityDropdown;
