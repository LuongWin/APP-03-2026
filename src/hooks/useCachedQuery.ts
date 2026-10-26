// src/hooks/useCachedQuery.ts
// Hook thực hiện chiến lược "Cache trước, mạng sau" (Cache-first, Network-after)

import { useState, useEffect, useCallback } from 'react';
import { getCache, setCache } from '../storage/cache';

export interface CachedQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  lastUpdated: string | null;
  refresh: () => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export function useCachedQuery<T = any>(
  key: string,
  fetcher: () => Promise<T>
): CachedQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // 1. Hàm tải dữ liệu: đọc cache trước, sau đó gọi API để cập nhật mới
  const loadData = useCallback(async () => {
    let hasCachedData = false;

    // Bước A: Đọc từ cache AsyncStorage ra hiển thị ngay lập tức
    try {
      const cached = await getCache<T>(key);
      if (cached && cached.data !== null && cached.data !== undefined) {
        setData(cached.data);
        setLastUpdated(cached.savedAt);
        hasCachedData = true;
        setLoading(false); // Đã có dữ liệu từ cache nên tắt trạng thái loading ngay
      }
    } catch (err) {
      console.warn(`Lỗi đọc cache [${key}]:`, err);
    }

    // Bước B: Gọi API mạng để cập nhật dữ liệu mới nhất
    try {
      const apiData = await fetcher();
      setData(apiData);
      const now = new Date().toISOString();
      setLastUpdated(now);
      await setCache(key, apiData);
      setError(null);
    } catch (err: any) {
      console.warn(`Lỗi gọi API cho [${key}]:`, err.message || err);

      // Nếu chưa từng có cache (ví dụ mở app lần đầu mà json-server tắt) thì báo lỗi
      if (!hasCachedData) {
        setError(err.message || 'Không thể tải dữ liệu.');
      }
    } finally {
      setLoading(false);
    }
  }, [key, fetcher]);

  // 2. Chạy khi component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 3. Hàm làm mới khi người dùng kéo xuống (Pull-to-refresh)
  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const apiData = await fetcher();
      setData(apiData);
      const now = new Date().toISOString();
      setLastUpdated(now);
      await setCache(key, apiData);
      setError(null);
    } catch (err: any) {
      console.warn(`Lỗi khi kéo làm mới [${key}]:`, err.message || err);
    } finally {
      setRefreshing(false);
    }
  }, [key, fetcher]);

  return {
    data,
    loading,
    error,
    refreshing,
    lastUpdated,
    refresh,
    setData,
  };
}

export default useCachedQuery;
