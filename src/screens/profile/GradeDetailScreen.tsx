// src/screens/profile/GradeDetailScreen.tsx
// Màn hình Chi tiết bảng điểm của một môn học

import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import AppButton from '../../components/common/AppButton';
import { useAppData } from '../../context/AppDataContext';
import { toScale4 } from '../../utils/gpa';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function GradeDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params || {};

  const { grades, courses } = useAppData();
  const grade = grades.find(g => g.id === Number(id));
  const course = courses.find(c => c.id === grade?.courseId) || grade?.course;

  useLayoutEffect(() => {
    if (course) {
      navigation.setOptions({ title: course.name });
    }
  }, [navigation, course]);

  if (!grade) {
    return (
      <ScreenContainer>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Không tìm thấy thông tin điểm của môn học này.</Text>
          <AppButton title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
      </ScreenContainer>
    );
  }

  const { gpaScore, letter } = toScale4(grade.total);
  const isPassed = letter !== 'F';

  return (
    <ScreenContainer scroll>
      <View style={styles.card}>
        <Text style={styles.courseCode}>{course?.code || `MÃ #${grade.courseId}`}</Text>
        <Text style={styles.courseName}>{course?.name || 'Môn học'}</Text>
        <Text style={styles.courseSub}>
          Số tín chỉ: {course?.credits || 3} • Học kỳ: {grade.semester}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>CHI TIẾT ĐIỂM THÀNH PHẦN</Text>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Chuyên cần (10%):</Text>
          <Text style={styles.scoreValue}>{grade.attendance.toFixed(1)}</Text>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Kiểm tra giữa kỳ (40%):</Text>
          <Text style={styles.scoreValue}>{grade.midterm.toFixed(1)}</Text>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Thi kết thúc học phần (50%):</Text>
          <Text style={styles.scoreValue}>{grade.final.toFixed(1)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.scoreRow}>
          <Text style={styles.totalLabel}>Tổng kết hệ 10:</Text>
          <Text style={styles.totalValue}>{grade.total.toFixed(1)}</Text>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.totalLabel}>Điểm hệ 4.0:</Text>
          <Text style={styles.totalValue}>{gpaScore.toFixed(1)}</Text>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.totalLabel}>Điểm chữ:</Text>
          <Text style={[styles.letterValue, !isPassed && styles.failedLetter]}>
            {letter}
          </Text>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Kết quả:</Text>
          <Text style={[styles.resultText, isPassed ? styles.passText : styles.failText]}>
            {isPassed ? 'ĐẠT (Qua môn)' : 'KHÔNG ĐẠT (Phải học lại)'}
          </Text>
        </View>
      </View>

      <View style={styles.btnBox}>
        <AppButton
          title="Quay lại danh sách điểm"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.md,
    margin: spacing.md,
    marginBottom: spacing.xs,
  },
  courseCode: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
  },
  courseName: {
    ...typography.h2,
    color: colors.text,
    marginVertical: 4,
  },
  courseSub: {
    ...typography.body,
    color: colors.textMuted,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  scoreLabel: {
    ...typography.body,
    color: colors.text,
  },
  scoreValue: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary,
  },
  letterValue: {
    ...typography.h2,
    color: colors.primary,
  },
  failedLetter: {
    color: colors.danger,
  },
  resultText: {
    ...typography.body,
    fontWeight: 'bold',
  },
  passText: {
    color: colors.success,
  },
  failText: {
    color: colors.danger,
  },
  btnBox: {
    margin: spacing.md,
  },
  errorBox: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.danger,
    marginBottom: spacing.md,
  },
});
