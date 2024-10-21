// ** hooks **
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** components **
import axios from 'axios';
import Image from 'components/Image';
import { REACT_APP_API_BASE_URL } from 'config';

const SomethingWentWrong = () => {
  const { t } = useTranslation();
  const [apiCall, setApiCall] = useState(true);

  useEffect(() => {
    if (apiCall) {
      axios
        .get(`${REACT_APP_API_BASE_URL}/_health`)
        .then((res) => {
          if (res) {
            window.location.href = '/';
          }
        })
        .catch(() => {
          setApiCall(false);
          setTimeout(() => {
            setApiCall(true);
          }, 50000);
        });
    }
  }, [apiCall]);

  return (
    <div className="h-[100dvh] bg-siteBG2 w-full">
      <div className="flex items-center justify-center h-full">
        <div className="">
          <p className="hidden">{t('ErrorBoundary.pageNotFound')}</p>
          <Image
            imgClassName="block w-[700px] max-w-full mx-auto"
            src="/images/police-stop-palm.svg"
            alt="error page"
          />
        </div>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
