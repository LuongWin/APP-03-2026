// src/components/common/LoadingView.tsx
// Màn hình hiển thị biểu tượng xoay khi đang tải dữ liệu

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface LoadingViewProps {
  message?: string;
}

export default function LoadingView({ message = 'Đang tải…' }: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  message: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
