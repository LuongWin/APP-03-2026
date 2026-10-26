// src/context/AppDataContext.tsx
// Quản lý và chia sẻ dữ liệu toàn ứng dụng giữa 5 tab (Sinh viên, Môn học, Lịch học, Bài tập, Điểm)

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';
import { studentService } from '../api/studentService';
import { courseService } from '../api/courseService';
import { sessionService } from '../api/sessionService';
import { assignmentService } from '../api/assignmentService';
import { gradeService } from '../api/gradeService';
import { getCache, setCache } from '../storage/cache';
import { STORAGE_KEYS } from '../storage/keys';
import { enqueue, getAll as getOutboxList } from '../storage/outbox';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  description: string;
  semester: string;
}

export interface Session {
  id: number;
  courseId: number;
  dayOfWeek: number; // 2..8
  startTime: string;
  endTime: string;
  room: string;
  note: string;
  course?: Course;
}

export interface Assignment {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'todo' | 'done';
  updatedAt: string;
  course?: Course;
  isPendingSync?: boolean; // Đánh dấu chưa đồng bộ khi offline
}

export interface Grade {
  id: number;
  courseId: number;
  semester: string;
  attendance: number;
  midterm: number;
  final: number;
  total: number;
  letter: string;
  course?: Course;
}

export interface Student {
  id: number;
  studentCode: string;
  fullName: string;
  className: string;
  major: string;
  email: string;
  phone: string;
  updatedAt: string;
}

interface AppDataContextType {
  student: Student | null;
  courses: Course[];
  sessions: Session[];
  assignments: Assignment[];
  grades: Grade[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refreshAll: () => Promise<void>;
  toggleAssignmentStatus: (id: number) => Promise<void>;
  addAssignment: (newAsn: Omit<Assignment, 'id' | 'updatedAt'>) => Promise<boolean>;
  updateStudentInfo: (data: Partial<Student>) => Promise<boolean>;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOnline } = useNetworkStatus();

  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Đọc danh sách outbox để gắn cờ isPendingSync cho các bài tập chưa đồng bộ
  const applyOutboxFlags = useCallback(async (asnList: Assignment[]) => {
    const outboxList = await getOutboxList();
    const pendingIds = new Set(
      outboxList
        .filter(act => act.url.startsWith('/assignments'))
        .map(act => {
          if (act.method === 'PATCH' || act.method === 'PUT') {
            const parts = act.url.split('/');
            return Number(parts[parts.length - 1]);
          }
          if (act.method === 'POST') {
            return act.body?.id;
          }
          return null;
        })
        .filter(Boolean)
    );

    return asnList.map(item => ({
      ...item,
      isPendingSync: pendingIds.has(item.id),
    }));
  }, []);

  // Tải dữ liệu toàn bộ ứng dụng theo chiến lược: Cache trước, Mạng sau
  const loadAllData = useCallback(async () => {
    let hasAnyCache = false;

    // 1. Đọc từ cache ra trước
    try {
      const [cStu, cCour, cSess, cAsn, cGrd] = await Promise.all([
        getCache<Student>(STORAGE_KEYS.STUDENT),
        getCache<Course[]>(STORAGE_KEYS.COURSES),
        getCache<Session[]>(STORAGE_KEYS.SESSIONS),
        getCache<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS),
        getCache<Grade[]>(STORAGE_KEYS.GRADES),
      ]);

      if (cStu?.data) setStudent(cStu.data);
      if (cCour?.data) setCourses(cCour.data);
      if (cSess?.data) setSessions(cSess.data);
      if (cAsn?.data) {
        const flagged = await applyOutboxFlags(cAsn.data);
        setAssignments(flagged);
      }
      if (cGrd?.data) setGrades(cGrd.data);

      const latestSavedAt = cStu?.savedAt || cCour?.savedAt || cAsn?.savedAt;
      if (latestSavedAt) {
        setLastUpdated(latestSavedAt);
        hasAnyCache = true;
        setLoading(false);
      }
    } catch (e) {
      console.warn('Lỗi đọc cache ban đầu:', e);
    }

    // 2. Gọi API mạng để cập nhật mới nhất
    try {
      const [rStu, rCour, rSess, rAsn, rGrd] = await Promise.all([
        studentService.getStudent(1),
        courseService.getAll(),
        sessionService.getAll(),
        assignmentService.getAll(),
        gradeService.getAll(),
      ]);

      setStudent(rStu);
      setCourses(rCour);
      setSessions(rSess);
      setGrades(rGrd);

      const flaggedAsn = await applyOutboxFlags(rAsn);
      setAssignments(flaggedAsn);

      const now = new Date().toISOString();
      setLastUpdated(now);
      setError(null);

      // Lưu song song vào cache AsyncStorage
      await Promise.all([
        setCache(STORAGE_KEYS.STUDENT, rStu),
        setCache(STORAGE_KEYS.COURSES, rCour),
        setCache(STORAGE_KEYS.SESSIONS, rSess),
        setCache(STORAGE_KEYS.ASSIGNMENTS, rAsn),
        setCache(STORAGE_KEYS.GRADES, rGrd),
      ]);
    } catch (err: any) {
      console.warn('Lỗi tải dữ liệu từ API:', err.message || err);
      if (!hasAnyCache) {
        setError(err.message || 'Không thể kết nối đến máy chủ.');
      }
    } finally {
      setLoading(false);
    }
  }, [applyOutboxFlags]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Đổi trạng thái bài tập (Cập nhật lạc quan optimistic update + lưu outbox nếu offline)
  const toggleAssignmentStatus = async (id: number) => {
    const target = assignments.find(a => a.id === id);
    if (!target) return;

    const newStatus: 'todo' | 'done' = target.status === 'done' ? 'todo' : 'done';
    const nowIso = new Date().toISOString();

    // 1. Cập nhật giao diện ngay lập tức (Optimistic Update)
    const updatedList = assignments.map(a =>
      a.id === id
        ? {
            ...a,
            status: newStatus,
            updatedAt: nowIso,
            isPendingSync: !isOnline,
          }
        : a
    );
    setAssignments(updatedList);
    await setCache(STORAGE_KEYS.ASSIGNMENTS, updatedList);

    // 2. Gửi API hoặc xếp vào hàng đợi
    if (isOnline) {
      try {
        await assignmentService.update(id, { status: newStatus });
      } catch (err: any) {
        // Hoàn tác nếu lỗi
        setAssignments(assignments);
        await setCache(STORAGE_KEYS.ASSIGNMENTS, assignments);
        Alert.alert('Lỗi', 'Không thể cập nhật bài tập lên server.');
      }
    } else {
      // Khi offline: lưu vào hàng đợi outbox
      await enqueue({
        method: 'PATCH',
        url: `/assignments/${id}`,
        body: { status: newStatus, updatedAt: nowIso },
      });
    }
  };

