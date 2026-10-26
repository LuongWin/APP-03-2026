// src/screens/assignments/AssignmentDetailScreen.tsx
// Chi tiết bài tập: Xem thông tin, đổi trạng thái hoàn thành và xem nhãn chưa đồng bộ

import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import AppButton from '../../components/common/AppButton';
import SyncBadge from '../../components/common/SyncBadge';
import { useAppData } from '../../context/AppDataContext';
import { formatDate, isOverdue } from '../../utils/date';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function AssignmentDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params || {};

  const { assignments, toggleAssignmentStatus } = useAppData();
  const assignment = assignments.find(a => a.id === Number(id));

  useLayoutEffect(() => {
    if (assignment) {
      navigation.setOptions({ title: assignment.title });
    }
  }, [navigation, assignment]);

  if (!assignment) {
    return (
      <ScreenContainer>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Không tìm thấy bài tập #{id}.</Text>
          <AppButton title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
      </ScreenContainer>
    );
  }

  const isDone = assignment.status === 'done';
  const overdue = isOverdue(assignment.dueDate, assignment.status);
  const courseName = assignment.course?.name || `Môn học #${assignment.courseId}`;

  return (
    <ScreenContainer scroll>
      <View style={styles.box}>
        <View style={styles.topRow}>
          <Text style={styles.courseName}>{courseName}</Text>
          <SyncBadge pending={assignment.isPendingSync} />
        </View>

        <Text style={styles.title}>{assignment.title}</Text>

        <Text style={styles.line}>
          Hạn nộp: <Text style={[styles.bold, overdue && styles.overdueText]}>
            {formatDate(assignment.dueDate)} {overdue ? '(Đã quá hạn)' : ''}
          </Text>
        </Text>

        <Text style={styles.line}>
          Trạng thái:{' '}
          <Text style={[styles.bold, isDone ? styles.doneText : styles.todoText]}>
            {isDone ? '✓ Đã hoàn thành' : '○ Chưa hoàn thành'}
          </Text>
        </Text>

        <Text style={styles.descLabel}>Yêu cầu chi tiết:</Text>
        <Text style={styles.descText}>
          {assignment.description || 'Không có mô tả chi tiết cho bài tập này.'}
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <AppButton
          title={isDone ? 'Đánh dấu Chưa làm' : '✓ Đánh dấu Đã hoàn thành'}
          variant={isDone ? 'outline' : 'primary'}
          onPress={() => toggleAssignmentStatus(assignment.id)}
        />
        <AppButton
          title="Quay lại danh sách"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
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
    margin: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  courseName: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 4,
  },
  line: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  bold: {
    fontWeight: 'bold',
  },
  overdueText: {
    color: colors.danger,
  },
  doneText: {
    color: colors.success,
  },
  todoText: {
    color: colors.danger,
  },
  descLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: 'bold',
    marginTop: spacing.sm,
  },
  descText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 20,
    marginTop: 2,
  },
  btnContainer: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xs,
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
