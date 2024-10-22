import 'modules/Client/styles/index.css';
import { ManagerData } from 'modules/Client/types';
import { useTranslation } from 'react-i18next';
import { CardDetails } from '../../../../components/Card/CardDetails';

interface Props {
  data: ManagerData | undefined;
}
export const ManagerDetails = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="viewCard">
      <span className="text-lg block text-primary font-semibold">
        {t('ClientManagement.viewClientDetails.managerDetailsTitle')}
      </span>
      <div className="w-full">
        <ul className="flex flex-wrap justify-between gap-y-8">
          <CardDetails
            label={t('ClientManagers.viewClientDetails.fullNameTitle')}
            value={data?.user?.full_name}
            className="!justify-start !gap-3"
          />
          <CardDetails
            label={t('ClientManagers.viewClientDetails.emailIdTitle')}
            value={data?.user?.email}
            className="!justify-start !gap-3"
          />

          <CardDetails
            label={t('ClientManagers.viewClientDetails.mobileNumberTitle')}
            value={data?.user?.contact}
            className="!justify-start !gap-3"
          />
          <CardDetails
            label={t('ClientManagers.viewClientDetails.jobTitle')}
            value={data?.job_title}
            className="!justify-start !gap-3"
          />
        </ul>
      </div>
    </div>
  );
};
