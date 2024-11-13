// ** Redux **
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux-toolkit/store';

// ** Types **
export type TokenSliceType = {
  token?: null | string;
  exam_token?: null | string;
};

const initialState: TokenSliceType = {
  token: null,
  exam_token: null,
};

const slice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state: TokenSliceType, action: PayloadAction<TokenSliceType>) {
      state.token = null;
      state.token = action.payload.token;
    },
    clearToken(state: TokenSliceType) {
      state.token = null;
    },
    setExamToken(state: TokenSliceType, action: PayloadAction<TokenSliceType>) {
      state.exam_token = action.payload.exam_token;
    },
    clearExamToken(state: TokenSliceType) {
      state.exam_token = null;
    },
  },
});

export const { reducer } = slice;

export const { setToken, clearToken, setExamToken, clearExamToken } =
  slice.actions;

export const getAuthToken = (state: RootState) => state.token;

export const getExamToken = (state: RootState) => state.token.exam_token;

export default slice;
