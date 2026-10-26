// src/components/common/AppButton.tsx
// Nút bấm chuẩn dùng chung trong ứng dụng

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: AppButtonProps) {
  const isOutline = variant === 'outline';
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutline ? styles.buttonOutline : styles.buttonPrimary,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      accessibilityLabel={title}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isOutline ? colors.primary : colors.card}
        />
      ) : (
        <Text
          style={[
            styles.text,
            isOutline ? styles.textOutline : styles.textPrimary,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44, // Vùng bấm tối thiểu 44x44 theo quy định
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xs,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.body,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: colors.card,
  },
  textOutline: {
    color: colors.primary,
  },
});
