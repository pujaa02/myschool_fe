import { CardDetails } from 'components/Card/CardDetails';
import { CompanyViewProps } from 'modules/Client/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  getCitiesJson,
  getCountriesJson,
  getStateJson,
} from 'redux-toolkit/slices/countryJsonSlice';
import { convertLocationIdToName } from 'utils';

interface Props {
  companyInfo: CompanyViewProps | undefined;
}

export const CompanyDetails = ({ companyInfo }: Props) => {
  const countries = useSelector(getCountriesJson);
  const states = useSelector(getStateJson);
  const cities = useSelector(getCitiesJson);

  function getValuePurchaseOrder(data: string) {
    if (data === 'true') {
      return t('confirmationChoices.yesOption');
    }
    return t('confirmationChoices.noOption');
  }
  const { t } = useTranslation();
  const {
    name = '',
    sdi_code = '',
    registration_number = '',
    ateco_code = '',
    vat_number = '',
    accounting_emails = '',
    address1 = '',
    address2 = '',
    zip = '',
    is_invoice = '',
    country = '',
    city = '',
    sales_rep,
  } = companyInfo || {};
  const details = [
    {
      label: t('ClientManagement.viewClientDetails.companyNameTitle'),
      value: name,
    },
    {
      label: t('ClientManagement.viewClientDetails.sdiCodeTitle'),
      value: sdi_code,
    },
    {
      label: t('ClientManagement.viewClientDetails.registrationNumberTitle'),
      value: registration_number,
    },
    {
      label: t('ClientManagement.viewClientDetails.atecoCodeTitle'),
      value: ateco_code,
    },
    {
      label: t('ClientManagement.viewClientDetails.vatNumberTitle'),
      value: vat_number,
    },
    {
      label: t('ClientManagement.viewClientDetails.accountingEmailTitle'),
      value:
        accounting_emails && accounting_emails.length > 0
          ? accounting_emails?.map((item) => item.email).join(', ')
          : '-',
    },
    {
      label: t('UserProfile.viewProfile.addressLabel'),
      value: address1,
    },
    {
      label: t('UserProfile.viewProfile.address2Label'),
      value: address2,
    },
    {
      label: t('UserProfile.viewProfile.countryLabel'),
      value:
        (country &&
          convertLocationIdToName('country', country, countries, states, cities)) ??
        '-',
    },
    {
      label: t('UserProfile.viewProfile.cityLabel'),
      value:
        (city && convertLocationIdToName('city', city, countries, states, cities)) ??
        '-',
    },
    {
      label: t('Auth.RegisterCompany.zipcode'),
      value: zip,
    },
    {
      label: t('ClientManagement.viewClientDetails.companyinvoiceTitle'),
      value: getValuePurchaseOrder(String(is_invoice)),
      isInvoice: true,
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
      <span className="text-lg block text-primary font-semibold">
        {t('ClientManagement.viewClientDetails.companyDetailsTitle')}
      </span>
      <div className="w-full">
        <ul className="flex flex-wrap justify-between gap-y-8">
          {details?.map((detail, index) => (
            <CardDetails
              key={`detail_${index + 1}`}
              label={detail.label}
              value={detail.value}
              isInvoice={detail?.isInvoice}
              className="!justify-start !gap-2"
            />
          ))}
        </ul>
        {sales_rep ? (
          <div className="flex flex-col gap-y-8 last:mb-0 last:pb-0 last:border-none">
            <span className="mt-8 text-lg block text-primary font-semibold">
              {t('ClientManagement.viewClientDetails.salesRepTitle')}
            </span>
            <div className="flex flex-wrap justify-between gap-y-8">
              <CardDetails
                label={t('ClientManagement.viewClientDetails.salesRepFullName')}
                value={companyInfo?.sales_rep?.full_name}
              />
              <CardDetails
                label={t('ClientManagement.viewClientDetails.salesRepEmail')}
                value={companyInfo?.sales_rep?.email}
              />
              <CardDetails
                label={t('ClientManagement.viewClientDetails.salesRepContact')}
                value={companyInfo?.sales_rep?.contact}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
