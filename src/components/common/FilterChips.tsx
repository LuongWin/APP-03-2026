// src/components/common/FilterChips.tsx
// Danh sách bộ lọc cuộn ngang (chip) với chiều cao cố định, không bị co dãn

import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        style={styles.scroll}>
        {options.map(item => {
          const isSelected = selected === item.value;
          return (
            <TouchableOpacity
              key={item.value}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => onSelect(item.value)}
              accessibilityLabel={`Bộ lọc ${item.label}`}>
              <Text style={[styles.text, isSelected && styles.textActive]}>
                {item.label}
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
    height: 48,
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
  },
  scroll: {
    flexGrow: 0,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  chip: {
    height: 36,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
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
