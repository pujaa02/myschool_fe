import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_API_BASE_URL } from 'config';
import 'modules/Client/styles/index.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardDetails } from '../../../../components/Card/CardDetails';
import { ClientCompanyManager, CompanyManagerData } from './types';

interface Props {
  companyInfo: undefined | CompanyManagerData;
}

export const CompanyDetails = ({ companyInfo }: Props) => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleManagerClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    event.stopPropagation();
    setOpenIndex(index === openIndex ? -1 : index);
  };
  const handleOuterDivClick = (index: number) => {
    setOpenIndex(index);
  };
  function getValuePurchaseOrder(data: string) {
    if (data === 'true') {
      return t('confirmationChoices.yesOption');
    }
    return t('confirmationChoices.noOption');
  }
  const { t } = useTranslation();

  return (
    <div className="viewCard">
      {Array.isArray(companyInfo?.company_manager) &&
        companyInfo?.company_manager &&
        companyInfo?.company_manager?.length > 0 && (
          <span className="text-lg block text-primary font-semibold">
            {t('ClientManagement.viewClientDetails.companyDetailsTitle')}
          </span>
        )}
      <div className="w-full">
        <div className="flex flex-wrap justify-between gap-y-3.5 flex-col">
          {Array.isArray(companyInfo?.company_manager) &&
            companyInfo?.company_manager &&
            companyInfo?.company_manager?.length > 0 &&
            companyInfo?.company_manager?.map(
              (singleCompany: ClientCompanyManager, index: number) => (
                <div
                  key={`index_manager${index + 1}`}
                  className={`${
                    companyInfo?.company_manager &&
                    companyInfo?.company_manager.length > 0
                      ? 'transition py-3.5 px-4 rounded-xl bg-authBG/50'
                      : ''
                  }  `}
                >
                  {companyInfo?.company_manager &&
                    companyInfo?.company_manager.length > 0 && (
                      <Button
                        className={`flex justify-between items-center cursor-pointer ${
                          openIndex === index ? 'mb-10' : ''
                        }`}
                        onClickHandler={() => handleOuterDivClick(index)}
                      >
                        <p className="text-lg leading-6 text-dark font-medium">
                          {singleCompany?.company?.name}
                        </p>
                        <Button
                          className="w-7 h-7 cursor-pointer rounded-full border-2 p-1 border-solid border-primary text-primary"
                          onClickHandler={(event) =>
                            handleManagerClick(
                              event as unknown as React.MouseEvent<
                                HTMLDivElement,
                                MouseEvent
                              >,
                              index
                            )
                          }
                        >
                          <Image
                            iconName="chevronLeft"
                            iconClassName={`w-full h-full stroke-[3] ${
                              openIndex === index
                                ? 'rotate-90'
                                : '-rotate-90 translate-y-px'
                            }`}
                          />
                        </Button>
                      </Button>
                    )}
                  <div
                    className={`flex flex-wrap gap-x-8 gap-y-5 transition-all ${
                      openIndex === index ? '' : 'hidden'
                    }`}
                  >
                    <div className=" w-full h-[180px] overflow-hidden rounded-xl">
                      <Image
                        src={
                          singleCompany?.company?.logo
                            ? `${REACT_APP_API_BASE_URL}/${singleCompany?.company?.logo}`
                            : '/images/no-image.png'
                        }
                        imgClassName="w-full max-w-[180px] h-full object-cover !object-contain"
                        alt={t(
                          'ClientManagement.viewClientDetails.companyLogoAltText'
                        )}
                      />
                    </div>
                    <CardDetails
                      label={t('ClientManagement.viewClientDetails.sdiCodeTitle')}
                      value={singleCompany?.company?.sdi_code}
                      className="!justify-start !gap-3 !items-start"
                    />
                    <CardDetails
                      label={t(
                        'ClientManagement.viewClientDetails.registrationNumberTitle'
                      )}
                      value={singleCompany?.company?.registration_number}
                      className="!justify-start !gap-3 !items-start"
                    />

                    <CardDetails
                      label={t('ClientManagement.viewClientDetails.atecoCodeTitle')}
                      value={singleCompany?.company?.ateco_code}
                      className="!justify-start !gap-3 !items-start"
                    />

                    <CardDetails
                      label={t('ClientManagement.viewClientDetails.vatNumberTitle')}
                      value={singleCompany?.company?.vat_number}
                      className="!justify-start !gap-3 !items-start"
                    />

                    <CardDetails
                      label={t(
                        'ClientManagement.viewClientDetails.accountingEmailTitle'
                      )}
                      value={singleCompany?.company?.accounting_emails[0]?.email}
                      className="!justify-start !gap-3 !items-start"
                    />

                    <CardDetails
                      label={t(
                        'ClientManagement.viewClientDetails.companyinvoiceTitle'
                      )}
                      value={getValuePurchaseOrder(
                        String(singleCompany?.company?.is_invoice)
                      )}
                      className="!justify-start !gap-3 !items-start"
                      isInvoice
                    />

                    <CardDetails
                      className="!max-w-[unset] col-span-2 flex flex-col !items-start [&>.label]:-mt-4"
                      label={t('ClientManagement.viewClientDetails.address')}
                      value={singleCompany?.company?.address1}
                    />
                    <CardDetails
                      className="!max-w-[unset] col-span-2 flex flex-col !items-start [&>.label]:-mt-4"
                      label={t(
                        'ClientManagement.clientForm.fieldInfos.companyDescription'
                      )}
                      value={singleCompany?.company?.description ?? '-'}
                    />
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};
