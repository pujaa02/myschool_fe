// ** hooks **
// import { useTranslation } from 'react-i18next';

// ** components **
import Button from 'components/Button/Button';

const NotAuthorized = () => {
  // const { t } = useTranslation();

  return (
    <div className="h-[100dvh] bg-siteBG2 w-full">
      <div className="flex items-center justify-center h-full">
        <div className="">
          <p className="hidden">{'ErrorBoundary.notAuthorized'}</p>

          <div className="max-w-[400px] mx-auto text-center mt-7 flex flex-col">
            <p className="text-xl font-semibold text-dark mb-3">
              {'notAuthorize.title'}
            </p>
            <p className="text-sm leading-5 font-medium text-grayText ">
              {'notAuthorize.message'}
            </p>
            <Button variants="primary" className="w-fit mt-7 mx-auto">
              {'notAuthorize.navigate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
