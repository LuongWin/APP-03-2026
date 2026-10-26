// App.tsx
// Điểm khởi chạy ứng dụng: Cấu hình SafeAreaProvider, AppDataProvider, SyncProvider và AppNavigator

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppDataProvider, useAppData } from './src/context/AppDataContext';
import { SyncProvider } from './src/context/SyncContext';
import { AppNavigator } from './src/navigation/AppNavigator';

function MainApp() {
  const { refreshAll } = useAppData();

  return (
    <SyncProvider onSyncSuccess={refreshAll}>
      <AppNavigator />
    </SyncProvider>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <AppDataProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MainApp />
      </AppDataProvider>
    </SafeAreaProvider>
  );
}

export default App;
