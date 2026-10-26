// src/storage/keys.ts
// Định nghĩa các khóa lưu trữ trong AsyncStorage

export const STORAGE_KEYS = {
  STUDENT: 'cache:student',
  COURSES: 'cache:courses',
  SESSIONS: 'cache:sessions',
  ASSIGNMENTS: 'cache:assignments',
  GRADES: 'cache:grades',
  OUTBOX_QUEUE: 'outbox:queue',
};

export default STORAGE_KEYS;
