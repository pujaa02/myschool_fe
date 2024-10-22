import { ColorVariant } from 'components/DashboardCard';
import { IconTypes } from 'components/Icon/types';

export interface CourseDetails {
  image: string;
  title: string;
  courseCategory: {
    name: string;
  };
  start_date?: string | number | Date;
  end_date?: string | number | Date;
  price?: number;
  id?: string | number;
  slug: string;
  status: string;
}

export interface TilesProps {
  title: string;
  counts: string;
  colorVariant: ColorVariant;
  iconName: IconTypes;
}

export interface Courses {
  courseName?: string;
  numberOfLessons?: string;
  level?: string;
  iconName?: IconTypes;
  colorCombo?: string;
  type?: string;
}
export interface DashboardCourse {
  id: number;
  title: string;
  course_category: string;
  total_lessons: number;
  image: string;
}

export interface IDashboard {
  training_specialist: number;
  trainer: number;
  courses: number;
  users: number;
  popular_courses: DashboardCourse[];
  total_participants_top_five: number;
}

export type ICompanyManagerDashboard = {
  total_course: number;
  total_attendees: number;
  active_courses: number;
};

export type IPrivateIndividualDashboard = {
  total_academy_course: number;
  total_trainer: number;
  total_enrolled_course: number;
  total_user: number;
};

export type IBarChatProps = {
  activeTab?: string;
};

export type ITrainerFeesData = {
  courses: { title: string; image: string; courseCategory: { name: string } };
  id: number;
  assigned_to: number;
  lesson_session_id: number;
  course_id: number;
  course_bundle_id: number | null;
  assigned_to_status: string;
  trainer_assigned_to_status: string;
  lesson_id: number;
  reject_note: string | null;
  is_full_course: boolean;
  is_optional: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  assignedToUser: AssignedToUser;
};

interface AssignedToUser {
  first_name: string;
  last_name: string;
  profit?: number;
}

export type IDashboardCustomCardData = {
  title: string;
  count: string;
  category: string;
  image?: string;
  trainer_name?: string;
  type?: string;
};

export type ICertificates = {
  course: string;
  course_category: string;
  days: string;
  image: string;
};
