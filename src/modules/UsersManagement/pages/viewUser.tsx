import StatusLabel from '../../../components/StatusLabel';
import { REACT_APP_API_BASE_URL } from 'config';
import { useAxiosGet } from 'hooks/useAxios';
import { User } from 'modules/UsersManagement/types';
import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// import { Rating } from 'react-simple-star-rating';

interface UserInfoProps {
  user: User | null;
}
const UserInfo = ({ user }: UserInfoProps) => {
  // const { t } = useTranslation();
  const [trainerRating, setTrainerRating] = useState<{ rateAvg: string }>();
  const [getRating] = useAxiosGet();

  const getTrainerRating = async () => {
    const { data } = await getRating(
      `/trainer/survey-rating?trainer_id=${user?.id}`
    );
    if (data) setTrainerRating(data);
  };
  useEffect(() => {
    if (user?.id) getTrainerRating();
  }, [user?.id]);
  const statusRender = (item: string) => {
    const getStatusClass = () => {
      switch (item) {
        case `${'Status.active'?.toUpperCase()}`:
          return 'completed';
        case `${'Status.inactive'?.toUpperCase()}`:
          return 'cancelled';
        default:
          return 'pending';
      }
    };

    const statusClasses = ` ${getStatusClass()}`;

    return (
      <StatusLabel
        text={item}
        variants={getStatusClass()}
        className={`${statusClasses ?? ''}`}
      />
    );
  };

  const renderDetail = (label: string, value: string) => {
    return (
      <span className="flex gap-1 items-center w-full">
        <span className="text-sm leading-4 text-grayText max-w-[50%]">
          {label}
        </span>
        &nbsp;
        <span className="text-sm leading-5 text-dark font-medium">
          {label === 'Status' || label === 'Stato'
            ? statusRender(value)
            : value || '-'}
        </span>
      </span>
    );
  };

  const getText = (text: string) => {
    if (text) {
      return text.replace(/([A-Z])/g, ' $1');
    }
    return '';
  };
  const renderComp = (docs: { attachment_url: string }, index: number) => {
    const fileName = docs?.attachment_url.split('/');
    const extension = fileName[fileName.length - 1].split('.');
    return (
      <div
        key={`attachment_${index + 1}`}
        className="flex flex-wrap items-center mb-2"
      >
        <div className="h-auto min-h-[30px] w-16 flex items-center rounded-l-lg justify-center bg-gray-200 border border-solid border-gray-200 font-semibold text-[12px] text-gray-600">
          {extension[extension.length - 1]}
        </div>
        <div className="w-[calc(100%_-_64px)] px-4 rounded-r-lg  border border-solid border-gray-200 border-l-0 min-h-[30px] flex flex-col items-start justify-center">
          <p className="text-[12px] text-dark font-medium truncate">
            <Link
              to={`${REACT_APP_API_BASE_URL}/${docs?.attachment_url}`}
              target="_blank"
              className="w-24 h-16 overflow-hidden"
            >
              {`${fileName[fileName.length - 1]}`}
            </Link>
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-wrap ">
      <div className="w-full">
        {user && (
          // <ul className="flex flex-wrap justify-between gap-y-8">
          <ul>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
              {renderDetail(
                'UserManagement.addEditUser.fullName',
                user?.full_name
              )}
              {renderDetail('UserManagement.addEditUser.email', user?.email)}
              {renderDetail(
                'UserManagement.addEditUser.contact',
                user?.contact
              )}
              {renderDetail(
                'UserManagement.addEditUser.role',
                getText(user?.role?.name)
              )}
              {renderDetail(
                'UserManagement.addEditUser.status',
                user?.active === 'ACTIVE'
                  ? 'Status.active'?.toUpperCase()
                  : user?.active === 'INACTIVE'
                    ? 'Status.inactive'?.toUpperCase()
                    : ''
              )}
              {user.trainer && (
                <>
                  {renderDetail(
                    'UserManagement.addEditUser.hourlyRate',
                    `€${user.trainer.hourly_rate ?? 0}`
                  )}
                  {user.trainer?.travel_reimbursement_fee &&
                    renderDetail(
                      'UserManagement.addEditUser.travelReimbursement',
                      `€${user.trainer?.travel_reimbursement_fee}`
                    )}
                </>
              )}
            </div>

            <p className="text-base font-semibold mb-2 mt-6">Attachments</p>
            <div className="flex flex-wrap gap-x-5 gap-y-6">
              {user?.trainer?.trainerAttachment?.map((data, index) =>
                renderComp(data, index)
              )}
            </div>

            {trainerRating ? (
              <div>
                <span className="block w-full text-sm leading-4 text-grayText mb-2.5">
                  {'surveyRating'}
                </span>
                {/* <Rating
                  size={25}
                  initialValue={
                    Number.isNaN(Number(trainerRating?.rateAvg))
                      ? 0
                      : Number(trainerRating?.rateAvg)
                  }
                  transition
                  readonly
                  allowFraction
                  SVGstyle={{ display: 'inline' }}
                /> */}
              </div>
            ) : (
              ''
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
