import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'redux-toolkit/store';

type SideBarType = {
  isOpen: boolean;
  isActive: string | null;
};

const initialState: SideBarType = {
  isOpen: true,
  isActive: 'Dashboard',
};

const slice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    hideSidebar(state: SideBarType) {
      state.isOpen = false;
    },
    showSidebar(state: SideBarType) {
      state.isOpen = true;
    },
    activeSidebar(state: SideBarType, action: PayloadAction<SideBarType>) {
      state.isActive = action.payload.isActive;
    },
    clearActiveSidebar(state: SideBarType) {
      state.isActive = null;
    },
  },
});

export const { reducer } = slice;
export const SidebarSelector = (state: RootStateType) => state.sidebar.isOpen;
export const ActiveSelector = (state: RootStateType) => state.sidebar.isActive;
export const { hideSidebar, showSidebar, activeSidebar, clearActiveSidebar } =
  slice.actions;

export default slice;
