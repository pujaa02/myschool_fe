// ** Redux **
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'redux-toolkit/store';

// ** Types **
export type CountryJsonSliceType = {
  country: { id: string; name: string }[];
  state: { id: string; name: string; country_id: string }[];
  city: { id: string; name: string; state_id: string }[];
};

const initialState: CountryJsonSliceType = {
  country: [],
  state: [],
  city: [],
};

const slice = createSlice({
  name: 'countryJson',
  initialState,
  reducers: {
    setCountries(
      state: CountryJsonSliceType,
      action: PayloadAction<{ id: string; name: string }[]>
    ) {
      state.country = action.payload;
    },
    setState(
      state: CountryJsonSliceType,
      action: PayloadAction<{ id: string; name: string; country_id: string }[]>
    ) {
      state.state = action.payload;
    },
    setCities(
      state: CountryJsonSliceType,
      action: PayloadAction<{ id: string; name: string; state_id: string }[]>
    ) {
      state.city = action.payload;
    },
  },
});

export const { reducer } = slice;

export const { setCountries, setState, setCities } = slice.actions;

export const getCountriesJson = (state: RootStateType) => ({
  countries: state.countryJson.country,
});

export const getCitiesJson = (state: RootStateType) => ({
  cities: state.countryJson.city,
});

export const getStateJson = (state: RootStateType) => ({
  states: state.countryJson.state,
});

export default slice;
