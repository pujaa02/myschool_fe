// =================== import packages ==================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'redux-toolkit/store';

export type RoleType = {
  id: number;
  name: string;
};

export type permissionType = {
  id: number;
  name: string;
};

export type rolePermissionType = {
  id: number;
  roleId: string;
  permissionId: string;
  featureId: string;
  feature_name?: string;
  permission_name?: string;
  access: string[];
};

export type RoleSliceType = {
  roles: RoleType[];
  rolePermissions: rolePermissionType[];
  permission: permissionType[];
  access: string[];
};

const initialState: RoleSliceType = {
  roles: [],
  rolePermissions: [],
  permission: [],
  access: [''],
};

const rolePermissionSlice = createSlice({
  name: 'rolePermission',
  initialState,
  reducers: {
    setRoles(state: RoleSliceType, action: PayloadAction<RoleType[]>) {
      state.roles = action.payload;
    },
    setPermission(state: RoleSliceType, action: PayloadAction<permissionType[]>) {
      state.permission = action.payload;
    },
    setRolePermission(
      state: RoleSliceType,
      action: PayloadAction<rolePermissionType[]>
    ) {
      state.rolePermissions = action.payload;
    },
    setAccess(
      state: RoleSliceType,
      action: PayloadAction<rolePermissionType['access']>
    ) {
      state.access = action.payload;
    },
  },
});

export const { reducer } = rolePermissionSlice;

export const { setRoles, setPermission, setRolePermission, setAccess } =
  rolePermissionSlice.actions;
export const getRoles = (state: RootStateType) => state.rolePermission.roles;
export const getPermission = (state: RootStateType) =>
  state.rolePermission.permission;
export const getRolesPermission = (state: RootStateType) =>
  state.rolePermission.rolePermissions;
export const getAccess = (state: RootStateType) => state.rolePermission.access;

export default rolePermissionSlice;
