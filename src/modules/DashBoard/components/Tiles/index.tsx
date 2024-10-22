import { DashboardCard } from 'components/DashboardCard';
import { ROLES } from 'constants/roleAndPermission.constant';
import 'modules/DashBoard/components/style/dashboard.css';
import {
  ICompanyManagerDashboard,
  IDashboard,
  IPrivateIndividualDashboard,
  TilesProps,
} from 'modules/DashBoard/types';
import { useTranslation } from 'react-i18next';
import { AuthUserType } from 'redux-toolkit/slices/authSlice';
import { customRandomNumberGenerator, formatCount } from 'utils';
import { ITrainerDashboardData } from '../TrainerDashboard';

type tilesProp = {
  dashboardData?: IDashboard;
  trainerDashboardData?: ITrainerDashboardData;
  managerDashBoardData?: ICompanyManagerDashboard;
  privateIndividualDashboardData?: IPrivateIndividualDashboard;
  user?: AuthUserType | null;
};
export const Tiles = ({
  dashboardData,
  trainerDashboardData,
  managerDashBoardData,
  privateIndividualDashboardData,
  user,
}: tilesProp) => {
  const { t } = useTranslation();

  const tileDataArray = () => {
    let tilesProps;

    switch (user?.role_name) {
      case ROLES.Trainer:
        tilesProps = [
          {
            title: `${t('companyManagerDashboard.totalCourses')}`,
            counts: formatCount(Number(trainerDashboardData?.total_courses ?? 0)),
            colorVariant: 'pink',
            iconName: 'pencilLineStrokeSD',
          },
          {
            title: `${t('totalLessons')}`,
            counts: formatCount(Number(trainerDashboardData?.total_lessons ?? 0)),
            colorVariant: 'green',
            iconName: 'bookmarkIcon2',
          },
          {
            title: `${t('companyManagerDashboard.totalAttendees')}`,
            counts: formatCount(Number(trainerDashboardData?.total_attendees ?? 0)),
            colorVariant: 'orange',
            iconName: 'userGroupIcon',
          },
          {
            title: `${t('totalExam')}`,
            counts: formatCount(Number(trainerDashboardData?.total_exams ?? 0)),
            colorVariant: 'blue',
            iconName: 'navTemplateManagementIcon',
          },
        ];
        break;

      case ROLES.CompanyManager:
        tilesProps = [
          {
            title: `${t('Dashboard.tiles.totalCourse')}`,
            counts: formatCount(Number(managerDashBoardData?.total_course ?? 0)),
            colorVariant: 'green',
            iconName: 'pencilLineStrokeSD',
          },
          {
            title: `${t('Dashboard.tiles.totalAttendee')}`,
            counts: formatCount(Number(managerDashBoardData?.total_attendees ?? 0)),
            colorVariant: 'orange',
            iconName: 'userRoundStrokeSD',
          },
          {
            title: `${t('Dashboard.tiles.totalActiveCourse')}`,
            counts: formatCount(Number(managerDashBoardData?.active_courses ?? 0)),
            colorVariant: 'purple',
            iconName: 'pencilLineStrokeSD',
          },
        ];
        break;

      case ROLES.PrivateIndividual:
        tilesProps = [
          {
            title: `${t('Dashboard.tiles.totalAcademyCourse')}`,
            counts: formatCount(
              Number(privateIndividualDashboardData?.total_academy_course ?? 0)
            ),
            colorVariant: 'green',
            iconName: 'pencilLineStrokeSD',
          },
          {
            title: `${t('Dashboard.tiles.totalEnrollCourse')}`,
            counts: formatCount(
              Number(privateIndividualDashboardData?.total_enrolled_course ?? 0)
            ),
            colorVariant: 'orange',
            iconName: 'pencilLineStrokeSD',
          },
          // {
          //   title: `${t('Dashboard.tiles.totalTrainer')}`,
          //   counts: formatCount(
          //     Number(privateIndividualDashboardData?.total_trainer ?? 0)
          //   ),
          //   colorVariant: 'purple',
          //   iconName: 'userRoundStrokeSD',
          // },
          // {
          //   title: `${t('Dashboard.tiles.totalUser')}`,
          //   counts: formatCount(
          //     Number(privateIndividualDashboardData?.total_user ?? 0)
          //   ),
          //   colorVariant: 'purple',
          //   iconName: 'userRoundStrokeSD',
          // },
        ];
        break;

      default:
        tilesProps = [
          {
            title: `${t('Dashboard.tiles.tileTitle1')}`,
            counts: formatCount(Number(dashboardData?.training_specialist ?? 0)),
            colorVariant: 'green',
            iconName: 'userRoundStrokeSD',
          },
          {
            title: `${t('Dashboard.tiles.tileTitle2')}`,
            counts: formatCount(Number(dashboardData?.trainer ?? 0)),
            colorVariant: 'orange',
            iconName: 'userRoundStrokeSD',
          },
          {
            title: `${t('Dashboard.tiles.tileTitle3')}`,
            counts: formatCount(Number(dashboardData?.courses ?? 0)),
            colorVariant: 'purple',
            iconName: 'pencilLineStrokeSD',
          },
          {
            title: `${t('Dashboard.tiles.tileTitle4')}`,
            counts: formatCount(Number(dashboardData?.users ?? 0)),
            colorVariant: 'blue',
            iconName: 'userGroupStrokeSD',
          },
        ];
    }

    return tilesProps as TilesProps[];
  };
  const tilesData: TilesProps[] = tileDataArray();
  return (
    <div
      className={`tiles-container ${
        ROLES.CompanyManager === user?.role_name ? '!gap-[1rem]' : ''
      }`}
    >
      {tilesData?.map((tileData) => (
        <DashboardCard
          key={customRandomNumberGenerator()}
          title={tileData.title}
          counts={tileData.counts}
          colorVariant={tileData.colorVariant}
          iconName={tileData.iconName}
        />
      ))}
    </div>
  );
};
