// src/components/assignment/StatusToggle.tsx
// Nút chuyển đổi nhanh trạng thái bài tập: Chưa xong (todo) <-> Đã xong (done)

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface StatusToggleProps {
  status: 'todo' | 'done';
  onToggle: () => void;
}

export default function StatusToggle({ status, onToggle }: StatusToggleProps) {
  const isDone = status === 'done';

  return (
    <TouchableOpacity
      style={[styles.btn, isDone ? styles.btnDone : styles.btnTodo]}
      onPress={onToggle}
      activeOpacity={0.7}
      accessibilityLabel={isDone ? 'Đánh dấu chưa làm' : 'Đánh dấu đã nộp'}>
      <Text style={[styles.text, isDone ? styles.textDone : styles.textTodo]}>
        {isDone ? '✓ Đã xong' : '○ Chưa làm'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    minHeight: 36,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTodo: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  btnDone: {
    backgroundColor: colors.card,
    borderColor: colors.success,
  },
  text: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  textTodo: {
    color: colors.textMuted,
  },
  textDone: {
    color: colors.success,
  },
});
