// ** Packages **
import { combineReducers } from '@reduxjs/toolkit';

// ** Redux Slices **
import { reducer as authReducer } from './slices/authSlice';
import { reducer as countryJsonReducer } from './slices/countryJsonSlice';
import { reducer as rolePermissionReducer } from './slices/rolePermissionSlice';
import { reducer as SideBarReducer } from './slices/sidebarSlice';
import { reducer as toastReducer } from './slices/toastSlice';
import { reducer as commonReducer } from './slices/commonSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: SideBarReducer,
  rolePermission: rolePermissionReducer,
  countryJson: countryJsonReducer,
  common: commonReducer,
  toast: toastReducer,
});

export default rootReducer;
