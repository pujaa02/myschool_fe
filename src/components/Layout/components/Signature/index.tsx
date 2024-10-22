import { Modal } from 'components/Modal/Modal';
import SignaturePad from 'react-signature-canvas';

import Button from 'components/Button/Button';
import ErrorMessage from 'components/FormElement/ErrorMessage';
import Image from 'components/Image';
import { REACT_APP_API_BASE_URL } from 'config';
import { useModal } from 'hooks/useModal';
import React, { SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SetFieldValue } from 'types/common';

type signModalProps = {
  setSignatureEnd?: React.Dispatch<SetStateAction<File | null>>;
  setSignatureBegin?: React.Dispatch<SetStateAction<File | null>>;
  signImage?: string;
  title?: string;
  isEdit?: boolean;
  error?: string;
  name?: string;
  setFieldValue?: SetFieldValue;
};
const SignatureCanvas = ({
  setSignatureBegin,
  setSignatureEnd,
  signImage,
  title,
  isEdit = true,
  error,
  name,
  setFieldValue,
}: signModalProps) => {
  const modal = useModal();
  const { t } = useTranslation();
  const [signatureImage, setSignatureImage] = useState('');
  const sigPad = useRef<any>();

  const clear = () => {
    sigPad.current.clear();
  };

  const trim = () => {
    if (sigPad.current) {
      const trimmedData = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
      const isEmpty = sigPad.current.isEmpty();
      if (isEmpty === false) {
        dataURLtoFile(trimmedData, 'image');
        modal.closeModal();
      }
    }
  };
  const dataURLtoFile = (dataUrl: string | null, filename: string) => {
    if (dataUrl) {
      const arr = dataUrl.split(',');
      const mimeMatch = /:(.*?);/.exec(arr[0]);
      if (mimeMatch) {
        const mime = mimeMatch[1];
        const bstr = atob(arr[arr.length - 1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const filepath = new File([u8arr], filename, { type: mime });
        const blob = new Blob([filepath], { type: filepath.type });
        const url = URL.createObjectURL(blob);
        setSignatureImage?.(url);
        setSignatureBegin?.(filepath);
        setSignatureEnd?.(filepath);

        return filepath;
      }
    }
    return null;
  };

  return (
    <>
      <div className="flex flex-col gap-0.5">
        <div className="flex">
          <p className="text-sm text-dark opacity-50 mb-2">{title}</p>
          {name && <span className="text-red-700">*</span>}
        </div>
        {error && <ErrorMessage name={name as string} />}
        <div className="h-[200px] flex items-center justify-center bg-siteBG border border-solid border-authBG rounded-lg">
          <Image
            imgClassName="w-full h-full object-contain"
            src={
              signImage ? `${REACT_APP_API_BASE_URL}/${signImage}` : signatureImage
            }
          />

          {signatureImage?.length === 0 && !signImage && (
            <Button
              onClickHandler={() => isEdit && modal.openModal()}
              className="text-sm uppercase text-navText/50"
            >
              {isEdit ? t('AttendanceSheet.open') : 'Pending'}
            </Button>
          )}
        </div>
        {!signImage && isEdit && (
          <Button
            className="inline-block text-danger cursor-pointer text-sm mt-2"
            onClickHandler={() => {
              setSignatureImage('');
              if (setFieldValue && name) {
                setFieldValue(name, '');
              }
            }}
          >
            {t('AttendanceSheet.clear')}
          </Button>
        )}
      </div>
      {modal.isOpen && (
        <Modal
          headerTitle={t('AttendanceSheet.Sign')}
          modal={modal}
          width="!max-w-[400px]"
        >
          <>
            <SignaturePad
              canvasProps={{
                className:
                  'w-full h-[250px] border border-solid border-gray-200 rounded-md',
              }}
              ref={sigPad}
            />
            <div className="flex justify-end mt-3 gap-2">
              <Button
                className="flex-[1_0_0%]"
                variants="grayLight"
                onClickHandler={() => clear()}
              >
                {t('AttendanceSheet.clear')}
              </Button>
              <Button
                className="flex-[1_0_0%]"
                variants="primary"
                onClickHandler={() => {
                  trim();
                }}
              >
                {t('Button.submit')}
              </Button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default SignatureCanvas;
