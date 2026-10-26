// src/navigation/routes.ts
// Khai báo hằng số tên màn hình dùng chung, tránh viết chuỗi cứng khi navigate

export const ROUTES = {
  // Tabs
  HOME_TAB: 'HomeTab',
  COURSE_TAB: 'CourseTab',
  SCHEDULE_TAB: 'ScheduleTab',
  ASSIGNMENT_TAB: 'AssignmentTab',
  PROFILE_TAB: 'ProfileTab',

  // Screens
  HOME: 'HomeScreen',

  COURSE_LIST: 'CourseListScreen',
  COURSE_DETAIL: 'CourseDetailScreen',

  SCHEDULE: 'ScheduleScreen',
  SESSION_DETAIL: 'SessionDetailScreen',

  ASSIGNMENT_LIST: 'AssignmentListScreen',
  ASSIGNMENT_DETAIL: 'AssignmentDetailScreen',
  ASSIGNMENT_FORM: 'AssignmentFormScreen',

  PROFILE: 'ProfileScreen',
  EDIT_PROFILE: 'EditProfileScreen',
  GRADE_LIST: 'GradeListScreen',
  GRADE_DETAIL: 'GradeDetailScreen',
} as const;

export default ROUTES;
