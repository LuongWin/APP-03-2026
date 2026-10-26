// src/api/assignmentService.ts
// Dịch vụ API cho bài tập (Lấy danh sách, thêm mới, sửa trạng thái)

import { request } from './client';

export const assignmentService = {
  getAll: () => request('GET', '/assignments?_expand=course&_sort=dueDate'),
  getById: (id: number | string) => request('GET', `/assignments/${id}?_expand=course`),
  create: (data: any) =>
    request('POST', '/assignments', {
      ...data,
      updatedAt: new Date().toISOString(),
    }),
  update: (id: number | string, data: any) =>
    request('PATCH', `/assignments/${id}`, {
      ...data,
      updatedAt: new Date().toISOString(),
    }),
};

export default assignmentService;
