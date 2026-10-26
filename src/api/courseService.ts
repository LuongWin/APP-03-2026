// src/api/courseService.ts
// Dịch vụ API cho môn học

import { request } from './client';

export const courseService = {
  getAll: () => request('GET', '/courses'),
  getById: (id: number | string) => request('GET', `/courses/${id}`),
};

export default courseService;
