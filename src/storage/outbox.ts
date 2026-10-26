// src/storage/outbox.ts
// Quản lý hàng đợi thao tác khi mất mạng (Outbox Queue)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './keys';

export interface OutboxAction {
  id: string;
  method: string;
  url: string;
  body?: any;
  createdAt: string;
}

/**
 * Lấy toàn bộ danh sách các thao tác đang chờ đồng bộ
 */
export async function getAll(): Promise<OutboxAction[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.OUTBOX_QUEUE);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Lỗi khi đọc hàng đợi outbox:', error);
    return [];
  }
}

/**
 * Thêm một thao tác vào hàng đợi ngoại tuyến
 */
export async function enqueue(action: Omit<OutboxAction, 'id' | 'createdAt'>): Promise<OutboxAction> {
  const currentList = await getAll();
  const newAction: OutboxAction = {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...action,
    createdAt: new Date().toISOString(),
  };

  currentList.push(newAction);
  await AsyncStorage.setItem(STORAGE_KEYS.OUTBOX_QUEUE, JSON.stringify(currentList));
  return newAction;
}

/**
 * Xóa một thao tác khỏi hàng đợi sau khi đã đồng bộ thành công lên server
 */
export async function remove(id: string): Promise<void> {
  const currentList = await getAll();
  const updatedList = currentList.filter(item => item.id !== id);
  await AsyncStorage.setItem(STORAGE_KEYS.OUTBOX_QUEUE, JSON.stringify(updatedList));
}

export default { getAll, enqueue, remove };
