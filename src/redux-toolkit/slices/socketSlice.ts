import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

const initialState = {
  socket: null,
};
export interface ISocketInitialRedux {
  socket: Socket | null;
}
export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state: ISocketInitialRedux, action: PayloadAction<Socket>) => {
      state.socket = action.payload;
    },
  },
});
export const socketSelector = (state: { socket: ISocketInitialRedux }) =>
  state.socket.socket;

export const { reducer } = socketSlice;

export const { setSocket } = socketSlice.actions;

export default reducer;
