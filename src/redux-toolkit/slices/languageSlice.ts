import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'redux-toolkit/store';

export type LanguageType = {
  language: string;
  allLanguages?: AllLanguages[];
  defaultLanguage: string;
};

export type AllLanguages = {
  id: number;
  name: string;
  short_name: string;
  slug?: string;
  created_by?: number;
  updated_by?: number;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

const initialState: LanguageType = {
  language: '',
  allLanguages: [],
  defaultLanguage: 'it',
};

const slice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state: LanguageType, action: PayloadAction<{ language: string }>) {
      if (action.payload.language !== '') state.language = action.payload.language;
    },
    setAllLanguage(
      state: LanguageType,
      action: PayloadAction<{ allLanguages?: AllLanguages[] }>
    ) {
      state.allLanguages = action.payload.allLanguages;
    },
    setDefaultLanguage(
      state: LanguageType,
      action: PayloadAction<{ defaultLanguage: string }>
    ) {
      state.defaultLanguage = action.payload.defaultLanguage;
    },
  },
});

export const { reducer } = slice;
export const useLanguage = (state: RootStateType) => state.language;
export const useDefaultLanguage = (state: RootStateType) =>
  state.language.defaultLanguage;

export const { setLanguage, setAllLanguage, setDefaultLanguage } = slice.actions;

export default slice;
