// src/storage/cache.ts
// Quản lý bộ nhớ đệm (Cache) trên điện thoại bằng AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CacheItem<T = any> {
  data: T;
  savedAt: string; // Thời điểm lưu dưới dạng chuỗi ISO
}

/**
 * Lấy dữ liệu trong cache ra
 */
export async function getCache<T = any>(key: string): Promise<CacheItem<T> | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Lỗi khi đọc cache (${key}):`, error);
    return null;
  }
}

/**
 * Lưu dữ liệu mới vào cache kèm thời điểm lưu
 */
export async function setCache(key: string, data: any): Promise<void> {
  try {
    const item: CacheItem = {
      data,
      savedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Lỗi khi ghi cache (${key}):`, error);
  }
}

export default { getCache, setCache };
