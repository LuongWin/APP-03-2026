// src/components/common/FormInput.tsx
// Ô nhập liệu form kèm nhãn và thông báo lỗi

import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  multiline?: boolean;
}

export default function FormInput({
  label,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  placeholder,
  multiline = false,
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          Boolean(error) && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    minHeight: 40,
    ...typography.body,
    color: colors.text,
  },
  inputMultiline: {
    minHeight: 70,
    textAlignVertical: 'top',
    paddingVertical: spacing.xs,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: 2,
  },
});
