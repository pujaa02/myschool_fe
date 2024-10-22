import './style/customIcon.css';

// ** type **
import { IconProps } from './types';

// ** component **
import Image from '../../components/Image';
import React, { useEffect, useState } from 'react';

// ** assets **
const removeIconList = [
  'noImgStrokeSD',
  'dotsThreeFillSD',
  'userOutlineSD',
  'arrowLeftStrokeSD',
  'arrowSquareOutStrokeSD',
  'dotsThreeFillSD',
  'rightTickFillSD',
  'crossStrokeSD',
];

type DynamicIconProps = {
  className?: string;
  // Add any other props that your dynamically loaded components accept
};

const Icon = ({
  name,
  className,
  iconType = 'default',
}: // ...rest
IconProps) => {
  const [iconComponent, setIconComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const loadIconComponent = async () => {
      if (!removeIconList.includes(name)) {
        try {
          const iconComponents = await import('../Icon/constant/index');
          const component: React.FC =
            iconComponents.default[name as keyof typeof iconComponents];
          setIconComponent(
            React.createElement<DynamicIconProps>(component, {
              ...{ key: name },
              ...(className ? { className } : {}),
            })
          );
        } catch (error) {
          // Handle error
        }
      }
    };

    loadIconComponent();
  }, [name, className]);

  const renderIconContent = () => {
    if (iconType === 'custom') {
      return (
        <Image
          src={name}
          serverPath
          width={32}
          height={32}
          imgClassName="w-[32px] h-[32px] i__Icon rounded-[12px]"
        />
      );
    }

    return null;
  };

  return iconComponent ?? renderIconContent();
};

export default Icon;