  // Thêm bài tập mới (hỗ trợ cả online lẫn offline)
  const addAssignment = async (newAsn: Omit<Assignment, 'id' | 'updatedAt'>): Promise<boolean> => {
    const nowIso = new Date().toISOString();
    const tempId = Date.now(); // Tạo id tạm

    const courseObj = courses.find(c => c.id === newAsn.courseId);
    const itemToAdd: Assignment = {
      ...newAsn,
      id: tempId,
      updatedAt: nowIso,
      course: courseObj,
      isPendingSync: !isOnline,
    };

    // 1. Cập nhật lạc quan
    const updatedList = [itemToAdd, ...assignments];
    setAssignments(updatedList);
    await setCache(STORAGE_KEYS.ASSIGNMENTS, updatedList);

    // 2. Gửi API hoặc lưu Outbox
    if (isOnline) {
      try {
        const created = await assignmentService.create(newAsn);
        // Thay thế id tạm bằng id thật từ server
        const finalList = updatedList.map(a => (a.id === tempId ? { ...created, course: courseObj, isPendingSync: false } : a));
        setAssignments(finalList);
        await setCache(STORAGE_KEYS.ASSIGNMENTS, finalList);
        return true;
      } catch (err) {
        Alert.alert('Lỗi', 'Không thể tạo bài tập mới trên server.');
        return false;
      }
    } else {
      await enqueue({
        method: 'POST',
        url: '/assignments',
        body: { ...newAsn, id: tempId, updatedAt: nowIso },
      });
      return true;
    }
  };

  // Cập nhật thông tin sinh viên
  const updateStudentInfo = async (data: Partial<Student>): Promise<boolean> => {
    if (!student) return false;
    const nowIso = new Date().toISOString();

    const updatedStudent: Student = {
      ...student,
      ...data,
      updatedAt: nowIso,
    };

    // 1. Cập nhật giao diện ngay
    setStudent(updatedStudent);
    await setCache(STORAGE_KEYS.STUDENT, updatedStudent);

    // 2. Gửi API hoặc lưu Outbox
    if (isOnline) {
      try {
        await studentService.updateStudent(1, data);
        return true;
      } catch (err) {
        Alert.alert('Lỗi', 'Không thể lưu thông tin lên server.');
        return false;
      }
    } else {
      await enqueue({
        method: 'PATCH',
        url: '/students/1',
        body: { ...data, updatedAt: nowIso },
      });
      return true;
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        student,
        courses,
        sessions,
        assignments,
        grades,
        loading,
        error,
        lastUpdated,
        refreshAll: loadAllData,
        toggleAssignmentStatus,
        addAssignment,
        updateStudentInfo,
      }}>
      {children}
    </AppDataContext.Provider>
  );
};

export function useAppData(): AppDataContextType {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData phải được sử dụng bên trong AppDataProvider');
  }
  return context;
}

export default AppDataContext;
