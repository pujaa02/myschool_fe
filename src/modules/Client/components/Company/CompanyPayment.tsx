import { CardDetails } from 'components/Card/CardDetails';
import { CompanyViewProps } from 'modules/Client/types';
import { useTranslation } from 'react-i18next';

interface Props {
  companyInfo: CompanyViewProps | undefined;
}

export const CompanyPayment = ({ companyInfo }: Props) => {
  const { t } = useTranslation();
  const details = [
    {
      label: t('ClientManagement.viewClientDetails.paymentName'),
      value: companyInfo?.company_payment?.name ?? '-',
    },
    // {
    //   label: t('ClientManagement.viewClientDetails.paymentDesc'),
    //   value: companyInfo?.company_payment?.description ?? '-',
    // },
    {
      label: t('ClientManagement.viewClientDetails.paymentMode'),
      value: companyInfo?.company_payment?.payment_mode ?? '-',
    },
    {
      label: t('ClientManagement.viewClientDetails.paymentDue'),
      value: companyInfo?.company_payment?.payment_due ?? '-',
    },
  ];

  return (
    <div
      className={`flex flex-col gap-y-8 ${
        companyInfo?.company_manager?.length
          ? 'border-b border-solid border-borderColor'
          : ''
      } pb-8 mb-8 last:mb-0 last:pb-0 last:border-none`}
    >
      {companyInfo?.company_payment && (
        <>
          <span className="text-lg block text-primary font-semibold">
            {t('ClientManagement.viewClientDetails.paymentTitle')}
          </span>
          <div className="w-full">
            <ul className="flex flex-wrap justify-between gap-y-8">
              {details?.map((detail, index) => (
                <CardDetails
                  key={`detail_${index + 1}`}
                  label={detail.label}
                  value={detail.value}
                  className="!justify-start !gap-3"
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
