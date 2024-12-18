// ** Redux **
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

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

export const getCountriesJson = (state: RootState) => ({
  countries: state.countryJson.country,
});

export const getCitiesJson = (state: RootState) => ({
  cities: state.countryJson.city,
});

export const getStateJson = (state: RootState) => ({
  states: state.countryJson.state,
});

export default slice;
