import { IconTypes } from 'components/Icon/types';

export type NavigationItemType = {
  path: string | null;
  icon: IconTypes;
  label: string;
  isOpen?: boolean;
  uniqueId: string;
  condition?: any;
  hasAccess?: boolean;
  subRoute?:
    | {
        uniqueId: string;
        label: string;
        path: string;
        id: number;
        icon?: IconTypes;
        hasAccess?: boolean;
      }[]
    | null;
};
export type NotificationProps = {
  profileIcon: IconTypes;
  title: string;
  description: string;
  time: string;
};
