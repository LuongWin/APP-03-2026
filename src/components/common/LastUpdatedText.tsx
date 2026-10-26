// src/components/common/LastUpdatedText.tsx
// Dòng thông tin thời điểm cập nhật dữ liệu gần nhất

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { formatDate } from '../../utils/date';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface LastUpdatedTextProps {
  timestamp?: string | null;
}

export default function LastUpdatedText({ timestamp }: LastUpdatedTextProps) {
  if (!timestamp) {
    return null;
  }

  const formatted = formatDate(timestamp);
  if (!formatted) {
    return null;
  }

  return (
    <Text style={styles.text}>
      Cập nhật lần cuối: {formatted}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    textAlign: 'center',
  },
});
