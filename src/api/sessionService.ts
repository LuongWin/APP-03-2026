// src/api/sessionService.ts
// Dịch vụ API cho thời khóa biểu

import { request } from './client';

export const sessionService = {
  getAll: () => request('GET', '/sessions?_expand=course'),
  getById: (id: number | string) => request('GET', `/sessions/${id}?_expand=course`),
};

export default sessionService;
