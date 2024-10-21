import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';

interface FilterInfo {
  id: string;
  title: string;
  name: string;
  slug: string;
}

export type FilterOptionsType = {
  course: FilterInfo[];
  trainer: FilterInfo[];
};

const initialState: FilterOptionsType = {
  course: [],
  trainer: [],
};

const filterOptionsSlice = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    setFilterOptions(
      state: FilterOptionsType,
      action: PayloadAction<FilterOptionsType>
    ) {
      state.course = action.payload.course;
      state.trainer = action.payload.trainer;
    },
  },
});

export const { reducer } = filterOptionsSlice;
export const useFilterOptions = (state: RootStateType) => state.filterOptions;

export const { setFilterOptions } = filterOptionsSlice.actions;

export default filterOptionsSlice;
