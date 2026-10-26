// src/hooks/useOutboxSync.ts
// Hook tự động đồng bộ hàng đợi ngoại tuyến khi có mạng trở lại và xử lý xung đột

import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { getAll, remove, OutboxAction } from '../storage/outbox';
import { request } from '../api/client';
import { useNetworkStatus } from './useNetworkStatus';

export interface OutboxSyncResult {
  pendingCount: number;
  syncing: boolean;
  syncNow: () => Promise<void>;
  checkPending: () => Promise<number>;
}

export function useOutboxSync(onSyncSuccess?: () => void): OutboxSyncResult {
  const { isOnline } = useNetworkStatus();
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [syncing, setSyncing] = useState<boolean>(false);
  const prevOnlineRef = useRef<boolean>(isOnline);

  // Cập nhật số lượng thao tác đang chờ trong outbox
  const checkPending = useCallback(async (): Promise<number> => {
    const list = await getAll();
    setPendingCount(list.length);
    return list.length;
  }, []);

  useEffect(() => {
    checkPending();
  }, [checkPending]);

  // Hàm thực hiện gửi toàn bộ hàng đợi lên server
  const syncNow = useCallback(async () => {
    if (syncing) return;

    const actions = await getAll();
    if (actions.length === 0) {
      setPendingCount(0);
      return;
    }

    setSyncing(true);
    let successCount = 0;

    for (const act of actions) {
      try {
        // Xử lý xung đột (B5): Với thao tác sửa (PATCH / PUT), kiểm tra updatedAt trên server
        if ((act.method === 'PATCH' || act.method === 'PUT') && act.body?.updatedAt) {
          try {
            const serverItem = await request('GET', act.url);
            if (
              serverItem?.updatedAt &&
              new Date(serverItem.updatedAt).getTime() > new Date(act.body.updatedAt).getTime()
            ) {
              // Server mới hơn -> Ưu tiên server và báo cho người dùng
              Alert.alert(
                'Xung đột dữ liệu',
                `Dữ liệu trên server mới hơn thao tác offline của bạn (${act.url}). Hệ thống ưu tiên giữ dữ liệu trên server.`
              );
              await remove(act.id);
              continue;
            }
          } catch (checkErr) {
            // Không lấy được dữ liệu để so sánh thì bỏ qua bước kiểm tra xung đột
          }
        }

        // Gửi thao tác lên server
        await request(act.method, act.url, act.body);
        await remove(act.id);
        successCount++;
      } catch (err: any) {
        console.warn(`Lỗi khi đồng bộ thao tác ${act.id}:`, err.message || err);
        // Nếu lỗi thì giữ lại trong hàng đợi để thử lại sau
      }
    }

    const remaining = await checkPending();
    setSyncing(false);

    if (successCount > 0) {
      Alert.alert('Đồng bộ thành công', `Đã đồng bộ ${successCount} thay đổi.`);
      if (onSyncSuccess) {
        onSyncSuccess();
      }
    }
  }, [syncing, checkPending, onSyncSuccess]);

  // Tự động đồng bộ khi isOnline chuyển từ false sang true
  useEffect(() => {
    if (!prevOnlineRef.current && isOnline) {
      syncNow();
    }
    prevOnlineRef.current = isOnline;
  }, [isOnline, syncNow]);

  return {
    pendingCount,
    syncing,
    syncNow,
    checkPending,
  };
}

export default useOutboxSync;
