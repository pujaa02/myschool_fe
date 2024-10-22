import Button from 'components/Button/Button';
import { CardDetails } from 'components/Card/CardDetails';
import Image from 'components/Image';
import 'modules/Client/styles/index.css';
import { CompanyManager, CompanyViewProps } from 'modules/Client/types';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ManagerDetails = ({
  companyInfo,
}: {
  companyInfo: CompanyViewProps | undefined;
}) => {
  const { t } = useTranslation();
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
  return (
    <div className="viewCard">
      {Array.isArray(companyInfo?.company_manager) &&
        companyInfo?.company_manager &&
        companyInfo?.company_manager?.length > 0 && (
          <span className="text-lg block text-primary font-semibold">
            {t('ClientManagement.viewClientDetails.managerDetailsTitle')}
          </span>
        )}
      <div className="w-full">
        <div className="flex flex-wrap justify-between gap-y-3.5 flex-col">
          {Array.isArray(companyInfo?.company_manager) &&
            companyInfo?.company_manager &&
            companyInfo?.company_manager?.length > 0 &&
            companyInfo?.company_manager?.map(
              (managerInfo: CompanyManager, index: number) =>
                managerInfo?.manager?.user && (
                  <div
                    className={`${
                      companyInfo?.company_manager &&
                      companyInfo?.company_manager.length > 1
                        ? 'transition py-3.5 px-4 rounded-xl bg-authBG/50'
                        : 'flex flex-wrap w-full'
                    }  `}
                    key={`option_${index + 1}`}
                  >
                    {companyInfo?.company_manager &&
                      companyInfo?.company_manager.length > 1 && (
                        <Button
                          className={`flex justify-between items-center w-full ${
                            openIndex === index ? 'mb-7' : ''
                          }`}
                          onClickHandler={() => handleOuterDivClick(index)}
                        >
                          <p className="text-lg leading-6 text-dark font-medium">
                            {managerInfo?.manager?.user?.full_name}
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
                      className={`flex flex-wrap  gap-x-8 gap-y-5 w-full transition-all ${
                        openIndex === index ? '' : 'hidden'
                      }`}
                    >
                      <CardDetails
                        label={t('ClientManagement.viewClientDetails.fullNameTitle')}
                        value={managerInfo?.manager?.user?.full_name}
                        className="!justify-start !gap-3 !items-start"
                      />
                      <CardDetails
                        label={t('ClientManagement.viewClientDetails.emailIdTitle')}
                        value={managerInfo?.manager?.user?.email}
                        className="!justify-start !gap-3 !items-start"
                      />

                      <CardDetails
                        label={t(
                          'ClientManagement.viewClientDetails.mobileNumberTitle'
                        )}
                        value={managerInfo?.manager?.user?.contact}
                        className="!justify-start !gap-3 !items-start"
                      />
                      <CardDetails
                        label={t('ClientManagement.viewClientDetails.jobTitle')}
                        value={managerInfo?.manager?.job_title}
                        className="!justify-start !gap-3 !items-start"
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
