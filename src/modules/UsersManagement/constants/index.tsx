// import { CodeType } from 'modules/Codes/types';
// import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getRoles } from 'redux-toolkit/slices/rolePermissionSlice';
import { RoleFields, StatusFields } from 'types/common';

export const Fields = () => {
  // const { t } = useTranslation();

  const allRoles = useSelector(getRoles);
  const Role_Fields: RoleFields[] = allRoles.map((role) => {
    return {
      id: role.id,
      key: role.name,
      isChecked: false,
      title: role.name,
    };
  });

  const Status_Fields: StatusFields[] = [
    { id: 0, key: 'INACTIVE', title: 'Status.inactive', isChecked: false },
    { id: 1, key: 'ACTIVE', title: 'Status.active', isChecked: false },
  ];
  const isHead_Fields: StatusFields[] = [
    { id: 0, key: 'true', title: 'isHead.yes', isChecked: false },
    { id: 1, key: 'false', title: 'isHead.no', isChecked: false },
  ];
  // const isCourseCode_Fields: StatusFields[] = [
  //   {
  //     id: 0,
  //     key: CodeType.GENERAL,
  //     title: t('Header.notificationDropdown.generalTab'),
  //     isChecked: false,
  //   },
  //   { id: 1, key: CodeType.COURSE, title: t('ViewCourse.Title'), isChecked: false },
  // ];
  return {
    Role_Fields,
    Status_Fields,
    isHead_Fields,
    //  isCourseCode_Fields
  };
};

export enum CourseStatus {
  publish = 'Publish',
  draft = 'Draft',
}

export enum CourseType {
  Private = 'Private',
  Academy = 'Academy',
}
