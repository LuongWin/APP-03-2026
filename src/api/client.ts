// src/api/client.ts
// Hàm gọi API dùng chung bằng fetch, có timeout 10 giây và chuẩn hóa mã lỗi

import { BASE_URL, TIMEOUT } from '../config';

export interface ApiError {
  type: 'network' | 'timeout' | 'http';
  status: number;
  message: string;
}

export async function request(method: string, url: string, body: any = null): Promise<any> {
  // Ghép BASE_URL nếu đường dẫn là tương đối (ví dụ /courses)
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  // Bộ hẹn giờ timeout 10 giây bằng AbortController
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, TIMEOUT);

  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(fullUrl, options);
    clearTimeout(timer);

    if (!response.ok) {
      const errorObj: ApiError = {
        type: 'http',
        status: response.status,
        message: `Lỗi máy chủ: HTTP ${response.status}`,
      };
      throw errorObj;
    }

    return await response.json();
  } catch (error: any) {
    clearTimeout(timer);

    // Nếu lỗi đã được chuẩn hóa ở trên thì ném ra tiếp
    if (error && error.type) {
      throw error;
    }

    // Nếu do hết giờ 10s
    if (error.name === 'AbortError') {
      const timeoutError: ApiError = {
        type: 'timeout',
        status: 408,
        message: 'Kết nối quá thời gian chờ (Timeout 10s).',
      };
      throw timeoutError;
    }

    // Lỗi mất mạng hoặc không kết nối được server
    const networkError: ApiError = {
      type: 'network',
      status: 0,
      message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra json-server.',
    };
    throw networkError;
  }
}

export default { request };
