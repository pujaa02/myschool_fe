import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../store';

type paginationType = {
  currentPage: number;
  currentNotificationPage?: number;
};

const initialState = {
  currentPage: 1,
  currentNotificationPage: 1,
};

export const slice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    currentPageCount: (
      state: paginationType,
      action: PayloadAction<paginationType>
    ) => {
      state.currentPage = action.payload.currentPage;
    },
    currentNotificationPageCount: (
      state: paginationType,
      action: PayloadAction<number>
    ) => {
      state.currentNotificationPage = action.payload;
    },
  },
});

export const { reducer } = slice;

export const currentPageSelector = (state: RootStateType) => {
  return state.currentPage;
};

export const currentNotificationPageSelector = (state: RootStateType) => {
  return state.currentPage.currentNotificationPage;
};

export const { currentPageCount, currentNotificationPageCount } = slice.actions;

export default slice;
