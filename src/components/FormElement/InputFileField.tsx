import _ from 'lodash';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// ** redux **
import { removeToast, setToast } from 'redux-toolkit/slices/toastSlice';

// ** components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import ToolTip from 'components/Tooltip';
import ErrorMessage from './ErrorMessage';

// ** type **
import { IChatFileDisplay, IChatFileField } from './types';

// ** config **
import { REACT_APP_API_BASE_URL } from 'config';

// ** const **
import {
  chatDocsSize,
  chatImageSize,
  chatVideoSize,
  imageExtension,
  videoExtension,
} from 'constants/filesupport.constant';

// ** Enum **
import { EnumFileType } from './enum';

// ** style **
import './style/inputFileField.css';

// ** utils **
import { customRandomNumberGenerator } from 'utils';

const checkValidImageSize = (value: File | Blob, size: number) => {
  return value.size <= size * 1000000;
};

const InputFileField = ({
  name,
  value,
  acceptTypes = '*/*',
  size,
  fileType,
  id,
  limit = 5,
  isMulti,
  className,
  setValue,
  isControls = true,
}: IChatFileField) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    if (isMulti && event?.target?.files) {
      if (event?.target?.files?.length <= limit) {
        const media: File[] = [];
        Array(event.target.files.length)
          .fill(0)
          .forEach((_, index) => {
            if (event.target.files) media.push(event.target.files[index]);
          });

        if ((value as Array<File | string>).length < limit) {
          setValue(name, [...(value as Array<File | string>), ...media]);
        } else {
          const random = customRandomNumberGenerator();
          dispatch(
            setToast({
              variant: 'Error',
              message: `${t('ToastMessage.notUploadMoreFileText')} ${limit} ${t(
                'ToastMessage.items'
              )}`,
              type: 'error',
              id: random,
            })
          );
          setTimeout(() => {
            dispatch(removeToast({ id: random }));
          }, 2000);
        }
      } else {
        const random = customRandomNumberGenerator();
        dispatch(
          setToast({
            variant: 'Error',
            message: `${t('ToastMessage.notUploadMoreFileText')} ${limit} ${t(
              'ToastMessage.items'
            )}`,
            type: 'error',
            id: random,
          })
        );
      }
    } else if (event?.target?.files && event?.target?.files?.length > 0) {
      setValue(name, event.target.files[0]);
    }
  };

  return (
    <>
      <div className={`${className ?? ''}`}>
        <div>
          <input
            id={id}
            type="file"
            ref={inputRef}
            accept={acceptTypes}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChangeEvent(event);
            }}
            multiple={isMulti}
            hidden
          />

          {value && !isMulti && (
            <FileDisplay
              value={value as File | string}
              setValue={setValue}
              name={name}
              Ref={inputRef}
              size={size}
              fileType={fileType}
              isControls={isControls}
            />
          )}

          {isMulti && !_.isEmpty(value) && (
            <div className="inner gap-3.5 p-2 w-full absolute bottom-full">
              <div className="flex gap-4 p-2 bg-gray-100 rounded-xl items-center">
                <div
                  className={`${
                    fileType === EnumFileType.Document
                      ? 'grid grid-cols-2 gap-4'
                      : 'flex gap-3.5 flex-wrap '
                  } w-full max-h-[100px] overflow-auto no-scrollbar`}
                >
                  {(value as Array<File | string>).map((item, i) => (
                    <div
                      className={`${
                        fileType === EnumFileType.Document
                          ? 'border border-gray-300 border-solid'
                          : 'border w-20 h-20 flex items-center justify-center'
                      }  rounded-xl cursor-pointer`}
                      key={customRandomNumberGenerator()}
                    >
                      {(value as Array<File | string>)[i] && (
                        <FileDisplay
                          value={item}
                          Ref={inputRef}
                          key={customRandomNumberGenerator()}
                          index={i}
                          isMulti={isMulti}
                          setValue={setValue}
                          Values={value as Array<File | string>}
                          name={name}
                          size={size}
                          fileType={fileType}
                          limit={limit}
                          isControls={isControls}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-l border-solid border-gray-400 ps-4 pe-2">
                  <Button
                    onClickHandler={() => setValue(name, '')}
                    className="delete-all-button group"
                  >
                    <Image iconName="deleteIcon" />
                    <ToolTip
                      text="Delete All? This will remove all the files attached to this field."
                      position="left"
                    />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ErrorMessage name={name} />
    </>
  );
};

export const FileDisplay = ({
  value,
  setValue,
  index,
  isMulti = false,
  Values = [],
  name,
  Ref,
  size,
  fileType,
  isControls,
}: IChatFileDisplay) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [type, setType] = useState<EnumFileType>(EnumFileType.Document);
  const [source, setSource] = useState<string>();
  useEffect(() => {
    if (value) {
      checkExtension();
      if (Ref?.current) Ref.current.value = '';
    }
  }, [value]);

  const checkExtension = () => {
    const isStringValue = typeof value === 'string';
    if (isStringValue) {
      const format = value.substring(value.lastIndexOf('.')).toLowerCase();
      let tempFileType: EnumFileType;
      if (imageExtension.includes(format)) tempFileType = EnumFileType.Image;
      else if (videoExtension.includes(format)) tempFileType = EnumFileType.Video;
      else tempFileType = EnumFileType.Document;

      setType(tempFileType);
      setSource(`${REACT_APP_API_BASE_URL}/${value}`);
    } else {
      const fileTypeMap: Record<string, EnumFileType> = {
        image: EnumFileType.Image,
        video: EnumFileType.Video,
        document: EnumFileType.Document,
      };

      const typePrefix = value.type.split('/')[0];
      const format = typePrefix.toLowerCase();

      setType(fileTypeMap[format] || EnumFileType.Document);
      setSource(window?.URL?.createObjectURL(value));

      let sizeValue: number;
      if (format === 'image') sizeValue = chatImageSize;
      else if (format === 'video') sizeValue = chatVideoSize;
      else sizeValue = chatDocsSize;

      const sizeToUse = size ?? sizeValue;
      checkAndRemove(value, fileTypeMap[format] || EnumFileType.Document, sizeToUse);
    }
  };

  const checkAndRemove = (
    fileValue: File,
    checkFileType: EnumFileType,
    fileSize: number
  ) => {
    if (fileType && fileType !== checkFileType) {
      dispatch(
        setToast({
          variant: 'Error',
          message: `${t('ToastMessage.validFileTypeText')} ${fileType}`,
          type: 'error',
          id: customRandomNumberGenerator(),
        })
      );
      removeFile();
    }
    if (!checkValidImageSize(fileValue, fileSize)) {
      dispatch(
        setToast({
          variant: 'Error',
          message: `${checkFileType} ${t(
            'ToastMessage.validFileSizeText'
          )} ${fileSize} MB`,
          type: 'error',
          id: customRandomNumberGenerator(),
        })
      );
      removeFile();
    }
  };

  const removeFile = () => {
    if (Ref?.current) Ref.current.value = '';
    if (!isMulti) {
      setValue(name, null);
    } else if (!_.isUndefined(index)) {
      const temp = [...Values];
      temp.splice(index, 1);
      setValue(name, temp);
    }
  };

  const renderNestedType = (
    fileNestedType: string,
    defaultSource: string | undefined
  ) => {
    switch (fileNestedType) {
      case EnumFileType.Image:
        return (
          <div className="h-full w-full">
            <Image
              src={source}
              imgClassName={`w-full h-full object-cover rounded-xl bg-black/50 `}
              alt="sourceImage"
              width={120}
              height={60}
            />
          </div>
        );
      case EnumFileType.Video:
        return (
          <div className="h-full w-full">
            <video
              key={source}
              controls={isControls}
              width="100%"
              height="100%"
              className="rounded-xl w-full h-full object-contain"
            >
              <track kind="captions" />
              <source src={source} />
            </video>
          </div>
        );
      default:
        return (
          defaultSource && (
            <div className="flex gap-2.5 items-center  max-w-[calc(100%_-_50px)]">
              <Image iconName="fileIcon" iconClassName="w-7 h-7 text-primary" />

              <Button className="inline-block truncate h-fit">
                {typeof value !== 'string'
                  ? value.name
                  : value.split('/')[value.split('/').length - 1] ?? 'file'}
              </Button>
            </div>
          )
        );
    }
  };

  return (
    <div
      className={`${isMulti ? 'max-w-full w-full' : ''} 
      ${
        fileType === EnumFileType.Document
          ? 'flex gap-2 justify-between items-center p-1.5 px-3'
          : 'h-full flex justify-center items-center'
      } relative group `}
    >
      {renderNestedType(type, source)}
      <Button
        type="button"
        className={`${
          fileType === EnumFileType.Document
            ? 'w-10 h-10 bg-gray-300 rounded-lg text-primary'
            : 'deleteFile_Hover '
        } p-2`}
        onClickHandler={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeFile();
        }}
      >
        <Image iconName="deleteIcon" iconClassName="w-full h-full" />
      </Button>
    </div>
  );
};

export default InputFileField;
