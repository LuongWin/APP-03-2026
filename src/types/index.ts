export interface Student {
  id: string;
  name: string;
  studentCode: string;
  className: string;
  major: string;
  email: string;
  phone: string;
  academicYear: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  emailLecturer: string;
  room: string;
  scheduleSummary: string;
  description: string;
}

export interface ScheduleItem {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  dayOfWeek: string; // 'Thứ Hai', 'Thứ Ba',...
  time: string; // '07:30 - 11:00'
  room: string;
  lecturer: string;
  note: string;
}

export interface Assignment {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  deadline: string; // '15/10/2026'
  isCompleted: boolean;
  description: string;
}

export interface GradeItem {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  attendanceScore: number; // Điểm chuyên cần (10%)
  midtermScore: number;    // Điểm giữa kỳ (40%)
  finalScore: number;      // Điểm cuối kỳ (50%)
  totalScore: number;      // Thang 10
  gpaScore: number;        // Thang 4
  letterGrade: string;     // 'A', 'B+',...
}

export type RootStackParamList = {
  MainTabs: undefined;
  SubjectDetail: { subject: Subject };
  ScheduleDetail: { schedule: ScheduleItem };
  AssignmentDetail: { assignment: Assignment };
  GradeDetail: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  SubjectsTab: undefined;
  ScheduleTab: undefined;
  AssignmentsTab: undefined;
  ProfileTab: undefined;
};
