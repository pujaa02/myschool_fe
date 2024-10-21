import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'redux-toolkit/store';

export type CompanyType = {
  company?: { id?: string; name?: string; slug?: string } | null;
};

const initialState: CompanyType = {
  company: {},
};

const slice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany(
      state: CompanyType,
      action: PayloadAction<{
        company: { id?: string; name?: string; slug?: string } | null;
      }>
    ) {
      if (action.payload.company) {
        state.company = action.payload.company;
      }
    },
    clearCompany(state: CompanyType) {
      state.company = {};
    },
  },
});

export const { reducer } = slice;
export const useCompany = (state: RootStateType) => state.company;

export const { setCompany, clearCompany } = slice.actions;

export default slice;
