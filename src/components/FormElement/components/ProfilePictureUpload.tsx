import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_API_BASE_URL } from 'config';
import { IMAGE_SUPPORTED_FORMATS } from 'constants/filesupport.constant';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToast } from 'redux-toolkit/slices/toastSlice';
import { customRandomNumberGenerator } from 'utils';

interface FileInputProps {
  acceptTypes?: string;
  parentClass?: string;
  setValue: (
    field: string,
    value: (string | File)[] | File | null,
    shouldValidate?: boolean
  ) => void;
  name: string;
  value: File | string | null;
  label?: string;
  isCompulsory?: boolean;
}

const ProfilePictureUpload = ({
  parentClass,
  setValue,
  name,
  value,
  label,
  acceptTypes,
  isCompulsory = false,
}: FileInputProps) => {
  const maxSize = 5 * 1024 * 1024;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [source, setSource] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const removeFile = () => {
    if (inputRef?.current) inputRef.current.value = '';
    setValue(name, null);
  };
  useEffect(() => {
    if (typeof value === 'string') {
      setSource(`${REACT_APP_API_BASE_URL}/${value}`);
    } else if (value) {
      setSource(window?.URL?.createObjectURL(value));
    } else {
      setSource('/images/no-image.png');
    }
    setLoading(false);
  }, [value]);

  return (
    <div className={`relative ${parentClass ?? ''}`}>
      {label && (
        <label className="block mb-10px text-sm/18px text-left font-semibold ">
          {label}
          {isCompulsory && <span className="text-darkred">*</span>}
        </label>
      )}
      <div className="w-24 h-24 rounded-full relative  p-1 bg-search-grey flex  ">
        <label
          htmlFor={`${!value ? 'ProfileIMG' : ''}`}
          className="block w-full"
        >
          {/* <FancyBox> */}
          <Link
            className={`flex items-center justify-center relative w-full h-full ${
              value ? '' : 'pointer-events-none'
            }`}
            to={source}
            target="_blank"
            data-fancybox
          >
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-50 border border-solid border-grayText/20 rounded-full">
                <Image loaderType="Spin" />
              </div>
            )}
            <span className="block w-full h-full">
              <Image
                src={source}
                imgClassName=" object-cover rounded-full m-auto h-full w-full"
                width={100}
                height={100}
                alt=""
              />
            </span>
          </Link>
          {/* </FancyBox> */}
          <input
            type="file"
            name=""
            hidden
            ref={inputRef}
            accept={acceptTypes}
            id="ProfileIMG"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setLoading(true);
              if (
                !IMAGE_SUPPORTED_FORMATS.includes(
                  event?.target?.files?.[0]?.type as string
                )
              ) {
                const random = customRandomNumberGenerator();
                dispatch(
                  setToast({
                    variant: 'Error',
                    message: `Image type is invalid`,
                    type: 'error',
                    id: random,
                  })
                );
                setLoading(false);
                return;
              }
              if (event?.target?.files && event?.target?.files.length) {
                if (event.target.files[0].size > maxSize) {
                  const random = customRandomNumberGenerator();

                  dispatch(
                    setToast({
                      variant: 'Error',
                      message: `Profile image size should be less than 5 mb`,
                      type: 'error',
                      id: random,
                    })
                  );
                  setLoading(false);
                } else {
                  setValue(name, event.target.files[0]);
                }
              }
            }}
            className="w-[95px]"
          />
          {!value && (
            <Button className="cursor-pointer pointer-events-auto absolute bottom-1 right-1 inline-block p-1.5 w-6 h-6 rounded-full bg-primary2 text-primary">
              <Image iconName="editpen2" iconClassName="w-full h-full" />
            </Button>
          )}
        </label>
        {value && (
          <span className="cursor-pointer pointer-events-auto absolute bottom-1 right-1 inline-block p-1.5 w-6 h-6 rounded-full bg-primary2 text-primary">
            <span onKeyDown={(e) => e.preventDefault()} onClick={removeFile}>
              <Image iconName="crossIcon" iconClassName="w-full h-full" />
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
