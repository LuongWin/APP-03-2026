// src/screens/profile/ProfileScreen.tsx
// Màn hình Cá nhân: Hiển thị thông tin sinh viên, tóm tắt GPA hệ 4.0 và điều hướng đến sửa thông tin / bảng điểm

import React from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import AppButton from '../../components/common/AppButton';
import InfoRow from '../../components/profile/InfoRow';
import GpaSummary from '../../components/grade/GpaSummary';
import { useAppData } from '../../context/AppDataContext';
import { calcGpa } from '../../utils/gpa';
import { ROUTES } from '../../navigation/routes';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { student, courses, grades, loading, error, lastUpdated, refreshAll } = useAppData();

  if (loading && !student) {
    return <LoadingView message="Đang tải thông tin cá nhân…" />;
  }

  if (error && !student) {
    return <ErrorView message={error} onRetry={refreshAll} />;
  }

  // Tính GPA toàn khóa
  const gpaResult = calcGpa(grades, courses);

  return (
    <ScreenContainer scroll>
      <RefreshControl refreshing={false} onRefresh={refreshAll} />

      {/* Thẻ tóm tắt GPA */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>KẾT QUẢ HỌC TẬP TÍCH LŨY</Text>
      </View>
      <GpaSummary gpa={gpaResult.gpa} totalCredits={gpaResult.totalCredits} />

      <View style={styles.rankCard}>
        <Text style={styles.rankLabel}>Xếp loại học lực:</Text>
        <Text style={styles.rankValue}>{gpaResult.rank}</Text>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>THÔNG TIN SINH VIÊN</Text>
      </View>

      <View style={styles.card}>
        <InfoRow label="Họ và tên" value={student?.fullName || '—'} />
        <InfoRow label="Mã sinh viên" value={student?.studentCode || '—'} />
        <InfoRow label="Lớp sinh hoạt" value={student?.className || '—'} />
        <InfoRow label="Ngành học" value={student?.major || '—'} />
        <InfoRow label="Email" value={student?.email || '—'} />
        <InfoRow label="Số điện thoại" value={student?.phone || '—'} />
      </View>

      {/* Nút hành động */}
      <View style={styles.btnGroup}>
        <AppButton
          title="Chỉnh sửa thông tin cá nhân"
          variant="primary"
          onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}
        />
        <AppButton
          title="Xem bảng điểm chi tiết"
          variant="outline"
          onPress={() => navigation.navigate(ROUTES.GRADE_LIST)}
        />
      </View>

      {/* Thời điểm cập nhật cuối */}
      <LastUpdatedText timestamp={lastUpdated} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textMuted,
  },
  rankCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  rankLabel: {
    ...typography.body,
    color: colors.textMuted,
  },
  rankValue: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  btnGroup: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
});
