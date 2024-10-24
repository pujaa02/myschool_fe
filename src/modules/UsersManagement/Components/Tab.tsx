// import CustomCard from 'components/Card';
// import CourseFilters from 'components/CourseFilter/CourseFilters';
import PageHeader from 'components/PageHeader/PageHeader';
// import TabComponent from 'components/Tabs';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
// import { tabProps } from 'modules/Courses/pages/CourseViewDetail/types';
// import ProjectManagement from 'modules/ProjectManagement_module';
// import CoursePipeline from 'modules/ProjectManagement_module/CoursePipeline';
import { Fields } from 'modules/UsersManagement/constants';
import { User } from 'modules/UsersManagement/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { convertRoleToUrl } from 'utils';
// import DescriptionDetails from '../pages/descriptionDetails';

const UserTabList = () => {
  const [getUsersApi] = useAxiosGet();
  const location = useLocation();
  const match = location.pathname.match(/\/users\/([^/]+)\/([^/]+)/);
  const slug = match?.[2];
  const [user, setUser] = useState<User | null>(null);
  const { Role_Fields } = Fields();
  const currentRole = Role_Fields.find(
    (role) => convertRoleToUrl(role.key) === match?.[1]
  );

  const roleName = currentRole?.key || '';
  const getUser = async () => {
    const response = await getUsersApi(`/users/${slug}`, {
      params: {
        role: currentRole?.id,
      },
    });
    setUser(response?.data);
  };
  const backRoute = `${
    PRIVATE_NAVIGATION.usersManagement.view.roleView.path
  }${convertRoleToUrl(roleName)}`;
  useEffect(() => {
    getUser();
  }, [slug]);

  return (
    <>
      <div>
        <div className="flex justify-between gap-2 mb-5">
          <PageHeader small text={user?.full_name} url={backRoute} />
          <h1>hello</h1>
        </div>
      </div>
    </>
  );
};
export default UserTabList;
