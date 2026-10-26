// src/hooks/useNetworkStatus.ts
// Hook theo dõi trạng thái kết nối mạng (Online / Offline)

import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export interface NetworkStatus {
  isOnline: boolean;
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Đăng ký lắng nghe sự kiện thay đổi mạng từ thiết bị
    const unsubscribe = NetInfo.addEventListener(state => {
      // isConnected = true và isInternetReachable !== false
      const online = Boolean(state.isConnected && state.isInternetReachable !== false);
      setIsOnline(online);
    });

    // Lấy trạng thái mạng ban đầu khi vừa mở app
    NetInfo.fetch().then(state => {
      const online = Boolean(state.isConnected && state.isInternetReachable !== false);
      setIsOnline(online);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { isOnline };
}

export default useNetworkStatus;
