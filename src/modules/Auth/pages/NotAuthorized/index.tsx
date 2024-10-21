// ** hooks **
import { useTranslation } from 'react-i18next';

// ** components **
import Button from 'components/Button/Button';
import Image from 'components/Image';

const NotAuthorized = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[100dvh] bg-siteBG2 w-full">
      <div className="flex items-center justify-center h-full">
        <div className="">
          <p className="hidden">{t('ErrorBoundary.notAuthorized')}</p>
          <Image
            imgClassName="max-w-full max-h-[32dvh] mx-auto"
            src="/images/police-stop-palm.svg"
          />
          <div className="max-w-[400px] mx-auto text-center mt-7 flex flex-col">
            <p className="text-xl font-semibold text-dark mb-3">
              {t('notAuthorize.title')}
            </p>
            <p className="text-sm leading-5 font-medium text-grayText ">
              {t('notAuthorize.message')}
            </p>
            <Button variants="primary" className="w-fit mt-7 mx-auto">
              {t('notAuthorize.navigate')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
