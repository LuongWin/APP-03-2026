// src/components/profile/InfoRow.tsx
// Một dòng nhãn – giá trị hiển thị trong màn hình Cá nhân

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface InfoRowProps {
  label: string;
  value: string;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  label: {
    ...typography.body,
    color: colors.textMuted,
    flex: 1,
  },
  value: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'right',
    flex: 1.5,
  },
});
