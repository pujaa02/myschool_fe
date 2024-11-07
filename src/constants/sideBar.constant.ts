// ** Component **
import { BasicPermissionTypes, ModuleNames } from './permisssion.constant';
import { PRIVATE_NAVIGATION } from './navigation.constant';
import { IconTypes } from 'components/Icon';

// ** Constant **

// import { IconTypeJson } from 'indexDB/indexdb.type';

interface SidebarInterface {
  id: string;
  label: string;
  link: string;
  children: Array<{ id: string; label: string; link: string }>;
  icon: IconTypes;
  // animationIcon: IconTypeJson;
  module?: ModuleNames;
  type?: BasicPermissionTypes;
}

export const SIDE_BAR: readonly SidebarInterface[] = Object.freeze([
  {
    id: 'dashboard',
    label: 'Dashboard',
    link: PRIVATE_NAVIGATION.dashboard.view,
    children: [],
    icon: 'dashboardFilledBlueIcon',
    // animationIcon: IconTypeJson.Dashboard,
  },
]);
