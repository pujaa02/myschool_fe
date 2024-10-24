import { StylesConfig } from 'react-select';

export const SelectStyle: StylesConfig = {
  control: (state: any) => ({
    padding: '0.282rem',
    display: 'flex',
    outline: 'none',
    borderRadius: '10px',
    border: '1px solid #e6e6e6',
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
    '@media (max-width: 639px)': {
      height: '42px',
    },
    '& ValueContainer': {
      padding: 0,
      '&:hover': {
        boxShadow: 'none',
        outline: 'none',
      },
    },
  }),

  singleValue: () => ({
    gridArea: '1/1/2/3',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginLeft: '2px',
    marginRight: '2px',
    boxSizing: 'border-box',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    color: '#111111',
  }),
  input: () => ({
    padding: '0',
    visibility: 'visible',
    flex: '1 1 auto',
    display: 'inline-grid',
    gridArea: '1 / 1 / 2 / 3',
    gridTemplateColumns: '0px min-content',
    margin: '2px',
    paddingBottom: '2px',
    paddingTop: '2px',
    color: 'rgb(51, 51, 51)',
    boxSizing: 'border-box',
    '& > input': {
      width: 'auto !important',
      maxWidth: '100%',
    },
  }),
  valueContainer: () => ({
    alignItems: 'center',
    display: 'grid',
    flex: '1 1 0%',
    flexWrap: 'wrap',
    position: 'relative',
    overflow: 'hidden',
    padding: '2px 8px',
    boxSizing: 'border-box',
  }),
  placeholder: () => ({
    boxSizing: 'border-box',
    gridArea: '1 / 1 / 2 / 3',
    color: 'rgb(128, 128, 128)',
    marginLeft: '2px',
    marginRight: '2px',
    fontSize: '14px',
    lineHeight: '1.5',
  }),
  container: () => ({
    outline: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    svg: {
      fill: '#888888',
    },
  }),
  menuList: () => ({
    maxHeight: '300px',
    overflowY: 'auto',
    position: 'relative',
    paddingBottom: '4px',
    paddingTop: '4px',
    boxSizing: 'border-box',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.875rem',
    lineHeight: '2',
    padding: '2px 12px',
    cursor: 'pointer',
    transition: 'all 0.5s',
    backgroundColor:
      state.isFocused || state.isSelected ? '#0b4565' : '#ffffff',
    color: state.isFocused || state.isSelected ? '#ffffff' : '#0b4565',
    '&:hover': {
      backgroundColor: '#0b4565',
      color: '#ffffff',
    },
  }),
  multiValue: () => ({
    display: 'flex',
    minWidth: 0,
    backgroundColor: '#f4f4f4',
    borderRadius: '100px',
    margin: '2px',
    boxSizing: 'border-box',
  }),
  multiValueLabel: () => ({
    fontSize: '13px',
    fontWeight: '500',
    padding: '3px 7px',
    lineHeight: '1.6',
  }),
  multiValueRemove: () => ({
    padding: '0',
    width: '18px',
    height: '18px',
    transition: 'all 0.5s',
    backgroundColor: '#069fc121',
    '&:hover': {
      backgroundColor: 'rgb(6 159 193)',
      color: '#ffffff',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    marginTop: '4px',
    marginRight: '4px',
    color: 'rgb(6 159 193)',
  }),
};
