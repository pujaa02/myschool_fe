// ** components **
import CustomCard from 'components/Card';
import PageHeader from 'components/PageHeader/PageHeader';
import TabComponent from 'components/Tabs';
import ViewDetails from 'modules/Client/components/PrivateMembers/ViewDetails';
import CourseListing from 'modules/Client/components/PrivateMembers/CourseListing';

// ** constants **
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';

// ** hooks **
import { useAxiosGet } from 'hooks/useAxios';

// ** types **
import { PrivateMembersDetails } from 'modules/Client/types';

// ** imports **
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

const TabView = () => {
  const { t } = useTranslation();
  const [memberView, setMemberView] = useState<PrivateMembersDetails>();
  const [clientGetApi] = useAxiosGet();
  const { slug } = useParams();
  const location = useLocation()?.state;
  async function CallApi() {
    const response = await clientGetApi(
      `/private-individual/${slug}?role=${location?.role}`
    );
    setMemberView(response?.data);
  }
  useEffect(() => {
    CallApi();
  }, []);
  return (
    <>
      <PageHeader
        small
        text={memberView?.full_name ?? t('PrivateMembers.PrivateMembers')}
        url={PRIVATE_NAVIGATION.clientsManagement.members.list.path}
      />
      <CustomCard minimal>
        <TabComponent current={0}>
          <TabComponent.Tab
            title={t('ClientManagers.clientTabs.managerInfo')}
            icon="userProfile"
          >
            <ViewDetails data={memberView} />
          </TabComponent.Tab>
          <TabComponent.Tab
            title={t('ClientManagers.clientTabs.courseTitle')}
            icon="bookIcon"
          >
            {memberView?.id && (
              <CourseListing CompanyId={memberView?.id as string | undefined} />
            )}
          </TabComponent.Tab>
        </TabComponent>
      </CustomCard>
    </>
  );
};
export default TabView;
