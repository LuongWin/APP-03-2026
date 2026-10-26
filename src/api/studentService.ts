// src/api/studentService.ts
// Dịch vụ API cho thông tin sinh viên

import { request } from './client';

export const studentService = {
  getStudent: (id: number = 1) => request('GET', `/students/${id}`),
  updateStudent: (id: number = 1, data: any) =>
    request('PATCH', `/students/${id}`, {
      ...data,
      updatedAt: new Date().toISOString(),
    }),
};

export default studentService;
