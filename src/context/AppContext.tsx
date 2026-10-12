import React, { createContext, useContext, useState } from 'react';
import {
  Student,
  Subject,
  ScheduleItem,
  Assignment,
  GradeItem,
} from '../types';
import {
  initialStudent,
  initialSubjects,
  initialSchedules,
  initialAssignments,
  initialGrades,
} from '../data/mockData';

interface AppContextType {
  student: Student;
  updateStudent: (updated: Partial<Student>) => void;
  subjects: Subject[];
  schedules: ScheduleItem[];
  assignments: Assignment[];
  toggleAssignment: (id: string) => void;
  grades: GradeItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student>(initialStudent);
  const [subjects] = useState<Subject[]>(initialSubjects);
  const [schedules] = useState<ScheduleItem[]>(initialSchedules);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [grades] = useState<GradeItem[]>(initialGrades);

  const updateStudent = (updated: Partial<Student>) => {
    setStudent(prev => ({ ...prev, ...updated }));
  };

  const toggleAssignment = (id: string) => {
    setAssignments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        student,
        updateStudent,
        subjects,
        schedules,
        assignments,
        toggleAssignment,
        grades,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp phải được sử dụng bên trong AppProvider');
  }
  return context;
};
