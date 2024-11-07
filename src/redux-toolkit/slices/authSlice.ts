// =================== import packages ==================
import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // createSelector,
import { Option } from 'components/FormField/types/formField.types';
import { LOGIN_STEP, USER_STATUS } from '../../constants';

// ======================================================
// import {
//   Permission,
//   // PermissionObj,
// } from 'pages/Setting/user-setting/ProfilePermissions/types/profile-permissions.types';

import { RootState } from '../store';
import { clearBrowserCookiesAndStorage } from 'utils/util';

type status = 'ACTIVE' | 'INACTIVE';
type jsonObject = { [key: string]: any };

export type Permission = {
  id?: number;
  name: string;
  value?: number;
  status: status;
  is_disabled?: boolean;
};

export interface UserInterface {
  id?: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  username?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  linkedin?: Array<object>;
  profile_image?: string | null;
  added_by?: number;
  birth_date?: Date;
  website?: string;
  fax?: string;
  gender?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  timezone?: string;
  country?: string;
  zip?: string;
  active?: status;
  verified: boolean;
  two_factor_verified?: boolean;
  is_owner?: boolean;
  last_login_time?: Date;
  report_to?: number;
  apple_id?: number;
  google_id?: number;
  settings?: jsonObject;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
  deleted_at?: Date;
  two_factor_enabled?: boolean;
  user_organizations?: {
    user_id: number;
    organization_id: number;
    user_status: USER_STATUS;
    organization: {
      name: string;
      uuid: string;
      owner_id: number;
    };
  }[];
  organization?: {
    user_id: number;
    organization_id: number;
    organization: {
      name: string;
      uuid: string;
      owner_id: number;
    };
  };
  user_roles?: { role_id: number; role: { name: string } }[];
  UserSIP?: {
    id: number;
    sip_id: string;
    username: string;
    password: string;
  }[];
  date_format?: string;
  initial_color?: string;
  user_linkedin?: {
    linkedin_id: number;
    linkedin: {
      id: number;
      name: string;
      status: boolean | number;
    };
  }[];
  social_media?: {
    is_primary?: boolean;
    socialmedia_id?: string;
    socialmedia_account?: string | null;
  }[];
}

