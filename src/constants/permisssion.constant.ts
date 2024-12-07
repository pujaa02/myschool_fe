export enum BasicPermissionTypes {
  CREATE = 'create',
  UPDATE = 'update',
  READ = 'read',
  DELETE = 'delete',
}

export enum ModuleNames {
  ALL = 'all',
  USER = 'users',
  CALENDAR = 'calendar',
  ACTIVITY = 'activities',
  COURSES='courses',
  STUDENTS='students',
  TEACHERS='teachers',
  ATTENDANCE='attendance',
  SCHEDULE='schedules',
  EXAM='exams',
  RESULT='results',
  COMMITTEE='COMMITTIEE',
  SENSATION='sensation'
}


export const MODULE_PERMISSION = Object.freeze({
  ALL: {
    read: { module: ModuleNames.ALL, type: BasicPermissionTypes.READ },
    update: { module: ModuleNames.ALL, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.ALL, type: BasicPermissionTypes.DELETE },
  },
  COURSES: {
    read: { module: ModuleNames.COURSES, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.COURSES, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.COURSES, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.COURSES, type: BasicPermissionTypes.DELETE },
  },
  STUDENTS: {
    read: { module: ModuleNames.STUDENTS, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.STUDENTS, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.STUDENTS, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.STUDENTS, type: BasicPermissionTypes.DELETE },
  },
  TEACHERS: {
    read: { module: ModuleNames.TEACHERS, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.TEACHERS, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.TEACHERS, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.TEACHERS, type: BasicPermissionTypes.DELETE },
  },
  ATTENDANCE: {
    read: { module: ModuleNames.ATTENDANCE, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.ATTENDANCE, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.ATTENDANCE, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.ATTENDANCE, type: BasicPermissionTypes.DELETE },
  },
  ACTIVITY: {
    read: { module: ModuleNames.ACTIVITY, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.ACTIVITY, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.ACTIVITY, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.ACTIVITY, type: BasicPermissionTypes.DELETE },
  },
  SCHEDULE: {
    read: { module: ModuleNames.SCHEDULE, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.SCHEDULE, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.SCHEDULE, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.SCHEDULE, type: BasicPermissionTypes.DELETE },
  },
  EXAM: {
    read: { module: ModuleNames.EXAM, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.EXAM, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.EXAM, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.EXAM, type: BasicPermissionTypes.DELETE },
  },
  RESULT: {
    read: { module: ModuleNames.RESULT, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.RESULT, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.RESULT, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.RESULT, type: BasicPermissionTypes.DELETE },
  },
  USER: {
    read: { module: ModuleNames.USER, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.USER, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.USER, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.USER, type: BasicPermissionTypes.DELETE },
  },
  COMMITTEE:{
    read: { module: ModuleNames.COMMITTEE, type: BasicPermissionTypes.READ },
    create: { module: ModuleNames.COMMITTEE, type: BasicPermissionTypes.CREATE },
    update: { module: ModuleNames.COMMITTEE, type: BasicPermissionTypes.UPDATE },
    delete: { module: ModuleNames.COMMITTEE, type: BasicPermissionTypes.DELETE },
  }
});


export enum ActivityPermissions {
  CREATE = 'create',
  UPDATE = 'update',
  READ = 'read',
  DELETE = 'delete',
  ACTIVITY = 'activities',
}