// src/components/common/SearchBar.tsx
// Ô tìm kiếm có nút xóa nhanh khi có nội dung

import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Tìm kiếm…',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
      />
      {value.length > 0 ? (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => onChangeText('')}
          accessibilityLabel="Xóa tìm kiếm">
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  input: {
    flex: 1,
    height: 42,
    ...typography.body,
    color: colors.text,
  },
  clearBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: 'bold',
  },
});
