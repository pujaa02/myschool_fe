import Button from 'components/Button/Button';
import Image from 'components/Image';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

const ErrorBoundary = ({ error }: FallbackProps) => {
  const { t } = useTranslation();

  const beforeUnloadHandler = async (event: any) => {
    console.log(window.history);
    event.preventDefault(); // Prevent default unload behavior
    event.returnValue = ''; // Chrome specific to show a message

    window.location.href = PRIVATE_NAVIGATION.dashboard.view.path;
  };

  return (
    error && (
      <div className="error404__page min-h-screen flex items-center justify-center px-[15px] py-[50px]">
        <div className="inner__wrapper w-full">
          <Image
            imgClassName="block w-[700px] max-w-full mx-auto"
            src="/images/police-stop-palm.svg"
            alt="error page"
          />
          <div className="error404__contant w-[500px] max-w-full mx-auto mt-[20px]">
            <h1 className="title font-biotif__Bold text-ip__black__text__color text-[34px] text-center sm:text-[24px]">
              {t('ErrorBoundary.title')}
            </h1>
            <p className="text font-Biotif__Medium text-light__TextColor text-[18px] text-center sm:text-[16px]">
              {t('ErrorBoundary.message')}
            </p>
            <div className="flex justify-center mt-[20px]" />
            <Button
              variants="primary"
              className="w-fit mt-7 mx-auto"
              onClickHandler={beforeUnloadHandler}
            >
              {t('pageNotFound.navigate')}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ErrorBoundary;
