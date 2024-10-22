import { IconTypes } from '../../../components/Icon/types';

export type IImageProps = {
  src?: string;
  alt?: string;
  imgClassName?: string;
  NameBadgeParentClass?: string;
  serverPath?: boolean;
  firstName?: string;
  lastName?: string;
  disableLoader?: boolean;
  iconClassName?: string;
  iconName?: IconTypes;
  loaderType?: 'SiteLoader' | 'Spin';
  height?: number;
  width?: number;
  showImageLoader?: boolean;
  loaderClassName?: string;
};