export interface ActivePermissionsInterface {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface AuthInterface {
  user?: UserInterface | null;
  reportTo?: { option: Option[]; count: number };
  // hierarchyUsers?: UserInterface[];
  // permissions?: ActivePermissionsInterface[];
  organizationUUID?: string | null;
  organizationId?: number | null;
  isAuthenticated?: boolean;
  isAuthInitialized?: boolean;
  version?: string | null;
  passExpired?: boolean;
  twoFactorEnable?: boolean;
  twoFactorVerified?: boolean;
  authStepStore?: {
    currentStep: string;
  };
  account?: string;
}

// CODE ADD -----------------------
const initialState: AuthInterface = {
  user: null,
  // permissions: [],
  organizationUUID: null,
  organizationId: null,
  isAuthenticated: false,
  isAuthInitialized: false,
  twoFactorEnable: false,
  twoFactorVerified: false,
  authStepStore: {
    currentStep: LOGIN_STEP.LOGIN_FORM,
  },
  account: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      const { user } = action.payload;
      if (user) {
        state.isAuthenticated = true;
      }
    },
    // setPermissions(
    //   state: AuthInterface,
    //   action: PayloadAction<PermissionObj[]>
    // ) {
    //   const updatedPermissions = action.payload.reduce(
    //     (prevModules: ActivePermissionsInterface[], currModule) => {
    //       const isActive = currModule.permissions.some(
    //         (permission) => permission.status === 'ACTIVE'
    //       );
    //       if (isActive) {
    //         prevModules.push({
    //           id: currModule.id,
    //           name: currModule.name,
    //           permissions: currModule.permissions,
    //         });
    //       }
    //       return prevModules;
    //     },
    //     []
    //   );
    //   state.permissions = updatedPermissions;
    // },
    setAuthInitialized(state: AuthInterface) {
      state.isAuthInitialized = true;
    },
    setAuthenticated(
      state: AuthInterface,
      action: PayloadAction<AuthInterface>
    ) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setUserData(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      // state.user = action.payload.user;
      state.user = {
        ...state.user, // Keep existing fields
        ...action.payload.user, // Update with new fields
        verified: true,
      };
    },
    setReportTo(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      state.reportTo = action.payload.reportTo;
    },
    // setHierarchyUsers(
    //   state: AuthInterface,
    //   action: PayloadAction<AuthInterface>
    // ) {
    // state.hierarchyUsers = action.payload.hierarchyUsers;
    // },
    setUserProfile(state: AuthInterface, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profile_image = action.payload;
      }
    },
    setUserDateFormat(state: AuthInterface, action: PayloadAction<string>) {
      if (state.user) {
        state.user.date_format = action.payload;
      }
    },
    setCredentials(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      const { user } = action.payload;
      if (user) {
        state.user = {
          ...state.user, // Keep existing user data
          ...user, // Update specific fields from payload
        };
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    setUserVerified(state: AuthInterface) {
      if (state.user) {
        state.user.verified = true;
      } else {
        state.user = { verified: true };
      }
    },
    setLogoutData(state: AuthInterface) {
      // state.permissions = [];
      state.organizationUUID = null;
      state.twoFactorEnable = undefined;
      state.twoFactorVerified = undefined;
      state.organizationId = undefined;
      state.authStepStore = undefined;
      state.user = null;
      state.isAuthenticated = false;
      // state.account = '';
      clearBrowserCookiesAndStorage();
    },
    setVersionNumber(
      state: AuthInterface,
      action: PayloadAction<AuthInterface>
    ) {
      const { version } = action.payload;
      if (version) {
        state.version = action.payload.version;
        state.isAuthenticated = true;
      }
    },

    setPassWordExpired(
      state: AuthInterface,
      action: PayloadAction<AuthInterface>
    ) {
      state.passExpired = action.payload.passExpired;
    },

    setTwoFactor(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      state.twoFactorEnable = action.payload.twoFactorEnable;
    },

    setOTPAccount(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      state.account = action.payload.account;
    },

    setTwoFactorVerified(
      state: AuthInterface,
      action: PayloadAction<AuthInterface>
    ) {
      state.twoFactorVerified = action.payload.twoFactorVerified;
    },

    setCurrentStep(
      state: AuthInterface,
      action: PayloadAction<{ [key: string]: string } | undefined>
    ) {
      state.authStepStore =
        action?.payload === undefined
          ? undefined
          : {
              currentStep:
                state.authStepStore?.currentStep || LOGIN_STEP.LOGIN_FORM,
              ...action.payload,
            };
    },
  },
});

export const { reducer } = slice;

export const {
  setCredentials,
  setLogoutData,
  setAccessToken,
  // setPermissions,
  setAuthenticated,
  setAuthInitialized,
  setUserData,
  setReportTo,
  setUserVerified,
  setUserProfile,
  setUserDateFormat,
  setVersionNumber,
  setPassWordExpired,
  setTwoFactor,
  setTwoFactorVerified,
  setCurrentStep,
  setOTPAccount,
} = slice.actions;

export const getAuth = (state: RootState) => state.auth;
export const getIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const getCurrentUser = (state: RootState) => state.auth.user;

export const getCurrentUserDateFormat = (state: RootState) =>
  state.auth.user?.date_format;
export const getCurrentUserProfileImage = (state: RootState) =>
  state.auth.user?.profile_image;
// export const getCurrentUserProfile = createSelector(getCurrentUser, (state) => {
//   if (state && state.user_roles) {
//     return { id: state.user_roles?.[0].role_id };
//   }
//   return { id: null };
// });

export const getReportToUser = (state: RootState) => state.auth.reportTo;

// export const getCurrentUserPermissions = (state: RootState) =>
//   state.auth.permissions || [];

// export const getCurrentUserPermissionsIds = createSelector(
//   getCurrentUserPermissions,
//   (state) => state.map((p) => p.id)
// );
// export const getDetailSection = (state: RootState) => state.common.module;
export const getCurrentVersion = (state: RootState) => state.auth.version;

export const getPassExpired = (state: RootState) => state.auth.passExpired;

export const getCurrentStep = (state: RootState) => state.auth.authStepStore;
export const getOTPAccount = (state: RootState) => state.auth.account;
export default slice;
