// src/screens/courses/CourseDetailScreen.tsx
// Chi tiết môn học: thông tin môn, lịch học và bài tập của môn

import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import AppButton from '../../components/common/AppButton';
import { useAppData } from '../../context/AppDataContext';
import { ROUTES } from '../../navigation/routes';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function CourseDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params || {};

  const { courses, sessions, assignments } = useAppData();
  const course = courses.find(c => c.id === Number(id));

  // Lọc lịch học và bài tập của môn này
  const courseSessions = sessions.filter(s => s.courseId === Number(id));
  const courseAssignments = assignments.filter(a => a.courseId === Number(id));

  // Đặt tiêu đề header là tên môn học
  useLayoutEffect(() => {
    if (course) {
      navigation.setOptions({ title: course.name });
    }
  }, [navigation, course]);

  if (!course) {
    return (
      <ScreenContainer>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Không tìm thấy thông tin môn học #{id}.</Text>
          <AppButton title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll>
      {/* Khung thông tin môn học */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>THÔNG TIN MÔN HỌC</Text>
        <Text style={styles.line}>Tên môn: <Text style={styles.bold}>{course.name}</Text></Text>
        <Text style={styles.line}>Mã môn: <Text style={styles.bold}>{course.code}</Text></Text>
        <Text style={styles.line}>Số tín chỉ: {course.credits}</Text>
        <Text style={styles.line}>Giảng viên: {course.lecturer}</Text>
        <Text style={styles.line}>Học kỳ: {course.semester}</Text>
        {course.description ? (
          <Text style={styles.line}>Mô tả: {course.description}</Text>
        ) : null}
      </View>

      {/* Lịch học của môn */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>LỊCH HỌC TRONG TUẦN ({courseSessions.length})</Text>
        {courseSessions.length === 0 ? (
          <Text style={styles.emptyNote}>Chưa có lịch học cho môn này.</Text>
        ) : (
          courseSessions.map(s => (
            <View key={s.id} style={styles.subItem}>
              <Text style={styles.bold}>Thứ {s.dayOfWeek === 8 ? 'Chủ nhật' : s.dayOfWeek}</Text>
              <Text style={styles.line}>⏰ {s.startTime} – {s.endTime} | Phòng: {s.room}</Text>
              {s.note ? <Text style={styles.note}>Ghi chú: {s.note}</Text> : null}
            </View>
          ))
        )}
      </View>

      {/* Bài tập của môn */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>BÀI TẬP CỦA MÔN ({courseAssignments.length})</Text>
        {courseAssignments.length === 0 ? (
          <Text style={styles.emptyNote}>Chưa có bài tập nào cho môn học này.</Text>
        ) : (
          courseAssignments.map(a => (
            <TouchableOpacity
              key={a.id}
              style={styles.subItem}
              onPress={() => navigation.navigate(ROUTES.ASSIGNMENT_DETAIL, { id: a.id })}>
              <Text style={styles.bold}>{a.title}</Text>
              <Text style={styles.line}>
                Trạng thái: <Text style={a.status === 'done' ? styles.doneText : styles.todoText}>
                  {a.status === 'done' ? 'Đã xong' : 'Chưa làm'}
                </Text>
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={styles.btnRow}>
        <AppButton title="Quay lại" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  boxTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 4,
  },
  line: {
    ...typography.body,
    color: colors.text,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  note: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  emptyNote: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  subItem: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 4,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  todoText: {
    color: colors.danger,
    fontWeight: 'bold',
  },
  doneText: {
    color: colors.success,
    fontWeight: 'bold',
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
  btnRow: {
    margin: spacing.md,
  },
});
