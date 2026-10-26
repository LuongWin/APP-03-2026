// src/components/grade/GradeRow.tsx
// Dòng hiển thị kết quả học tập của một môn học

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { Grade } from '../../context/AppDataContext';

interface GradeRowProps {
  grade: Grade;
  onPress?: () => void;
}

function GradeRow({ grade, onPress }: GradeRowProps) {
  const courseName = grade.course?.name || `Môn học #${grade.courseId}`;
  const credits = grade.course?.credits || 3;

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
      accessibilityLabel={`Điểm môn ${courseName}`}>
      <View style={styles.leftCol}>
        <Text style={styles.name}>{courseName}</Text>
        <Text style={styles.credits}>{credits} tín chỉ • Học kỳ: {grade.semester}</Text>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.letter}>{grade.letter}</Text>
        <Text style={styles.total}>{grade.total.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.md,
    marginBottom: spacing.xs,
    marginHorizontal: spacing.md,
  },
  leftCol: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 2,
  },
  credits: {
    ...typography.caption,
    color: colors.textMuted,
  },
  rightCol: {
    alignItems: 'flex-end',
    minWidth: 50,
  },
  letter: {
    ...typography.h2,
    color: colors.primary,
  },
  total: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default React.memo(GradeRow);
