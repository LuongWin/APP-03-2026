// src/components/course/CourseCard.tsx
// Thẻ hiển thị tóm tắt môn học trong danh sách

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { Course } from '../../context/AppDataContext';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

function CourseCard({ course, onPress }: CourseCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={`Môn học ${course.name}`}>
      <View style={styles.topRow}>
        <Text style={styles.code}>{course.code}</Text>
        <Text style={styles.credits}>{course.credits} tín chỉ</Text>
      </View>
      <Text style={styles.name}>{course.name}</Text>
      <Text style={styles.lecturer}>Giảng viên: {course.lecturer}</Text>
      <Text style={styles.semester}>Học kỳ: {course.semester}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.md,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  code: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
  },
  credits: {
    ...typography.caption,
    color: colors.textMuted,
  },
  name: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  lecturer: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: 2,
  },
  semester: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default React.memo(CourseCard);
