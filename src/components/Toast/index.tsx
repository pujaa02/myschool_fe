// ** packages **
import { useDispatch, useSelector } from 'react-redux';

// ** Redux **
import { getToast, removeToast } from 'redux-toolkit/slices/toastSlice';

// ** Components **

// ** Types **

// ** CSS **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useEffect, useState } from 'react';
import './style/toast.css';

const ToastIcon = (variant?: string) => {
  switch (variant) {
    case 'Error':
      return (
        <Image iconName="toastErrorIcon" iconClassName="w-full h-full relative" />
      );
    case 'Warning':
      return (
        <Image iconName="toastWarning" iconClassName="w-full h-full relative" />
      );
    case 'Success':
      return (
        <Image iconName="toastSuccessIcon" iconClassName="w-full h-full relative" />
      );
    case 'Info':
      return (
        <Image iconName="toastInfoIcon" iconClassName="w-full h-full relative" />
      );
    default:
      return <Image iconName="crossIcon" iconClassName="w-full h-full relative" />;
  }
};

const Toast = () => {
  const toastMessage = useSelector(getToast);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<number[]>([]);

  useEffect(() => {
    setTimeout(() => {
      return toastMessage.map((dat) => dispatch(removeToast({ id: dat.id }))) || [];
    }, 2000);
    setIsVisible(toastMessage.map((dat) => dat.id) || []);
  }, [toastMessage]);
  const ToastClasses = (type?: string, variant?: string) => {
    switch (variant) {
      case 'Error':
        return type === 'dark' ? 'bg-rose-950 ' : 'bg-rose-600 ';
      case 'Warning':
        return type === 'dark' ? 'bg-orange-950 ' : 'bg-orange-600 ';
      case 'Success':
        return type === 'dark' ? 'bg-green-950 ' : 'bg-green-600 ';
      case 'Info':
        return type === 'dark' ? 'bg-blue-950 ' : 'bg-blue-600 ';
      default:
        return type === 'dark' ? 'bg-gray-950 ' : 'bg-gray-400';
    }
  };

  return (
    <>
      {toastMessage.length ? (
        <div className="fixed bottom-8 right-8 flex justify-center z-4 flex-col gap-y-6">
          {toastMessage.map((toast) => (
            <div
              key={toast.id}
              style={{
                opacity: isVisible.includes(toast.id) ? 1 : 0,
                transform: `translateX(${
                  isVisible.includes(toast.id) ? '0' : '30px'
                })`,
                transition: 'opacity 0.5s, transform 0.5s',
              }}
              className={`${toast.type} ${ToastClasses(
                '',
                toast.variant
              )} w-[340px] rounded-xl text-white py-2.5 relative shadow-header shadow-dark/50`}
            >
              <div className="absolute top-0 left-0 overflow-hidden w-full h-full pointer-events-none rounded-xl flex items-start">
                <Image
                  iconName="toastBubbleIcon"
                  iconClassName="text-black/50 w-20 bottom-0 -translate-x-2.5 -translate-y-1.5"
                />
              </div>
              <span
                className={`w-10 h-10 p-2 rounded-full inline-block absolute -top-4 left-8 z-1 ${ToastClasses(
                  'dark',
                  toast.variant
                )}`}
              >
                <span
                  className={`inline-block w-3 h-8 rounded-[100%] absolute -bottom-1.5 rotate-12 left-0 right-0 mx-auto -z-1 ${ToastClasses(
                    'dark',
                    toast.variant
                  )}`}
                />
                {ToastIcon(toast.variant)}
              </span>
              <div className="max-w-[calc(100%_-_90px)] ms-auto pe-7">
                <p className="text-2xl font-medium">{toast.variant}</p>
                <span className="text-sm leading-5 block mt-2 font-normal min-h-[36px]">
                  {toast.message}
                </span>
              </div>
              <Button
                onClickHandler={() => dispatch(removeToast({ id: toast.id }))}
                className="w-4 h-4 inline-block text-white cursor-pointer hover:opacity-60 absolute select-none active:scale-95 transition-all duration-300 right-3.5 top-3.5"
              >
                <Image iconName="crossIcon" iconClassName="w-full h-full" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Toast;
