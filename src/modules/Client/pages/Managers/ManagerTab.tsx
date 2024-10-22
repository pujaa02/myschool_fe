import TabComponent from 'components/Tabs';
import { useState } from 'react';
import ClientManagers from '.';

import { tabProps } from 'modules/Courses/pages/CourseViewDetail/types';
import { useTranslation } from 'react-i18next';

const ManagerTab = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const tabs: tabProps[] = [
    {
      uniqueKey: 'courseCategory',
      title: 'CoursesManagement.CourseCategory.courseCategory',
      component: <ClientManagers />,
      icon: 'bookIcon',
    },
    {
      uniqueKey: 'courseSubCategory',
      title: 'CoursesManagement.CourseCategory.courseSubCategory',
      component: <ClientManagers />,
      icon: 'bookIcon',
    },
  ];

  return (
    <div className="tab-wrapper">
      <TabComponent
        current={activeTab}
        onTabChange={(tabIndex) => setActiveTab(tabIndex)}
      >
        {tabs.map(({ title, component, icon, uniqueKey }, index) => (
          <TabComponent.Tab key={uniqueKey} title={t(title)} icon={icon}>
            {activeTab === index && component}
          </TabComponent.Tab>
        ))}
      </TabComponent>
    </div>
  );
};

export default ManagerTab;
