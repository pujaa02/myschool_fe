import { useEffect, useState } from 'react';

// ** Components **

// ** type **
import NameBadge from '../../components/Badge/NameBadge';
import Icon from '../../components/Icon';
import Loaders from '../../components/Loaders';
import { IImageProps } from './interface';

const Image = (props: IImageProps) => {
  const {
    src = '',
    alt,
    imgClassName = '',
    NameBadgeParentClass,
    serverPath = false,
    firstName,
    lastName,
    disableLoader = false,
    iconClassName,
    iconName = 'noImgStrokeSD',
    loaderType = '',
    height,
    width,
    loaderClassName,
    showImageLoader = false,
  } = props;
  // ** States **
  const [fetchError, setFetchError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [imageURL, setImageURL] = useState<string | File>('');
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    setImageURL(src ?? '');
  }, [src, height, width, serverPath]);
  const imgComponent = () => {
    if (imageURL) {
      if (fetchError) {
        return (
          <img
            className={`block ${imgClassName}`}
            src="/images/no-image.png"
            alt={`${alt ?? src}`}
          />
        );
      }

      return (
        <img
          className={`${!isImageLoaded ? 'hidden' : 'block'} ${imgClassName}`}
          src={`${src}`}
          alt={`${alt || src}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            setFetchError(true);
            setIsImageLoaded(true);
          }}
          height={height}
          width={width}
        />
      );
    }
    // if (!loaderType && iconName === 'noImgStrokeSD' && !firstName && !lastName) {
    //   return (
    //     <img
    //       className={`block ${imgClassName}`}
    //       src="/images/no-image.png"
    //       alt={`${alt ?? 'No Image'}`}
    //     />
    //   );
    // }
    return <Icon className={iconClassName} name={iconName} />;
  };

  return (
    <>
      {!disableLoader && loaderType && (
        <Loaders className={loaderClassName} type={loaderType || 'Spin'} />
      )}
      {(firstName || lastName) && (
        <NameBadge
          parentClass={NameBadgeParentClass}
          FirstName={firstName ?? ''}
          LastName={lastName ?? ''}
        />
      )}
      {!disableLoader && !isImageLoaded && imageURL && showImageLoader && (
        <Loaders className={loaderClassName} type={loaderType || 'Spin'} />
      )}
      {imgComponent()}
    </>
  );
};

export default Image;
