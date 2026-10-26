// src/api/gradeService.ts
// Dịch vụ API cho kết quả học tập / điểm số

import { request } from './client';

export const gradeService = {
  getAll: () => request('GET', '/grades?_expand=course'),
  getById: (id: number | string) => request('GET', `/grades/${id}?_expand=course`),
};

export default gradeService;
