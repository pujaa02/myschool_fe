import { PrivateMembersDetails } from 'modules/Client/types';
import { useTranslation } from 'react-i18next';
import { CardDetails } from 'components/Card/CardDetails';

const ViewDetails = ({ data }: { data: PrivateMembersDetails | undefined }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap ">
      <div className="w-full">
        <div className="flex flex-col gap-y-8  pb-8 mb-8 last:mb-0 last:pb-0 last:border-none">
          <div className="w-full">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-6">
              <CardDetails
                label={t('PrivateMembers.viewClientDetails.fullNameTitle')}
                value={data?.full_name}
                className="gap-1 !justify-start !max-w-full"
              />
              <CardDetails
                label={t('PrivateMembers.viewClientDetails.emailIdTitle')}
                value={data?.email}
                className="gap-1 !justify-start !max-w-full"
              />
              <CardDetails
                label={t('PrivateMembers.clientForm.fieldInfos.codiceFiscale')}
                value={data?.private_individual?.codice_fiscale}
                className="gap-1 !justify-start !max-w-full"
              />

              <CardDetails
                label={t('PrivateMembers.viewClientDetails.mobileNumberTitle')}
                value={data?.contact}
                className="gap-1 !justify-start !max-w-full"
              />
              <CardDetails
                label={t('PrivateMembers.clientForm.fieldInfos.role')}
                value={data?.private_individual?.job_title}
                className="gap-1 !justify-start !max-w-full"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
