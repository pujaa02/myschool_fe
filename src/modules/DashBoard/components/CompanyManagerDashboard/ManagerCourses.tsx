import CourseCard from 'components/CourseCard';
import Image from 'components/Image';
import NoDataFound from 'components/NoDataFound';
import { REACT_APP_API_BASE_URL } from 'config';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { ROLES } from 'constants/roleAndPermission.constant';
import { format } from 'date-fns';
import { useQueryGetFunction } from 'hooks/useQuery';
import { CourseDetails } from 'modules/DashBoard/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { useCompany } from 'redux-toolkit/slices/companySlice';

export const ManagerCourses = () => {
  const { t } = useTranslation();
  const ActiveCompany = useSelector(useCompany);
  const user = useSelector(getCurrentUser);
  const apiUrl =
    user?.role_name === ROLES.CompanyManager
      ? `/managers/course/enrolled/${ActiveCompany?.company?.id}`
      : `/private-individual/course/enrolled/${user?.id}`;
  const { response: coursesResponse, isLoading: isCourseLoading } =
    useQueryGetFunction(apiUrl, {
      option: {
        ...(user?.role_name === ROLES.CompanyManager && { course_type: 'academy' }),
      },
    });
  const navigate = useNavigate();
  const renderContent = () => {
    if (
      Array.isArray(coursesResponse?.data?.data) &&
      coursesResponse?.data?.data.length > 0
    ) {
      return coursesResponse?.data?.data?.map((courseData: CourseDetails) => (
        <CourseCard
          parentClass="h-full flex flex-col"
          key={courseData.id}
          courseStatus={courseData?.status}
          imagesrc={`${REACT_APP_API_BASE_URL}/${courseData?.image}`}
          categories={courseData?.courseCategory?.name}
          title={courseData?.title}
          dateTime={`
            ${
              courseData.start_date &&
              format(new Date(courseData.start_date), 'dd/MM/yyyy')
            }- 
            ${
              courseData?.end_date &&
              format(new Date(courseData.end_date), 'dd/MM/yyyy')
            }`}
          coursePrice={`€${courseData?.price}`}
          participant={t('CompanyManager.perParticipantTitle')}
          onClick={() => {
            navigate(
              `${PRIVATE_NAVIGATION.companyManager.myCourses.list.path}/${courseData.slug}`,
              {
                state: { comingFromDashBoard: true },
              }
            );
          }}
        />
      ));
    }
  };
  return (
    <>
      <div className="mb-7">
        <h2 className="text-xl text-blacktheme font-semibold line-clamp-1">
          {t('Dashboard.managerCourses.title')}
        </h2>
      </div>

      {isCourseLoading && (
        <div className="flex justify-center">
          <Image loaderType="Spin" />
        </div>
      )}
      {!isCourseLoading && coursesResponse?.data?.data?.length === 0 && (
        <NoDataFound message={t('Table.noDataFound')} className="justify-between" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 1200:grid-cols-3 1600:grid-cols-4  gap-4">
        {renderContent()}
      </div>
    </>
  );
};
