// src/components/grade/GpaSummary.tsx
// Khung tóm tắt điểm GPA hệ 4.0 và tổng số tín chỉ tích lũy

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface GpaSummaryProps {
  gpa: number;
  totalCredits: number;
}

export default function GpaSummary({ gpa, totalCredits }: GpaSummaryProps) {
  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Text style={styles.value}>{gpa.toFixed(2)}</Text>
        <Text style={styles.label}>GPA (Thang 4.0)</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.value}>{totalCredits}</Text>
        <Text style={styles.label}>Tín chỉ tích lũy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: colors.borderLight,
    alignSelf: 'center',
  },
  value: {
    ...typography.h1,
    color: colors.primary,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
