import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_API_BASE_URL } from 'config';
import { otherSize } from 'constants/filesupport.constant';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToast } from 'redux-toolkit/slices/toastSlice';
import { customRandomNumberGenerator } from 'utils';
import { EnumFileType } from './enum';
import { LinkDisplayProps } from './types';

const checkValidImageSize = (value: File | Blob, size: number) => {
  return value.size <= size * 1000000;
};
const LinkFileDisplay = ({
  filepath,
  id,
  crossButton,
  index,
  isMulti,
  setValue,
  Values,
  Ref,
  name,
  isSendMail,
  isBlack = false,
  externalURL,
}: LinkDisplayProps) => {
  const { t } = useTranslation();

  let url = '';
  const [fileUrl, setFileUrl] = useState('');
  const [fileNameBlob, setFileNameBlob] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    handleFileCheck();
  }, [name]);

  const handleFileCheck = () => {
    if (externalURL) {
      setFileUrl(externalURL);
      setFileNameBlob(externalURL);
    }
    if (typeof filepath === 'object') {
      const blob = new Blob([filepath], { type: filepath.type });
      url = URL.createObjectURL(blob);
      setFileUrl(url);

      setFileNameBlob(filepath.name);

      if (!isSendMail) checkAndRemove(filepath, filepath.type, otherSize);
    }

    if (typeof filepath === 'string') {
      url = `${REACT_APP_API_BASE_URL}/${filepath}`;
      const stringFile = filepath.split('/');

      setFileNameBlob(stringFile[stringFile.length - 1]);
      setFileUrl(url);
    }
  };

  const checkAndRemove = (
    fileValue: File,
    checkFileType: string,
    fileSize: number
  ) => {
    const fileTypeMap: Record<string, EnumFileType> = {
      image: EnumFileType.Image,
      video: EnumFileType.Video,
      document: EnumFileType.Document,
    };

    const typePrefix = fileValue?.type?.split('/')[0];
    const format = typePrefix?.toLowerCase();
    if (
      EnumFileType.Document &&
      EnumFileType.Document !== (fileTypeMap[format] || EnumFileType.Document)
    ) {
      const fileTypeRandom = customRandomNumberGenerator();
      dispatch(
        setToast({
          variant: 'Error',
          message: `${t('ToastMessage.validFileTypeText')} ${EnumFileType.Document}`,
          type: 'error',
          id: fileTypeRandom,
        })
      );
      removeFile();
    }
    if (!checkValidImageSize(fileValue, fileSize)) {
      const sizeRandom = customRandomNumberGenerator();
      dispatch(
        setToast({
          message: `${
            checkFileType.charAt(0).toUpperCase() + checkFileType.slice(1)
          } ${t('ToastMessage.validFileSizeText')} ${fileSize} MB`,
          type: 'error',
          id: sizeRandom,
          variant: 'Error',
        })
      );

      removeFile();
    }
  };

  const removeFile = () => {
    if (Ref?.current) Ref.current.value = '';
    if (!isMulti) {
      if (name) {
        setValue?.(name, null);
      }
    } else if (!_.isUndefined(index)) {
      if (Values && name) {
        const tempFileValue = [...Values];
        tempFileValue.splice(index, 1);
        setValue?.(name, tempFileValue);
      }
    }
  };

  return (
    <div
      className={`${
        isBlack
          ? ''
          : 'bg-authBG/40 p-4 border border-solid border-authBG/80 rounded-xl'
      } h-full w-full text-secondary flex items-center`}
    >
      <div
        className={`flex items-center w-full max-w-[calc(100%_-_48px)] ${
          isBlack
            ? 'bg-siteBG py-2.5 px-4 border border-solid border-dark/10 rounded-lg'
            : ''
        }`}
      >
        <span
          className={`inline-block ${isBlack ? 'text-dark w-6 h-6' : ' w-4 h-4'}`}
        >
          <Image iconName="linkIcon" iconClassName="w-full h-full" />
        </span>
        <Link
          className={`${
            isBlack ? 'text-sm text-dark' : 'text-xs text-secondary'
          } max-w-[calc(100%_-_20px)] px-2 truncate`}
          key={id}
          target="_blank"
          to={fileUrl}
        >
          {fileNameBlob}
        </Link>
      </div>
      {crossButton && (
        <Button
          onClickHandler={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            e.stopPropagation();
            removeFile();
          }}
          className={`${
            isBlack
              ? 'w-9 h-9 bg-red-500/10 text-red-500 p-3'
              : ' w-5 h-5 bg-red-500 text-white p-1.5'
          } ms-auto flex items-center justify-center rounded-full`}
        >
          <Image iconName="crossIcon" />
        </Button>
      )}
    </div>
  );
};

export default LinkFileDisplay;
