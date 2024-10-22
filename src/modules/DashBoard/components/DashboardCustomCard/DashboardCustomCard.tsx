import Button from 'components/Button/Button';
import Image from 'components/Image';
import NoDataFound from 'components/NoDataFound';
import StatusLabel from 'components/StatusLabel';
import { REACT_APP_API_BASE_URL } from 'config';

import 'modules/DashBoard/components/style/dashboard.css';
import { IDashboardCustomCardData } from 'modules/DashBoard/types';
import { useTranslation } from 'react-i18next';

type CoursePropsType = {
  courses?: IDashboardCustomCardData[];
  title?: string;
  subtitle?: string;
  countOfVisitors?: string;
};

export const DashboardCustomCard = ({
  courses,
  title,
  subtitle,
  countOfVisitors,
}: CoursePropsType) => {
  const { t } = useTranslation();

  const getStatus = (item: string) => {
    if (item.includes('days')) {
      const intNumber = item.split(' ')[0];
      if (Number(intNumber) > 7) {
        return 'completed';
      }
      return 'pending';
    }
    if (item.includes('%')) {
      const percentage = item.split('%')[0];
      if (Number(percentage) > 50) {
        return 'completed';
      }
      return 'pending';
    }
    return 'pending';
  };

  return (
    <div className="popular-courses-container">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl text-blacktheme font-semibold line-clamp-1">
            {title}
          </h2>
          {countOfVisitors ? (
            <p className="line-clamp-1">
              {t('Dashboard.courses.descriptionText1')}&nbsp;
              {countOfVisitors ?? 0}
              &nbsp;
              {t('Dashboard.courses.descriptionText2')}
            </p>
          ) : (
            <p className="line-clamp-3">{subtitle}</p>
          )}
        </div>
      </div>
      {courses && courses?.length > 0 ? (
        <div className="flex flex-col gap-4 mt-6 max-h-[320px] overflow-auto pe-2">
          {(courses as IDashboardCustomCardData[])?.map((courseData, index) => {
            return (
              <div className="flex items-center" key={`course_${index + 1}`}>
                <div className="w-[70px] h-[50px]">
                  <Image
                    src={
                      courseData?.image
                        ? `${REACT_APP_API_BASE_URL}/${courseData?.image}`
                        : '/images/no-image.png'
                    }
                    width={36}
                    height={36}
                    imgClassName="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="w-full max-w-[calc(100%_-_64px)] ps-4">
                  <div className="flex justify-between w-full ">
                    <div className="flex flex-col">
                      {courseData.trainer_name && (
                        <h3 className="text-lg text-blacktheme break-all font-semibold lg:line-clamp-none line-clamp-1 pr-3">
                          {courseData.trainer_name}
                          &nbsp; &nbsp;
                          <span className="   text-sm w-fit leading-4  px-2.5 py-1.5 inline-flex items-center justify-center rounded-md h-fit min-h-7 bg-green2/10 text-green2">
                            {courseData.type}
                          </span>
                        </h3>
                      )}
                      <h3
                        className={` text-blacktheme ${
                          courseData.trainer_name
                            ? 'text-lg'
                            : 'text-lg font-semibold'
                        } break-all lg:line-clamp-none line-clamp-1 pr-3`}
                      >
                        {courseData.title}
                      </h3>
                      {!courseData?.trainer_name ? (
                        <span className="text-sm">{courseData.category}</span>
                      ) : (
                        ''
                      )}
                    </div>
                    <Button className="shrink-0">
                      <StatusLabel
                        text={courseData.count}
                        variants={getStatus(String(courseData.count))}
                      />
                    </Button>
                    {/* <p className="text-blacktheme font-medium break-all lg:line-clamp-none line-clamp-1 min-w-20">
                      {courseData.count} &nbsp;
                    </p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
