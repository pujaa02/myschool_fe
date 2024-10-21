// ** hooks **
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import Image from 'components/Image';

// ** constant **
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] bg-siteBG2 w-full">
      <div className="flex items-center justify-center h-full">
        <div className="">
          <p className="hidden">{t('ErrorBoundary.pageNotFound')}</p>
          <Image
            imgClassName="max-w-full max-h-[32dvh] mx-auto"
            src="/images/404.svg"
          />
          <div className="max-w-[350px] mx-auto text-center mt-7 flex flex-col">
            <p className="text-sm leading-5 font-medium text-grayText ">
              {t('pageNotFound.message')}
            </p>
            <Button
              variants="primary"
              className="w-fit mt-7 mx-auto"
              onClickHandler={() => {
                navigate(PRIVATE_NAVIGATION.dashboard.view.path);
              }}
            >
              {t('pageNotFound.navigate')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
