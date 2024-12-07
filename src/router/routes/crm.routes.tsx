import React from 'react';
import {
  PRIVATE_NAVIGATION,
  PUBLIC_NAVIGATION,
} from 'constants/navigation.constant';
import { RouteAttribute } from 'router/RouteComponent';

const Login = React.lazy(() => import('../../modules/Auth/pages/Login/index'));

const NotAuthorized = React.lazy(
  () => import('../../modules/Auth/pages/NotAuthorized')
);

// ** Dashboard Routes
const Dashboard = React.lazy(() => import('../../modules/DashBoard'));

// ** Courses Routes
const Courses = React.lazy(() => import('../../modules/Courses'));

// ** Students Routes
const Students= React.lazy(() => import('../../modules/Students'));

// ** Teachers Routes
const Teachers= React.lazy(() => import('../../modules/Teachers'));

// ** Attendance Routes
const Attendance= React.lazy(() => import('../../modules/Attendance'));

// ** Schedules Routes
const Schedules= React.lazy(() => import('../../modules/Schedules'));

// ** Activities Routes
const Activities= React.lazy(() => import('../../modules/Activities'));

// ** Calendar Routes
const Calendar= React.lazy(() => import('../../modules/Calendar'));

// ** Exam Routes
const Exam= React.lazy(() => import('../../modules/Exam'));

// ** Results Routes
const Results= React.lazy(() => import('../../modules/Results'));

// ** Committee Routes
const Committee= React.lazy(() => import('../../modules/Committee'));

// ** Sensation Routes
const Sensation= React.lazy(() => import('../../modules/Sensation'));

// ** Settings Routes
const Settings= React.lazy(() => import('../../modules/Settings'));

export const publicRoutes = [
  { path: PUBLIC_NAVIGATION.login, component: <Login /> },

  // { path: PUBLIC_NAVIGATION.register, component: <Register /> },
  // { path: PUBLIC_NAVIGATION.forgotPassword, component: <ForgotPassword /> },
];

export const generalRoutes = [
  { path: PUBLIC_NAVIGATION.notAuthorized, component: <NotAuthorized /> },
];
// ** For Authenticated user access **
export const privateRoutes: RouteAttribute[] = [
  {
    path: PRIVATE_NAVIGATION.dashboard.view,
    name: `Dashboard`,
    component: <Dashboard />,
  },
  {
    path: PRIVATE_NAVIGATION.courses.view,
    name: `Courses`,
    component: <Courses />,
  },
  {
    path: PRIVATE_NAVIGATION.students.view,
    name: `Students`,
    component: <Students />,
  },
  {
    path: PRIVATE_NAVIGATION.teachers.view,
    name: `Teachers`,
    component: <Teachers />,
  },
  {
    path: PRIVATE_NAVIGATION.attendance.view,
    name: `Attendance`,
    component: <Attendance />,
  },
  {
    path: PRIVATE_NAVIGATION.schedules.view,
    name: `Schedules`,
    component: <Schedules />,
  },
  {
    path: PRIVATE_NAVIGATION.activities.view,
    name: `Activities`,
    component: <Activities />,
  },
  {
    path: PRIVATE_NAVIGATION.calendar.view,
    name: `Calendar`,
    component: <Calendar />,
  },
  {
    path: PRIVATE_NAVIGATION.exam.view,
    name: `Exam`,
    component: <Exam />,
  },
  {
    path: PRIVATE_NAVIGATION.result.view,
    name: `Results`,
    component: <Results />,
  },
  {
    path: PRIVATE_NAVIGATION.committee.view,
    name: `Committee`,
    component: <Committee />,
  },
  {
    path: PRIVATE_NAVIGATION.sensation.view,
    name: `Sensation`,
    component: <Sensation />,
  },
  {
    path: PRIVATE_NAVIGATION.settings.view,
    name: `Settings`,
    component: <Settings />,
  },
];
