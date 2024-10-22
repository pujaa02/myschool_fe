import Image from 'components/Image';
import NoDataFound from 'components/NoDataFound';
import { REACT_APP_API_BASE_URL } from 'config';

import 'modules/DashBoard/components/style/dashboard.css';
import { Courses, DashboardCourse } from 'modules/DashBoard/types';
import { useTranslation } from 'react-i18next';

type CoursePropsType = {
  courses?: DashboardCourse[] | Courses[];
  title?: string;
  subtitle?: string;
  countOfVisitors?: string;
};

export const Course = ({
  courses,
  title,
  subtitle,
  countOfVisitors,
}: CoursePropsType) => {
  const { t } = useTranslation();
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
          {(courses as DashboardCourse[])?.map((courseData, index) => {
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
                    <h3 className="text-lg text-blacktheme font-semibold break-all lg:line-clamp-none line-clamp-1 pr-3">
                      {courseData.title}
                    </h3>
                    <p className=" text-blacktheme font-medium break-all lg:line-clamp-none line-clamp-1 min-w-20">
                      {courseData.total_lessons} &nbsp; {t('CourseBundle.lesson')}
                    </p>
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
