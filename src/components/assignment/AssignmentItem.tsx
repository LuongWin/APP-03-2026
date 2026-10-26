// src/components/assignment/AssignmentItem.tsx
// Mục bài tập trong danh sách có nút đổi trạng thái và nhãn Chưa đồng bộ

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StatusToggle from './StatusToggle';
import SyncBadge from '../common/SyncBadge';
import { formatDate, isOverdue } from '../../utils/date';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { Assignment } from '../../context/AppDataContext';

interface AssignmentItemProps {
  assignment: Assignment;
  pending?: boolean;
  onPress: () => void;
  onToggleStatus: () => void;
}

function AssignmentItem({
  assignment,
  pending = false,
  onPress,
  onToggleStatus,
}: AssignmentItemProps) {
  const overdue = isOverdue(assignment.dueDate, assignment.status);
  const courseName = assignment.course?.name || `Môn học #${assignment.courseId}`;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.mainContent}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityLabel={`Xem chi tiết bài tập ${assignment.title}`}>
        <Text style={styles.courseName}>{courseName}</Text>
        <Text
          style={[
            styles.title,
            assignment.status === 'done' && styles.titleDone,
          ]}>
          {assignment.title}
        </Text>
        <Text style={[styles.deadline, overdue && styles.deadlineOverdue]}>
          Hạn nộp: {formatDate(assignment.dueDate)} {overdue ? '(Quá hạn!)' : ''}
        </Text>

        {/* Nhãn chưa đồng bộ khi offline */}
        <SyncBadge pending={pending || assignment.isPendingSync} />
      </TouchableOpacity>

      <View style={styles.actionCol}>
        <StatusToggle status={assignment.status} onToggle={onToggleStatus} />
      </View>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  courseName: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  deadline: {
    ...typography.caption,
    color: colors.textMuted,
  },
  deadlineOverdue: {
    color: colors.danger,
    fontWeight: 'bold',
  },
  actionCol: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default React.memo(AssignmentItem);
