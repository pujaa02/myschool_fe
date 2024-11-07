import { ColumnsDataInterface } from 'components/ColumnViewListDropDown';

export interface FilterColumnInterface {
  columnName: string;
  columnType: string;
  value: string;
  type: string;
  subValue?: string;
  subType?: string;
  selectedvalue?: string;
  includeObj?: Record<string, any>;
  searchKeys?: string[];
  foreignKey?: string;
  displayName?: string;
  selectedValueDisplayName?: string;
  selectedTypeDisplayName?: string;
  errorType?: string;
  errorValue?: string;
  dropDownSearchKey?: string;
}

export interface FilterInterface {
  filterType?: 'and' | 'or';
  filter: FilterColumnInterface[];
}

export interface FiltersDataInterface {
  filterType?: 'and' | 'or';
  filter?: FilterInterface[];
}

export interface SortDataInterface {
  column: ColumnsDataInterface | undefined;
  type: string;
}

export interface SelectOptionsInterface {
  value: string;
  label: string;
  type: string;
  model: string;
  searchKeys?: string[];
  includeObj?: Record<string, any>;
  foreignKey?: string;
  relational_model?: string;
  fieldType?: string;
  fieldName?: string;
}

export interface SelectedFilterNameInterface {
  isShow: boolean;
  index: number;
  subIndex: number;
  value?: SelectOptionsInterface;
}

export interface DropDownValueInterface {
  label: string;
  value: string;
}

export interface DropDownInterface {
  type: string;
  value: DropDownValueInterface[];
}
