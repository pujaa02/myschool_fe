import { useTranslation } from 'react-i18next';

import Image from 'components/Image';
import { REACT_APP_API_BASE_URL } from 'config';
import { CompanyViewProps } from 'modules/Client/types';
import { CompanyDetails } from './CompanyDetails';
import { CompanyPayment } from './CompanyPayment';
import { ManagerDetails } from './ManagerDetails';

const ViewForm = ({
  companyInfo,
}: {
  companyInfo: CompanyViewProps | undefined;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap mt-10">
      <div className="w-full max-w-[400px]">
        <div className="max-w-[320px]">
          <div className=" w-full h-[180px] overflow-hidden rounded-xl">
            <Image
              src={`${REACT_APP_API_BASE_URL}/${companyInfo?.logo}`}
              imgClassName="w-full h-full object-cover"
              alt={companyInfo ? `${companyInfo.name}` : 'companyInfo Logo'}
            />
          </div>
          {companyInfo?.description && (
            <div className="mt-7 flex flex-col gap-4">
              <span className="text-grayText text-sm leading-4 inline-block">
                {t('ClientManagement.viewClientDetails.companyDescriptionTitle')}
              </span>
              <p className="text-sm leading-5">{companyInfo?.description}</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-[calc(100%_-_400px)]">
        <CompanyDetails companyInfo={companyInfo} />
        <ManagerDetails companyInfo={companyInfo} />
        <CompanyPayment companyInfo={companyInfo} />
      </div>
    </div>
  );
};

export default ViewForm;
