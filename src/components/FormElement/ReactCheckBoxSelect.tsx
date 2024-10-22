import Button from 'components/Button/Button';
import { useState } from 'react';
import Select, { StylesConfig, components } from 'react-select';
import Checkbox from './CheckBox';
import { Option, ReactCheckBoxSelectPropsType } from './types';

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: any) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  let bg = 'transparent';
  // if (isFocused) bg = '#fff';
  if (isActive) bg = '#f1f1f1';

  const style = {
    alignItems: 'center',
    backgroundColor: bg,
    color: 'black',
    display: 'flex ',
    gap: '10px',
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <Checkbox check={isSelected} />

      <Button
        customStyle={{
          backgroundColor: `${rest.data.color ?? ''}`,
          color: `${rest.data.color ? '#FFFFFF' : '#000000'}`,
        }}
        className={` text-sm px-2 py-0.5 rounded`}
      >
        {children}
      </Button>
    </components.Option>
  );
};

const SelectStyle: StylesConfig = {
  control: (provided, state) => {
    return {
      ...provided,
      borderRadius: '10px',
      height: '40px',
      outline: 'none',
      borderColor: 'rgb(229 231 235)',
      boxShadow: state.isFocused
        ? '0px 0px 0px 2px #ffffff, 0px 0px 0px 4px rgb(17 17 17 / 0.3)'
        : 'none !important',
      overflow: 'auto',
      cursor: 'pointer',
      transition: 'all 0.3s linear',
      '&:hover': {
        borderColor: 'rgb(229 231 235)',
      },
      '& ValueContainer': {
        padding: 0,
        '&:hover': {
          boxShadow: 'none',
          outline: 'none',
          borderColor: '#d9d9d9',
        },
        '&:focus': {
          boxShadow: 'none',
          outline: 'none',
          borderColor: '#d9d9d9',
        },
        '&:checked': {
          backgroundColor: 'yellow',
        },
      },
    };
  },
  container: (provided) => ({
    ...provided,
    outline: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: '#111111',
    },
  }),
  option: (provided) => ({
    ...provided,
    // backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f1f1f1 !important',
    },
  }),
  menu: (provided) => ({
    ...provided,
    // backgroundColor: '#ffffff',
    '&:hover': {
      boxShadow: 'none',
      outline: 'none',
      borderColor: '#d9d9d9',
    },
  }),
};

const ReactCheckBoxSelect = ({
  placeholder,
  options,
  onChange,
  selectedValue,
  parentClass,
  name,
}: ReactCheckBoxSelectPropsType) => {
  const componentProps = { Option: InputOption };

  const getValue = () => {
    return options?.filter(
      (item: Option) =>
        selectedValue?.includes(String(item?.value)) ||
        selectedValue?.includes(Number(item?.value))
    );
  };

  return (
    <div className={`App ${parentClass ?? ''}`}>
      <Select
        name={name}
        className="bg-red-300 rounded-xl"
        styles={SelectStyle}
        isMulti
        menuPortalTarget={document.body}
        placeholder={placeholder}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        value={getValue()}
        onChange={(options) => {
          if (Array.isArray(options) && onChange) {
            onChange([...options.map((opt) => opt?.value)] as string[]);
          }
        }}
        options={options}
        components={componentProps}
      />
    </div>
  );
};
export default ReactCheckBoxSelect;
