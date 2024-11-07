// ** Packages **
import { combineReducers } from '@reduxjs/toolkit';

// ** Redux Slices **
import { reducer as authReducer } from './slices/authSlice';
import { reducer as countryJsonReducer } from './slices/countryJsonSlice';
import { reducer as filterOptionsReducer } from './slices/filtereventSlice';
import { reducer as languageReducer } from './slices/languageSlice';
import { reducer as isReadReducer } from './slices/notificationReadSlice';
import { reducer as paginationReducer } from './slices/paginationSlice';
import { reducer as rolePermissionReducer } from './slices/rolePermissionSlice';
import { reducer as SideBarReducer } from './slices/sidebarSlice';
import { reducer as toastReducer } from './slices/toastSlice';
import { reducer as tokenReducer } from './slices/tokenSlice';
import { reducer as commonReducer } from './slices/commonSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  commonToast: toastReducer,
  language: languageReducer,
  sidebar: SideBarReducer,
  token: tokenReducer,
  currentPage: paginationReducer,
  rolePermission: rolePermissionReducer,
  countryJson: countryJsonReducer,
  isRead: isReadReducer,
  filterOptions: filterOptionsReducer,
  common: commonReducer,
});

export default rootReducer;
