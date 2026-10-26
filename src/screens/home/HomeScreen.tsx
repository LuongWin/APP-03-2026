// src/screens/home/HomeScreen.tsx
// Màn hình Tổng quan: Thông tin sinh viên, môn học kỳ này, bài tập 7 ngày tới, số mục chưa đồng bộ

import React from 'react';
import { View, Text, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import CourseCard from '../../components/course/CourseCard';
import AssignmentItem from '../../components/assignment/AssignmentItem';
import { useAppData } from '../../context/AppDataContext';
import { useSync } from '../../context/SyncContext';
import { ROUTES } from '../../navigation/routes';
import { daysLeft } from '../../utils/date';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { student, courses, assignments, loading, error, lastUpdated, refreshAll, toggleAssignmentStatus } = useAppData();
  const { pendingCount, syncing, syncNow } = useSync();

  // Bài tập chưa hoàn thành và đến hạn trong 7 ngày tới
  const upcomingAssignments = assignments.filter(item => {
    if (item.status === 'done') return false;
    const days = daysLeft(item.dueDate);
    return days >= 0 && days <= 7;
  });

  if (loading && !student) {
    return <LoadingView message="Đang tải dữ liệu tổng quan…" />;
  }

  if (error && !student) {
    return <ErrorView message={error} onRetry={refreshAll} />;
  }

  return (
    <ScreenContainer scroll>
      <RefreshControl refreshing={false} onRefresh={refreshAll} />

      {/* Thông tin sinh viên */}
      <View style={styles.studentCard}>
        <Text style={styles.greeting}>Xin chào,</Text>
        <Text style={styles.studentName}>{student?.fullName || 'Sinh viên'}</Text>
        <Text style={styles.studentSub}>
          Mã SV: {student?.studentCode} • Lớp: {student?.className}
        </Text>
        <Text style={styles.studentSub}>Ngành: {student?.major}</Text>
      </View>

      {/* Thông báo số mục chưa đồng bộ khi offline */}
      {pendingCount > 0 ? (
        <TouchableOpacity
          style={styles.syncNotice}
          onPress={syncNow}
          disabled={syncing}
          accessibilityLabel="Đồng bộ các mục đang chờ">
          <Text style={styles.syncNoticeText}>
            {syncing ? 'Đang đồng bộ dữ liệu…' : `Có ${pendingCount} thao tác chưa đồng bộ (Chạm để đồng bộ)`}
          </Text>
        </TouchableOpacity>
      ) : null}

      {/* Dòng thời điểm cập nhật cuối */}
      <LastUpdatedText timestamp={lastUpdated} />

      {/* Môn học kỳ này */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>MÔN HỌC KỲ NÀY ({courses.length})</Text>
      </View>
      {courses.slice(0, 3).map(c => (
        <CourseCard
          key={c.id}
          course={c}
          onPress={() => navigation.navigate(ROUTES.COURSE_DETAIL, { id: c.id })}
        />
      ))}

      {/* Bài tập đến hạn trong 7 ngày tới */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          BÀI TẬP 7 NGÀY TỚI ({upcomingAssignments.length})
        </Text>
      </View>
      {upcomingAssignments.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Không có bài tập nào đến hạn trong 7 ngày tới.</Text>
        </View>
      ) : (
        upcomingAssignments.map(a => (
          <AssignmentItem
            key={a.id}
            assignment={a}
            onPress={() => navigation.navigate(ROUTES.ASSIGNMENT_DETAIL, { id: a.id })}
            onToggleStatus={() => toggleAssignmentStatus(a.id)}
          />
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  studentCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.md,
    margin: spacing.md,
    marginBottom: spacing.xs,
  },
  greeting: {
    ...typography.caption,
    color: colors.textMuted,
  },
  studentName: {
    ...typography.h1,
    color: colors.primary,
    marginVertical: 2,
  },
  studentSub: {
    ...typography.body,
    color: colors.text,
    marginTop: 1,
  },
  syncNotice: {
    backgroundColor: colors.warningBg,
    borderColor: colors.warningText,
    borderWidth: 1,
    borderRadius: 4,
    padding: spacing.sm,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    alignItems: 'center',
  },
  syncNoticeText: {
    ...typography.caption,
    color: colors.warningText,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textMuted,
  },
  emptyBox: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
