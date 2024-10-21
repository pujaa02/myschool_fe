// =================== import packages ==================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ** type **
import { BoardData } from 'modules/ProjectManagement_module/types';
import { RootStateType } from 'redux-toolkit/store';

const initialBoard: BoardData = {
  columns: [],
};
const boardSlice = createSlice({
  name: 'boardData',
  initialState: initialBoard,
  reducers: {
    setBoardData(state: BoardData, action: PayloadAction<BoardData>) {
      state.columns = action.payload.columns;
    },
  },
});

export const { reducer } = boardSlice;

export const { setBoardData } = boardSlice.actions;
export const getBoardData = (state: RootStateType) => state.boardData.columns;

export default boardSlice;
