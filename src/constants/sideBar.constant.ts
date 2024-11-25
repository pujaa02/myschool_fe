// ** Component **
import { BasicPermissionTypes, MODULE_PERMISSION, ModuleNames } from './permisssion.constant';
import { PRIVATE_NAVIGATION } from './navigation.constant';
import { IconTypes } from 'components/Icon';

// ** Constant **

// import { IconTypeJson } from 'indexDB/indexdb.type';

interface SidebarInterface {
  id: string;
  label: string;
  link: string;
  children: Array<{ id: string; label: string; link: string }>;
  icon: IconTypes;
  // animationIcon: IconTypeJson;
  module?: ModuleNames;
  type?: BasicPermissionTypes;
}

export const SIDE_BAR: readonly SidebarInterface[] = Object.freeze([
  {
    id: 'dashboard',
    label: 'Dashboard',
    link: PRIVATE_NAVIGATION.dashboard.view,
    children: [],
    icon: 'dashboardFilledBlueIcon',
    // animationIcon: IconTypeJson.Dashboard,
  },
  {
    id: 'courses',
    label: 'Courses',
    link: PRIVATE_NAVIGATION.courses.view,
    children: [],
    icon: 'leadsFilledBlueIcon',
    ...MODULE_PERMISSION.COURSES.read,
  },
  {
    id: 'students',
    label: 'Students',
    link: PRIVATE_NAVIGATION.students.view,
    children: [],
    icon: 'dealsFilledBlueIcon',
    ...MODULE_PERMISSION.STUDENTS.read,
  },
  {
    id: 'teachers',
    label: 'Teachers',
    link: PRIVATE_NAVIGATION.teachers.view,
    children: [],
    icon: 'phoneFilled',
    ...MODULE_PERMISSION.TEACHERS.read,
  },
  {
    id: 'attendance',
    label: 'Attendance',
    link: PRIVATE_NAVIGATION.attendance.view,
    children: [],
    icon: 'accountFilledBlueIcon',
    ...MODULE_PERMISSION.ATTENDANCE.read,
  },
  {
    id: 'schedules',
    label: 'Schedules',
    link: PRIVATE_NAVIGATION.schedules.view,
    children: [],
    icon: 'activitiesFilledBlueIcon',
    ...MODULE_PERMISSION.SCHEDULE.read,
  },
  {
    id: 'activities',
    label: 'Activities',
    link: PRIVATE_NAVIGATION.activities.view,
    children: [],
    icon: 'activitiesFilledBlueIcon',
    ...MODULE_PERMISSION.ACTIVITY.read,
    // animationIcon: IconTypeJson.Activity,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    link: PRIVATE_NAVIGATION.calendar.view,
    children: [],
    module: ModuleNames.CALENDAR,
    icon: 'calendarFilledBlueIcon',
  },
  {
    id: 'exam',
    label: 'Exam',
    link: PRIVATE_NAVIGATION.exam.view,
    children: [],
    icon: 'emailFilledBlueIcon',
    ...MODULE_PERMISSION.EXAM.read,
  },
  {
    id: 'result',
    label: 'Results',
    link: PRIVATE_NAVIGATION.result.view,
    children: [],
    icon: 'streamFilledIcon',
    ...MODULE_PERMISSION.RESULT.read,
  },
  {
    id: 'committee',
    label: 'Committee',
    link: PRIVATE_NAVIGATION.committee.view,
    children: [],
    icon: 'settingFilled',
  },
  {
    id: 'sensation',
    label: 'Sensation',
    link: PRIVATE_NAVIGATION.sensation.view,
    children: [],
    icon: 'settingFilled',
  },
]);
