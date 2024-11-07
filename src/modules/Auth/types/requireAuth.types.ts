// ** Constants **

import {
  BasicPermissionTypes,
  ModuleNames,
} from 'constants/permisssion.constant';

export interface RequiresAuthProps {
  children: JSX.Element;
  module?: ModuleNames;
  type?: BasicPermissionTypes;
}
