import { IconTypes } from 'components/Icon/types';
import Image from 'components/Image';
import 'modules/DashBoard/components/style/dashboard.css';
import { useTranslation } from 'react-i18next';

interface Courses {
  courseName: string;
  numberOfLessons: string;
  level: string;
  iconName: IconTypes;
  colorCombo?: string;
}

export const TrainerCourse = () => {
  const { t } = useTranslation();
  const popularCourses: Courses[] = [
    {
      courseName: 'Well-Being 101: Your Roadmap to Radiance',
      numberOfLessons: '18 lessons',
      level: 'Beginner',
      iconName: 'personHeadStrokeSD',
      colorCombo: 'bg-secondary/20 text-primary',
    },
    {
      courseName: 'Well-Being 101: Your Roadmap to Radiance',
      numberOfLessons: '18 lessons',
      level: 'Beginner',
      iconName: 'personHeadStrokeSD',
      colorCombo: 'bg-orange2/20 text-orange2',
    },
    {
      courseName: 'Well-Being 101: Your Roadmap to Radiance',
      numberOfLessons: '10 lessons',
      level: 'Beginner',
      iconName: 'personHeadStrokeSD',
      colorCombo: 'bg-ic_4/20 text-ic_4',
    },
    {
      courseName: 'Well-Being 101: Your Roadmap to Radiance',
      numberOfLessons: '28 lessons',
      level: 'Beginner',
      iconName: 'personHeadStrokeSD',
      colorCombo: 'bg-lightPurple/20 text-lightPurple',
    },
  ];

  return (
    <div className="popular-courses-container">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl text-blacktheme font-semibold line-clamp-1">
            {t('Dashboard.TrainerCourse.trainerCourseTitle')}
          </h2>
          <p>{t('Dashboard.TrainerCourse.courseDescription')}</p>
        </div>
        <div className="w-[30px] h-[30px] rounded bg-primary/5 text-primary flex items-center justify-center cursor-pointer">
          <Image iconName="threeDotVerticalIcon" width={30} height={30} />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {popularCourses.map((courseData, index) => (
          <div
            className="flex items-center mb-2 last:mb-0"
            key={`course_${index + 1}`}
          >
            {/* bg-secondary/10 text-secondary */}
            <div className={`w-14 h-14 p-4 rounded-md ${courseData.colorCombo}`}>
              <Image iconName={`${courseData.iconName}`} width={36} height={36} />
            </div>
            <div className="w-full max-w-[calc(100%_-_64px)] ps-4">
              <div className="flex justify-between w-full ">
                <h3 className="text-lg text-blacktheme font-semibold line-clamp-1">
                  {courseData.courseName}
                </h3>
              </div>
              <p>{courseData.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
