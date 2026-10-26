// src/context/SyncContext.tsx
// Context quản lý trạng thái mạng và tiến trình đồng bộ outbox

import React, { createContext, useContext, ReactNode } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useOutboxSync } from '../hooks/useOutboxSync';

interface SyncContextType {
  isOnline: boolean;
  pendingCount: number;
  syncing: boolean;
  syncNow: () => Promise<void>;
  checkPending: () => Promise<number>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export const SyncProvider: React.FC<{ children: ReactNode; onSyncSuccess?: () => void }> = ({
  children,
  onSyncSuccess,
}) => {
  const { isOnline } = useNetworkStatus();
  const { pendingCount, syncing, syncNow, checkPending } = useOutboxSync(onSyncSuccess);

  return (
    <SyncContext.Provider
      value={{
        isOnline,
        pendingCount,
        syncing,
        syncNow,
        checkPending,
      }}>
      {children}
    </SyncContext.Provider>
  );
};

export function useSync(): SyncContextType {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync phải được sử dụng bên trong SyncProvider');
  }
  return context;
}

export default SyncContext;
