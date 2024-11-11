// =================== import packages ==================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { UserToken } from 'pages/Setting/email-setting/EmailSetting/types/userToken.type';
// ======================================================

import { RootState } from 'redux-toolkit/store';
import { PURGE } from 'redux-persist';
import { ModuleNames } from 'constants/permisssion.constant';
import { ColumnViewInterface } from 'components/ColumnViewListDropDown';
import { Option } from 'components/FormField/types/formField.types';

export type moduleType = {
  leadId: string;
  dealId: string;
  accountId: string;
  contactId: string;
  activityId: string;
};

export interface CommonInterface {
  renderModule?: {
    is_visibility: boolean;
    email_details: boolean;
  };
  module: {
    [key: string]: {
      information: boolean;
      description: boolean;
      relatedContacts: boolean;
      // followers: boolean;
    };
  };
  sidebarIsCollapse: boolean;
  appliedFilter: boolean;

  entityTableView: {
    [key: string]: ColumnViewInterface;
  };
  entityLastOpenRecord: {
    [value in ModuleNames]?: {
      index: number;
      dataId: number;
    };
  };
  // animationIconJson: IconJsonType;
  iconAnimationSetting: boolean;
  isViewDiscardPromptEnabled: boolean;
  isViewUpdateStatus: boolean;
  openDiscardConformationModal: boolean;
  mailProviderOption: Option[];

  // csrf: {
  //   token?: string;
  //   expireDate?: string;
  // };
}

// CODE ADD -----------------------
const initialState: CommonInterface = {
  renderModule: {
    is_visibility: false,
    email_details: false,
  },
  module: {},
  sidebarIsCollapse: true,
  appliedFilter: false,
  entityTableView: {},
  entityLastOpenRecord: {},
  // animationIconJson: {},
  iconAnimationSetting: false,
  isViewDiscardPromptEnabled: false,
  isViewUpdateStatus: false,
  openDiscardConformationModal: false,
  mailProviderOption: [],
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setDetailSectionView(state: CommonInterface, action: PayloadAction<any>) {
      state.module = { ...state.module, ...action.payload };
      return state;
    },
    setSidebarIsCollapse(
      state: CommonInterface,
      action: PayloadAction<boolean>
    ) {
      state.sidebarIsCollapse = action.payload;
    },
    setAppliedFilter(state: CommonInterface, action: PayloadAction<boolean>) {
      state.appliedFilter = action.payload;
    },
    setEntityTableView(
      state: CommonInterface,
      action: PayloadAction<{
        viewState: { [key: string]: ColumnViewInterface };
        isReplace?: boolean;
      }>
    ) {
      const { viewState, isReplace } = action.payload;
      if (isReplace) {
        state.entityTableView = { ...viewState };
      } else {
        state.entityTableView = { ...state.entityTableView, ...viewState };
      }
    },
    setEntityLastOpenRecord(
      state: CommonInterface,
      action: PayloadAction<{
        data: {
          [value in ModuleNames]?: {
            index: number;
            dataId: number;
          };
        };
        isReplace?: boolean;
      }>
    ) {
      const { data, isReplace } = action.payload;
      if (isReplace) {
        state.entityLastOpenRecord = { ...data };
      } else {
        state.entityLastOpenRecord = {
          ...state.entityLastOpenRecord,
          ...data,
        };
      }
    },
    setViewDiscardPromptStatus(
      state: CommonInterface,
      action: PayloadAction<{ status: boolean }>
    ) {
      const { status } = action.payload;
      state.isViewDiscardPromptEnabled = status;
    },
    setIsViewUpdateStatus(
      state: CommonInterface,
      action: PayloadAction<{ status: boolean }>
    ) {
      const { status } = action.payload;
      state.isViewUpdateStatus = status;
    },
    setOpenDiscardConformationModal(
      state: CommonInterface,
      action: PayloadAction<{ status: boolean }>
    ) {
      const { status } = action.payload;
      state.openDiscardConformationModal = status;
    },
    setLoadEmailThreads(
      state: CommonInterface,
      action: PayloadAction<{ email_details: boolean }>
    ) {
      const { email_details } = action.payload;
      if (state?.renderModule) {
        state.renderModule.email_details = email_details;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { reducer } = slice;

export const {
  setSidebarIsCollapse,
  setAppliedFilter,
  setDetailSectionView,
  setEntityTableView,
  setEntityLastOpenRecord,
  setViewDiscardPromptStatus,
  setIsViewUpdateStatus,
  setOpenDiscardConformationModal,
} = slice.actions;

export const getSidebarIsCollapse = (state: RootState) =>
  state.common?.sidebarIsCollapse;
export const getAppliedFilter = (state: RootState) =>
  state.common?.appliedFilter;
export const getEntityTableView = (state: RootState) =>
  state.common.entityTableView;
export const getEntityLastOpenRecord = (state: RootState) =>
  state.common.entityLastOpenRecord;
export const getViewDiscardPromptStatus = (state: RootState) =>
  state.common.isViewDiscardPromptEnabled;
export const getIsViewUpdateStatus = (state: RootState) =>
  state.common.isViewUpdateStatus;
export const getOpenDiscardConformationModal = (state: RootState) =>
  state.common.openDiscardConformationModal;
export const getMailProviderOption = (state: RootState) =>
  state.common?.mailProviderOption;

export default slice;
