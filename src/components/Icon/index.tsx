// =================== import packages ==================
import { SVGAttributes } from 'react';
// ======================================================
import { ReactComponent as Toggle3dotsIcon } from 'assets/images/icons/filled-icons/toggle3dots_icon.svg';
import { ReactComponent as PlusFilled } from 'assets/images/icons/filled-icons/plusFilledIcon.svg';
import { ReactComponent as PlusFilledWhiteBGIcon } from 'assets/images/icons/filled-icons/plusFilledWhiteBGIcon.svg';
import { ReactComponent as PlusFilledBlueIcon } from 'assets/images/icons/filled-icons/plusFilledBlueIcon.svg';
import { ReactComponent as CommentFilledBlueIcon } from 'assets/images/icons/filled-icons/commentFilledBlueIcon.svg';
import { ReactComponent as CalendarFilledBlueIcon } from 'assets/images/icons/filled-icons/calendarFilledBlueIcon.svg';
import { ReactComponent as AccountFilledBlueIcon } from 'assets/images/icons/filled-icons/accountFilledBlueIcon.svg';
import { ReactComponent as ActivitiesFilledBlueIcon } from 'assets/images/icons/filled-icons/activitiesFilledBlueIcon.svg';
import { ReactComponent as ContactFilledBlueIcon } from 'assets/images/icons/filled-icons/contactFilledBlueIcon.svg';
import { ReactComponent as DashboardFilledBlueIcon } from 'assets/images/icons/filled-icons/dashboardFilledBlueIcon.svg';
import { ReactComponent as DealsFilledBlueIcon } from 'assets/images/icons/filled-icons/dealsFilledBlueIcon.svg';
import { ReactComponent as EmailFilledBlueIcon } from 'assets/images/icons/filled-icons/emailFilledBlueIcon.svg';
import { ReactComponent as LeadsFilledBlueIcon } from 'assets/images/icons/filled-icons/leadsFilledBlueIcon.svg';
import { ReactComponent as LogoutFilledBlueIcon } from 'assets/images/icons/filled-icons/logoutFilledBlueIcon.svg';
import { ReactComponent as ProfileFilledBlueIcon } from 'assets/images/icons/filled-icons/profileFilledBlueIcon.svg';
import { ReactComponent as SearchFilledBlueIcon } from 'assets/images/icons/filled-icons/searchFilledBlueIcon.svg';
import { ReactComponent as SettingFilledBlueIcon } from 'assets/images/icons/filled-icons/settingFilledBlueIcon.svg';
import { ReactComponent as MinusFilledBlueIcon } from 'assets/images/icons/filled-icons/minusFilledBlueIcon.svg';
import { ReactComponent as PhoneFilledBlueIcon } from 'assets/images/icons/filled-icons/phoneFilledBlueIcon.svg';
import { ReactComponent as TeacherIcon } from 'assets/images/icons/filled-icons/teacherIcon.svg';
import { ReactComponent as StudentIcon } from 'assets/images/icons/filled-icons/studentIcon.svg';
import { ReactComponent as SignupBackArrowFilled } from 'assets/images/icons/filled-icons/signupBackArrowFilledIcon.svg';
import { ReactComponent as CloseBtnFilled } from 'assets/images/icons/filled-icons/closeBtnFilledIcon.svg';
import { ReactComponent as ResetFilledIcon } from 'assets/images/icons/filled-icons/resetFilledIcon.svg';
import { ReactComponent as SecurityFilled } from 'assets/images/icons/filled-icons/securityFilledIcon.svg';
import { ReactComponent as MailFilled } from 'assets/images/icons/filled-icons/mailFilledIcon.svg';
import { ReactComponent as ImageIconFilledPrimaryColor } from 'assets/images/icons/filled-icons/imageIconFilledPrimaryColor.svg';
// import { ReactComponent as AttendanceIcon } from 'assets/images/icons/filled-icons/attendance.svg';
// import { ReactComponent as SchedulesIcon } from 'assets/images/icons/filled-icons/schedules.svg';
// import { ReactComponent as ExamIcon } from 'assets/images/icons/filled-icons/exam.svg';
// import { ReactComponent as ResultsIcon } from 'assets/images/icons/filled-icons/results.svg';
// import { ReactComponent as SensationIcon } from 'assets/images/icons/filled-icons/sensation.svg';
import { ReactComponent as NotificationFilled } from 'assets/images/icons/filled-icons/notificationFilledIcon.svg';

