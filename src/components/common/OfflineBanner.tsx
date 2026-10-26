// src/components/common/OfflineBanner.tsx
// Thanh thông báo khi thiết bị mất mạng

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function OfflineBanner() {
  const { isOnline } = useNetworkStatus();

  // Khi có mạng thì không hiển thị gì cả
  if (isOnline) {
    return null;
  }

  return (
    <View style={styles.container} accessibilityLabel="Thông báo ngoại tuyến">
      <Text style={styles.text}>⚠️ Bạn đang offline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offline,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.caption,
    color: colors.card,
    fontWeight: 'bold',
  },
});
