// src/components/common/ScreenContainer.tsx
// Khung bọc tiêu chuẩn cho mọi màn hình, tự động hiển thị OfflineBanner khi mất mạng

import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OfflineBanner from './OfflineBanner';
import colors from '../../theme/colors';

interface ScreenContainerProps {
  children: ReactNode;
  scroll?: boolean;
}

export default function ScreenContainer({ children, scroll = false }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      {/* Tự động hiển thị thanh thông báo khi mất mạng */}
      <OfflineBanner />

      {scroll ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.container}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