export type IconTypes =
  | 'toggle3dotsIcon'
  | 'phoneFilled'
  | 'plusFilled'
  | 'plusFilledWhiteBGIcon'
  | 'plusFilledBlueIcon'
  | 'commentFilledBlueIcon'
  | 'calendarFilledBlueIcon'
  | 'accountFilledBlueIcon'
  | 'activitiesFilledBlueIcon'
  | 'contactFilledBlueIcon'
  | 'dashboardFilledBlueIcon'
  | 'dealsFilledBlueIcon'
  | 'emailFilledBlueIcon'
  | 'leadsFilledBlueIcon'
  | 'logoutFilledBlueIcon'
  | 'profileFilledBlueIcon'
  | 'searchFilledBlueIcon'
  | 'settingFilledBlueIcon'
  | 'minusFilledBlueIcon'
  | 'phoneFilledBlueIcon'
  | 'teacherIcon'
  | 'studentIcon'
  | 'signupBackArrowFilled'
  | 'closeBtnFilled'
  | 'resetFilledIcon'
  | 'securityFilled'
  | 'mailFilled'
  | 'imageIconFilledPrimaryColor'
  // |'attendanceIcon'
  // |'schedulesIcon'
  // |'examIcon'
  // |'resultsIcon'
  // |'sensationIcon'
  | 'notificationFilled';

interface IconProps extends SVGAttributes<SVGElement> {
  iconType: IconTypes;
  className?: string;
  onClick?: (..._args: any[]) => void;
  iIconStyle?: {
    backgroundColor: string;
  };
}

const Icon = ({
  iconType,
  className = '',
  iIconStyle,
  onClick,
  ...rest
}: IconProps) => {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'toggle3dotsIcon':
        return <Toggle3dotsIcon {...rest} />;
      case 'plusFilled':
        return <PlusFilled {...rest} />;
      case 'plusFilledWhiteBGIcon':
        return <PlusFilledWhiteBGIcon {...rest} />;
      case 'plusFilledBlueIcon':
        return <PlusFilledBlueIcon {...rest} />;
      case 'commentFilledBlueIcon':
        return <CommentFilledBlueIcon {...rest} />;
      case 'calendarFilledBlueIcon':
        return <CalendarFilledBlueIcon {...rest} />;
      case 'accountFilledBlueIcon':
        return <AccountFilledBlueIcon {...rest} />;
      case 'activitiesFilledBlueIcon':
        return <ActivitiesFilledBlueIcon {...rest} />;
      case 'contactFilledBlueIcon':
        return <ContactFilledBlueIcon {...rest} />;
      case 'dashboardFilledBlueIcon':
        return <DashboardFilledBlueIcon {...rest} />;
      case 'dealsFilledBlueIcon':
        return <DealsFilledBlueIcon {...rest} />;
      case 'emailFilledBlueIcon':
        return <EmailFilledBlueIcon {...rest} />;
      case 'leadsFilledBlueIcon':
        return <LeadsFilledBlueIcon {...rest} />;
      case 'logoutFilledBlueIcon':
        return <LogoutFilledBlueIcon {...rest} />;
      case 'profileFilledBlueIcon':
        return <ProfileFilledBlueIcon {...rest} />;
      case 'searchFilledBlueIcon':
        return <SearchFilledBlueIcon {...rest} />;
      case 'settingFilledBlueIcon':
        return <SettingFilledBlueIcon {...rest} />;
      case 'minusFilledBlueIcon':
        return <MinusFilledBlueIcon {...rest} />;
      case 'phoneFilledBlueIcon':
        return <PhoneFilledBlueIcon {...rest} />;
      case 'teacherIcon':
        return <TeacherIcon {...rest} />;
      case 'studentIcon':
        return <StudentIcon {...rest} />;
      case 'signupBackArrowFilled':
        return <SignupBackArrowFilled {...rest} />;
      case 'closeBtnFilled':
        return <CloseBtnFilled {...rest} />;
      case 'resetFilledIcon':
        return <ResetFilledIcon {...rest} />;
      case 'securityFilled':
        return <SecurityFilled {...rest} />;
      case 'mailFilled':
        return <MailFilled {...rest} />;
      case 'imageIconFilledPrimaryColor':
        return <ImageIconFilledPrimaryColor {...rest} />;
      //     case 'attendanceIcon':
      //   return <AttendanceIcon {...rest} />;
      // case 'schedulesIcon':
      //   return <SchedulesIcon {...rest} />;
      // case 'examIcon':
      //   return <ExamIcon {...rest} />;
      // case 'resultsIcon':
      //   return <ResultsIcon {...rest} />;
      // case 'sensationIcon':
      //   return <SensationIcon {...rest} />;
      case 'notificationFilled':
        return <NotificationFilled {...rest} />;
      default:
        return <> </>;
    }
  };

  return (
    <div
      style={iIconStyle}
      className={`i__Icon ${className}`}
      onClick={onClick}
    >
      <div>{renderIcon(iconType)}</div>
    </div>
  );
};

export default Icon;
