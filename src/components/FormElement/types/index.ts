import { IconTypes } from 'components/Icon/types';
import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  MutableRefObject,
  ReactElement,
  ReactNode,
} from 'react';
import { EnumFileType } from '../enum';

// react select
export interface Option {
  label: string;
  value: number | string;
  color?: string;
}
export interface ObjectOption {
  label?: string;
  value?: unknown;
  icon?: IconTypes;
}

export interface IReactSelect {
  inputClass?: string;
  isMulti?: boolean;
  isUseFocus?: boolean;
  label?: string;
  labelClass?: string;
  name?: string;
  options?: Option[];
  objectOptions?: ObjectOption[];
  placeholder?: string;
  selectedValue?: string | string[] | number | object;
  isCompulsory?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  margin?: string;
  width?: string;
  onChange?: (
    option: Option | Option[] | ObjectOption | ObjectOption[],
    type?: string
  ) => void;
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
  isInput?: boolean;
  readOnly?: boolean;
  loaderType?: string;
  warnings?: Array<number | string>;
}

// checkbox
export type ICheckboxProps = {
  id?: string;
  text?: string;
  name?: string;
  parentClass?: string;
  disabled?: boolean;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  customClass?: string;
  labelClass?: string;
  check?: boolean;
  isLoading?: boolean;
  showError?: boolean;
  isTooltip?: boolean;
};

// radio
export type IRadioProps = {
  id?: string;
  name?: string;
  margin?: string;
  value?: string;
  onClick?: () => void;
  customClass?: string;
  check?: boolean;
  options: Option[];
  label?: string;
  className?: string;
  parentClass?: string;
  optionWrapper?: string;
  isCompulsory?: boolean;
  readOnly?: boolean;
  selectedValue?: string | number;
  isLoading?: boolean;
  isDisabled?: boolean;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

// input
export interface InputProps {
  name: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  value?: string | number;
  label?: string;
  type?: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  onFocus?: () => void;
  min?: number;
  max?: number;
  maxLength?: number;
  isCompulsory?: boolean;
  prefixBig?: boolean;
  parentClass?: string;
  labelClass?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
  isLoading?: boolean;
  customStyle?: CSSProperties;
  showError?: boolean;
}

// input file
type FieldValueTye = string | number | File | Array<File | string> | null;
export interface IInputFileField {
  fileInputIcon?: IconTypes;
  selectedFileIcon?: IconTypes;
  labelClass?: string;
  variant?: string;
  Title?: string;
  SubTitle?: string;
  label?: string;
  parentClass?: string;
  id?: string;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  name: string;
  value: File | string | Array<File | string> | null;
  acceptTypes?: string;
  size?: number;
  fileType?: EnumFileType;
  isMulti?: boolean;
  limit?: number;
  isNormal?: boolean;
  className?: string;
  displayAsLink?: boolean;
  isCompulsory?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  isSendMail?: boolean;
}

export interface IFileFileDisplay {
  value: File | string;
  index?: number;
  isMulti?: boolean;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  size?: number;
  Values?: Array<File | string>;
  name: string;
  Ref?: MutableRefObject<HTMLInputElement | null>;
  fileType?: EnumFileType;
  limit?: number;
  selectedFileIcon?: IconTypes;
}

export interface IChatFileField {
  name: string;
  value: File | string | Array<File | string> | null;
  acceptTypes?: string;
  size?: number;
  fileType?: EnumFileType | string;
  isMulti?: boolean;
  id?: string;
  limit?: number;
  className?: string;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  isControls?: boolean;
}

export interface IChatFileDisplay {
  value: File | string;
  index?: number;
  isMulti?: boolean;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  size?: number;
  Values?: Array<File | string>;
  name: string;
  Ref?: MutableRefObject<HTMLInputElement | null>;
  fileType?: EnumFileType | string;
  limit?: number;
  isControls?: boolean;
}
// text area
export interface TextAreaProps {
  name: string;
  label?: string;
  id?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  className?: string;
  labelClass?: string;
  resizeDisable?: boolean;
  parentClass?: string;
  inputClass?: string;
  extraElement?: ReactNode;
  disabled?: boolean;
  icon?: ReactElement;
  isCompulsory?: boolean;
  maxLength?: number;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  isLoading?: boolean;
  loaderType?: 'Skeleton' | 'Spin';
}

// Location Drop Down
export interface LocationDropdownProps {
  className?: string;
  countries?: { id: string; name: string }[];
  states?: { id: string; name: string; country_id: string }[];
  cities?: { id: string; name: string; state_id: string }[];
  selectedCountry?: string;
  selectedState?: string;
  selectedCity?: string;
  parentClass?: string;
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isCompulsory?: boolean;
  onChange?: (e?: string) => void;
  isCityByCountry?: boolean;
  isLoading?: boolean;
}

// Phone Input Field
export interface IPhoneInputField {
  label?: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  labelClass?: string;
  parentClass?: string;
  isCompulsory?: boolean;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  setFieldError?: (field: string, message?: string) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  isUpdateForm?: boolean;
}
// Button
export interface ButtonProps {
  id?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: {};
  value?: string;
  isDisabled?: boolean;
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  iconParentClass?: string;
  loader?: boolean;
  variant?: 'secondary';
}
export type LinkDisplayProps = {
  filename?: string;
  filepath?: File | string;
  id?: number;
  crossButton?: boolean;
  name?: string;
  index?: number;
  isMulti?: boolean;
  setValue?: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  Values?: Array<File | string>;
  Ref?: MutableRefObject<HTMLInputElement | null>;
  isSendMail?: boolean;
  isBlack?: boolean;
  externalURL?: string;
};
export enum fileInputEnum {
  FileInput = 'fileInput',
  LinkFileInput = 'linkFileInput',
  LinkFileInputBlack = 'linkFileInputBlack',
  FileInputXLS = 'fileInputXLS',
}
export type fileInputProps = {
  fileInputIcon?: IconTypes;
  selectedFileIcon?: IconTypes;
  index?: number;
  isMulti?: boolean;
  limit?: number;
  value: File | string | Array<File | string> | null;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  name: string;
  Ref?: MutableRefObject<HTMLInputElement | null>;
  fileType?: EnumFileType;
  size?: number;
  SubTitle?: string;
  Title?: string;
  isSendMail?: boolean;
  isBlack?: boolean;
  varaint?: fileInputEnum;
};

export interface ReactCheckBoxSelectPropsType {
  selectedValue?: (string | number)[];
  placeholder?: string;
  options?: Option[];
  onChange?: (val: string[]) => void;
  parentClass?: string;
  name: string;
}
