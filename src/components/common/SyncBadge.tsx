// src/components/common/SyncBadge.tsx
// Nhãn "Chưa đồng bộ" hiển thị khi thao tác được lưu trong outbox ngoại tuyến

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface SyncBadgeProps {
  pending?: boolean;
}

export default function SyncBadge({ pending = false }: SyncBadgeProps) {
  if (!pending) {
    return null;
  }

  return (
    <View style={styles.badge} accessibilityLabel="Mục này chưa đồng bộ với máy chủ">
      <Text style={styles.text}>⏳ Chưa đồng bộ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.warningBg,
    borderColor: colors.warningText,
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  text: {
    fontSize: 10,
    color: colors.warningText,
    fontWeight: 'bold',
  },
});
