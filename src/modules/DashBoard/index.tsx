import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

// ** components **
import { getCurrentUser, getUserRole } from 'redux-toolkit/slices/authSlice';

// ** style **
import PageHeader from 'components/PageHeader/PageHeader';
import { ROLES } from 'constants/roleAndPermission.constant';
import 'modules/DashBoard/components/style/dashboard.css';
import PrivateIndividualDashboard from './components/PrivateIndividualDashboard';

// ** react lazy components **
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const TrainerDashboard = React.lazy(() => import('./components/TrainerDashboard'));
const CompanyManagerDashboard = React.lazy(
  () => import('modules/DashBoard/components/CompanyManagerDashboard')
);

const Dashboard = () => {
  // const Clock = useModal();

  const { t } = useTranslation();
  // const [time, setTime] = useState('');
  const user = useSelector(getCurrentUser);
  const userRole = useSelector(getUserRole);

  const getGreetingsMessage = () => {
    const now = new Date();
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const zonedTime = utcToZonedTime(now, timeZone);

    const currentHour = getHours(zonedTime);

    let greetingMessage = '';

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = t('Dashboard.goodMorningTitle');
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingMessage = t('Dashboard.goodAfterNoonTitle');
    } else {
      greetingMessage = t('Dashboard.goodEveningTitle');
    }

    return greetingMessage;
  };

  const renderDashboard = (variant: string) => {
    switch (variant) {
      case ROLES.Admin:
        return <AdminDashboard />;
      case ROLES.Trainer:
        return <TrainerDashboard />;
      case ROLES.CompanyManager:
        return <CompanyManagerDashboard />;
      case ROLES.PrivateIndividual:
        return <PrivateIndividualDashboard />;
      case ROLES.TrainingSpecialist:
        return <AdminDashboard />;
      default:
        return <AdminDashboard />;
    }
  };
  return (
    <>
      {user?.role_name !== 'CompanyManager' &&
        user?.role_name !== 'PrivateIndividual' && (
          <PageHeader text={`${getGreetingsMessage()} ${user?.first_name ?? '-'}`} />
        )}

      {userRole && renderDashboard(userRole)}
    </>
  );
};

export default Dashboard;
