// src/components/common/ErrorView.tsx
// Màn hình báo lỗi kèm nút Thử lại

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from './AppButton';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface ErrorViewProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorView({
  message = 'Đã có lỗi xảy ra. Vui lòng thử lại.',
  onRetry,
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>Không thể tải dữ liệu</Text>
      <Text style={styles.message}>{message}</Text>
      <AppButton title="Thử lại" onPress={onRetry} variant="outline" style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  icon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  message: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  btn: {
    minWidth: 140,
  },
});
