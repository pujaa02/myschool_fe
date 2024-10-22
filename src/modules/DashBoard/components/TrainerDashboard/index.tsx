// ** components **
import { Tiles } from 'modules/DashBoard/components/Tiles';
import { Course } from '../Course';

// ** style **
import Button from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { useModal } from 'hooks/useModal';
import { useQueryGetFunction } from 'hooks/useQuery';
import 'modules/DashBoard/components/style/dashboard.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import CourseInvitation from '../CourseInvitation';

export type ITrainerDashboardData = {
  total_attendees: number;
  total_courses: number;
  total_exams: number;
  total_lessons: number;
};

const TrainerDashboard = () => {
  const { state } = useLocation();
  const connectionModal = useModal(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);
  const [trainerDashboardData, setTrainerDashboardData] =
    useState<ITrainerDashboardData>();

  const { response } = useQueryGetFunction(`/dashboard/trainer/${user?.username}`);
  const { response: todayCourse } = useQueryGetFunction(
    `/dashboard/trainer/today/${user?.username}`
  );
  useEffect(() => {
    if (response?.data) {
      setTrainerDashboardData(response?.data);
    }
  }, [response]);

  const handleConnection = (type: string) => {
    if (type === 'skip') {
      connectionModal?.closeModal();
      if (state) {
        state.isFirstTimeLogin = null;
        navigate('/', {
          replace: true,
          state: null,
        });
      }
    } else if (type === 'continue') {
      navigate('/account-settings');
      connectionModal?.closeModal();
      return true;
    }
  };

  return (
    <>
      <Tiles trainerDashboardData={trainerDashboardData} user={user} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 mb-7 last:mb-0">
        <CourseInvitation dashboard />
        <Course
          title={t('Dashboard.Trainer.Course.title')}
          courses={todayCourse?.data?.data}
        />
        {state !== null && (
          <Modal
            hideCloseIcon
            closeOnEscape={false}
            modal={connectionModal}
            width="max-w-[700px]"
            modalBodyClassName="relative min-h-[320px] flex"
            modalBodyInnerClassName="!max-h-full w-full"
          >
            <>
              <div className="absolute bottom-[30px] bg-left-bottom left-0 bg-welcomePopup bg-contain bg-no-repeat w-full h-[82%] pointer-events-none" />
              <div className="w-[50%] ml-auto flex flex-col justify-center h-full relative z-1">
                <h4 className="text-2xl font-semibold tracking-wide mb-4 text-primary">
                  {t('welcome')}
                </h4>
                <div className="mb-4">
                  {t('trainerSocialAccountRemainder.title')}
                </div>
                <div className="flex gap-4">
                  <Button
                    className="min-w-[110px]"
                    variants="whiteBordered"
                    onClickHandler={() => handleConnection('skip')}
                  >
                    {t('skip')}
                  </Button>
                  <Button
                    className="min-w-[110px]"
                    variants="primary"
                    onClickHandler={() => handleConnection('continue')}
                  >
                    {t('continue')}
                  </Button>
                </div>
              </div>
            </>
          </Modal>
        )}
      </div>
    </>
  );
};

export default TrainerDashboard;
