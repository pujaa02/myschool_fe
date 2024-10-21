// ** Redux **
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'redux-toolkit/store';

// ** Helper **
// import { logoutHelper } from "modules/Auth/helper";

// ** Types **

interface TrainerAttachment {
  id: number;
  trainer_id: number;
  attachment_url: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
interface SubCategory {
  id: number;
  name: string;
  slug: string;
  language: string;
  parent_table_id: number | null;
  image: string | null;
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface TrainerSubCategory {
  id: number;
  trainer_id: number;
  sub_category_id: number;
  parent_table_id: number | null;
  language: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sub_category: SubCategory;
}
export type UserTrainer = {
  location?: string;
  latitude?: string;
  longitude?: string;
  hourly_rate?: string;
  travel_reimbursement_fee?: string;
  trainerSubCategory: TrainerSubCategory[];
  trainerAttachment?: TrainerAttachment[];
  username?: string;
};
export type AuthUserType = {
  full_name?: string;
  profile_image?: string;
  date_format?: string;
  email?: string;
  id?: string;
  first_name?: string;
  role_id?: number;
  role_name?: string;
  last_name?: string;
  address1?: string;
  address2?: string;
  gender?: string;
  birth_date?: string;
  username?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  active?: string;
  contact?: string;
  verified?: boolean;
  trainer?: UserTrainer;
  manager?: {
    job_title: string;
    id: number;
    company_manager?: { company?: { id: string; name: string; slug: string } }[];
  };
};
// & UserType;

export type AuthSliceType = {
  user?: Partial<AuthUserType | null>;
  isAuthenticated?: boolean;
  activeRole?: string;
};

const initialState: AuthSliceType = {
  user: null,
  isAuthenticated: false,
  activeRole: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setUserData(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      state.user = action.payload.user;
    },
    setUserProfile(state: AuthSliceType, action: PayloadAction<string>) {
      if (state.user) state.user.profile_image = action.payload;
    },
    setUserDateFormat(state: AuthSliceType, action: PayloadAction<string>) {
      if (state.user) {
        state.user.date_format = action.payload;
      }
    },
    setCredentials(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      const { user } = action.payload;
      if (user) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
    },
    setActiveRole(state: AuthSliceType, action: PayloadAction<string>) {
      state.activeRole = action.payload;
    },
    setLogoutData(state: AuthSliceType) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { reducer } = slice;

export const {
  setCredentials,
  setLogoutData,
  setAuthenticated,
  setUserData,
  setUserProfile,
  setUserDateFormat,
  setActiveRole,
} = slice.actions;

export const getAuth = (state: RootStateType) => state.auth;

export const getIsAuthenticated = (state: RootStateType) =>
  state.auth.isAuthenticated;

export const getCurrentUser = (state: RootStateType) => state.auth.user;

export const getCurrentUserDateFormat = (state: RootStateType) =>
  state.auth.user?.date_format;

export const getCurrentUserProfileImage = (state: RootStateType) =>
  state.auth.user?.profile_image;

export const getUserRole = (state: RootStateType) => state.auth.activeRole;

export default slice;
