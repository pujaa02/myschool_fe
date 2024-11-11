// ** Packages **
import { combineReducers } from '@reduxjs/toolkit';

// ** Redux Slices **
import { reducer as authReducer } from './slices/authSlice';
import { reducer as countryJsonReducer } from './slices/countryJsonSlice';
import { reducer as rolePermissionReducer } from './slices/rolePermissionSlice';
import { reducer as SideBarReducer } from './slices/sidebarSlice';
import { reducer as toastReducer } from './slices/toastSlice';
import { reducer as commonReducer } from './slices/commonSlice';
import { columnApi } from './api/columnApi';
import { activityApi } from './api/activityApi';
import { userApi } from './api/userApi';

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: SideBarReducer,
  rolePermission: rolePermissionReducer,
  countryJson: countryJsonReducer,
  common: commonReducer,
  toast: toastReducer,
  [columnApi.reducerPath]: columnApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;
