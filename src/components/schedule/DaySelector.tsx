// src/components/schedule/DaySelector.tsx
// 7 nút chọn thứ từ Thứ 2 đến Chủ nhật

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const DAYS = [
  { label: 'Thứ 2', value: 2 },
  { label: 'Thứ 3', value: 3 },
  { label: 'Thứ 4', value: 4 },
  { label: 'Thứ 5', value: 5 },
  { label: 'Thứ 6', value: 6 },
  { label: 'Thứ 7', value: 7 },
  { label: 'CN', value: 8 },
];

interface DaySelectorProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export default function DaySelector({ selectedDay, onSelectDay }: DaySelectorProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {DAYS.map(d => {
          const isSelected = selectedDay === d.value;
          return (
            <TouchableOpacity
              key={d.value}
              style={[styles.btn, isSelected && styles.btnActive]}
              onPress={() => onSelectDay(d.value)}
              accessibilityLabel={`Chọn ${d.label}`}>
              <Text style={[styles.text, isSelected && styles.textActive]}>
                {d.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  btn: {
    minWidth: 44,
    minHeight: 36,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    ...typography.caption,
    color: colors.text,
  },
  textActive: {
    color: colors.card,
    fontWeight: 'bold',
  },
});
