import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'redux-toolkit/store';

type NotificationReadType = {
  isRead: boolean;
};

const initialState: NotificationReadType = {
  isRead: true,
};

const slice = createSlice({
  name: 'notificationIsRead',
  initialState,
  reducers: {
    setIsRead(
      state: NotificationReadType,
      action: PayloadAction<NotificationReadType>
    ) {
      state.isRead = action.payload.isRead;
    },
  },
});

export const { reducer } = slice;
export const useIsRead = (state: RootStateType) => state.isRead;

export const { setIsRead } = slice.actions;

export default slice;
