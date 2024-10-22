import CustomCard from 'components/Card';
import PageHeader from 'components/PageHeader/PageHeader';
import TabComponent from 'components/Tabs';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { ManagerData } from 'modules/Client/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import CourseListing from './CourseListing';
import ViewDetails from './ViewDetails';
import { COURSE_TYPE } from 'modules/Courses/Constants';
import { tabProps } from 'modules/Courses/pages/CourseViewDetail/types';
import { currentPageCount } from 'redux-toolkit/slices/paginationSlice';
import { useDispatch } from 'react-redux';

const TabView = () => {
  const { t } = useTranslation();
  const [managerView, setManagerView] = useState<ManagerData>();
  const [clientGetApi] = useAxiosGet();
  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [managerId, setManagerId] = useState<number | undefined>();
  const [activeTab, setActiveTab] = useState(location.state.activeTab ?? 0);

  async function CallApi() {
    const response = await clientGetApi(`/managers/${slug}`, {
      params: {
        companyId: location.state.compayId,
        role: location.state.role,
      },
    });
    setManagerId(response?.data?.id);
    setManagerView(response?.data);
  }
  useEffect(() => {
    CallApi();
  }, []);

  const tabs: tabProps[] = [
    {
      uniqueKey: 'viewUserProfile',
      title: t('ClientManagers.clientTabs.managerInfo'),
      component: <ViewDetails data={managerView} />,
      icon: 'userProfile',
    },
    {
      uniqueKey: 'academyCourse',
      title: 'Academic Course',
      component: (
        <CourseListing
          managerId={managerId}
          companyId={location?.state?.companyId}
          activeTab={1}
          userSlug={slug}
          type={COURSE_TYPE.Academy}
        />
      ),
      icon: 'bookIcon',
    },
    {
      uniqueKey: 'privateCourse',
      title: 'Private Course',
      component: (
        <CourseListing
          managerId={managerId}
          companyId={location?.state?.companyId}
          activeTab={1}
          userSlug={slug}
          type={COURSE_TYPE.Private}
        />
      ),
      icon: 'bookIcon',
    },
  ];

  return (
    <>
      <PageHeader
        small
        text={managerView?.user?.full_name}
        url={PRIVATE_NAVIGATION.clientsManagement.managers.list.path}
      />
      <CustomCard minimal>
        <TabComponent
          current={activeTab}
          onTabChange={(status) => {
            dispatch(currentPageCount({ currentPage: 1 }));

            setActiveTab(status);
          }}
        >
          {tabs.map(({ title, component, icon }, index) => (
            <TabComponent.Tab key={`TAB_${index + 1}`} title={t(title)} icon={icon}>
              {activeTab === index && component}
            </TabComponent.Tab>
          ))}
        </TabComponent>
      </CustomCard>
    </>
  );
};

export default TabView;
