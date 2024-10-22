// ** components **
import { Course } from 'modules/DashBoard/components/Course';
import { Reports } from 'modules/DashBoard/components/Reports';
import { Tiles } from 'modules/DashBoard/components/Tiles';

// ** type **
import {
  ICertificates,
  IDashboard,
  IDashboardCustomCardData,
  ITrainerFeesData,
} from 'modules/DashBoard/types';

// ** style **
import { ROLES } from 'constants/roleAndPermission.constant';
import { useQueryGetFunction } from 'hooks/useQuery';
import _ from 'lodash';
import 'modules/DashBoard/components/style/dashboard.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { formatCount } from 'utils';
import { DashboardCustomCard } from '../DashboardCustomCard/DashboardCustomCard';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);

  const [dashboardData, setDashboardData] = useState<IDashboard>();
  const [dashBoardCommonCard, setDashBoardCommonCard] = useState<{
    trainerFeesData: IDashboardCustomCardData[] | [];
    certificatesData: IDashboardCustomCardData[] | [];
    courseProposal: IDashboardCustomCardData[] | [];
  }>({
    trainerFeesData: [],
    certificatesData: [],
    courseProposal: [],
  });

  const { response } = useQueryGetFunction('/dashboard');
  const { response: trainerFees } = useQueryGetFunction('/dashboard/fee-issues');
  const { response: certificates } = useQueryGetFunction('/dashboard/certificates');
  const { response: courseProposalRes } = useQueryGetFunction(
    '/dashboard/course-proposals'
  );
  const checkIfOptionalOrMain = (item: ITrainerFeesData) => {
    if (item.is_full_course) {
      return item?.is_optional ? 'Optional' : 'Main';
    }
    return 'Session';
  };

  useEffect(() => {
    if (response?.data) {
      setDashboardData(response?.data);
    }

    // ** Handle-Trainer-Fees-Data **
    if (trainerFees?.data && !_.isEmpty(trainerFees?.data?.data)) {
      const trainerData = trainerFees?.data?.data?.map((data: ITrainerFeesData) => {
        return {
          title: data?.courses?.title,
          category: data?.courses?.courseCategory?.name,
          count: `${data?.assignedToUser?.profit || '0'} %`,
          image: data?.courses?.image,
          trainer_name: `${data?.assignedToUser?.first_name} ${data?.assignedToUser?.last_name}`,
          type: checkIfOptionalOrMain(data),
        };
      });
      setDashBoardCommonCard((prev) => {
        return { ...prev, trainerFeesData: trainerData ?? [] };
      });
    }
    // ** Handle-Trainer-Fees-Data **

    // ** Handle-Certificates-Data **
    if (!_.isEmpty(certificates?.data)) {
      const certificateDashBoard = certificates?.data?.map((data: ICertificates) => {
        return {
          title: data?.course,
          category: data?.course_category,
          count: data?.days,
          image: data?.image,
        };
      });
      setDashBoardCommonCard((prev) => {
        return { ...prev, certificatesData: certificateDashBoard ?? [] };
      });
    }
    // ** Handle-Certificates-Data **

    // ** Handle-CourseProposal-Data **
    if (!_.isEmpty(courseProposalRes?.data)) {
      const courseProposalDashBoard = courseProposalRes?.data?.map(
        (data: ICertificates) => {
          return {
            title: data?.course,
            category: data?.course_category,
            count: data?.days,
            image: data?.image,
          };
        }
      );
      setDashBoardCommonCard((prev) => {
        return { ...prev, courseProposal: courseProposalDashBoard ?? [] };
      });
    }
    // ** Handle-CourseProposal-Data **
  }, [response, trainerFees, certificates, courseProposalRes]);

  return (
    <>
      <Tiles dashboardData={dashboardData} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 mb-7 last:mb-0">
        <Course
          title={t('Dashboard.courses.title')}
          countOfVisitors={formatCount(
            Number(dashboardData?.total_participants_top_five)
          )}
          courses={dashboardData?.popular_courses}
        />
        {/* Reports */}
        <Reports />

        {ROLES.Admin === user?.role_name && (
          <>
            {/* Trainer Fees Card */}
            <DashboardCustomCard
              title={t('Dashboard.courses.trainerFeesTitle')}
              courses={dashBoardCommonCard.trainerFeesData}
            />
            {/* Certificates Card */}
            <DashboardCustomCard
              title={t('Dashboard.courses.certificateTitle')}
              courses={dashBoardCommonCard.certificatesData}
            />
            {/* Course Proposal Card */}
            <DashboardCustomCard
              title={t('Dashboard.courses.courseProposalTitle')}
              courses={dashBoardCommonCard.courseProposal}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
