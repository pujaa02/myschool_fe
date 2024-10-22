import Button from 'components/Button/Button';
import Image from 'components/Image';
import { FilterBarChartEnum } from 'modules/DashBoard/Enum';
import { BarChart } from 'modules/DashBoard/components/Charts';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Reports = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Monthly');
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
  const getTabClass = (tab: string) =>
    activeTab === tab ? 'bg-primary text-white' : 'bg-inputbg';

  return (
    <div className="bg-white p-7 flex flex-col gap-4 rounded-3xl">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl text-blacktheme font-semibold line-clamp-1">
            {t('Dashboard.reports.title')}
          </h2>
          <p className="line-clamp-1">
            {activeTab}&nbsp;{t('Dashboard.reports.description')}
          </p>
        </div>
        <div className="gap-1 flex items-center">
          <Button
            className={`reports-tab-container ${getTabClass('Monthly')} `}
            onClickHandler={() => handleTabClick('Monthly')}
          >
            {t('Dashboard.reports.reportsTab1')}
          </Button>
          <Button
            className={`reports-tab-container ${getTabClass('Yearly')}`}
            onClickHandler={() => handleTabClick('Yearly')}
          >
            {t('Dashboard.reports.reportsTab2')}
          </Button>
          <Image iconName="dotsThreeFillSD" width={30} height={30} />
        </div>
      </div>
      {activeTab === FilterBarChartEnum.Monthly && (
        <div>
          <BarChart activeTab={activeTab} />
        </div>
      )}
      {activeTab === FilterBarChartEnum.Yearly && (
        <div>
          <BarChart activeTab={activeTab} />
        </div>
      )}
    </div>
  );
};
