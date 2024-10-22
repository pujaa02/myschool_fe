// ** components **
import { Tiles } from 'modules/DashBoard/components/Tiles';
// ** style **
import PageHeader from 'components/PageHeader/PageHeader';
import { getHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useModal } from 'hooks/useModal';
import { useQueryGetFunction } from 'hooks/useQuery';
import _ from 'lodash';
import 'modules/DashBoard/components/style/dashboard.css';
import { IPrivateIndividualDashboard } from 'modules/DashBoard/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { useCompany } from 'redux-toolkit/slices/companySlice';
import { ManagerCourses } from '../CompanyManagerDashboard/ManagerCourses';

const PrivateIndividualDashboard = () => {
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);
  const AccessModal = useModal();
  const ActiveCompany = useSelector(useCompany);

  const [privateIndividualDashboardData, setPrivateIndividualDashboardData] =
    useState<IPrivateIndividualDashboard>();
  const { response } = useQueryGetFunction(
    `/dashboard/privateIndividual/${user?.username}`
  );
  useEffect(() => {
    if (response?.data) {
      setPrivateIndividualDashboardData(response?.data);
    }
  }, [response]);

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
  useEffect(() => {
    if (_.isEmpty(ActiveCompany.company)) AccessModal.openModal();
  }, []);
  return (
    <section className="mt-5">
      <div className="container">
        <PageHeader text={`${getGreetingsMessage()} ${user?.first_name}`} />
        <Tiles
          privateIndividualDashboardData={privateIndividualDashboardData}
          user={user}
        />
        <hr className="border border-solid border-black/10 my-10" />
        <div className="">{user !== null && <ManagerCourses />}</div>
      </div>
    </section>
  );
};

export default PrivateIndividualDashboard;
