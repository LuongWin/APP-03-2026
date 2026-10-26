// src/screens/profile/GradeListScreen.tsx
// Màn hình Bảng điểm chi tiết: Lọc theo học kỳ, hiển thị GPA học kỳ và danh sách môn học

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import FilterChips from '../../components/common/FilterChips';
import EmptyState from '../../components/common/EmptyState';
import GpaSummary from '../../components/grade/GpaSummary';
import GradeRow from '../../components/grade/GradeRow';
import { useAppData, Grade } from '../../context/AppDataContext';
import { calcGpa } from '../../utils/gpa';
import { ROUTES } from '../../navigation/routes';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function GradeListScreen() {
  const navigation = useNavigation<any>();
  const { grades, courses, refreshAll } = useAppData();
  const [selectedSemester, setSelectedSemester] = useState<string>('ALL');

  // Lấy danh sách các học kỳ duy nhất từ dữ liệu
  const semesterOptions = useMemo(() => {
    const set = new Set<string>();
    grades.forEach(g => {
      if (g.semester) set.add(g.semester);
    });
    const list = Array.from(set).sort();
    return [
      { label: 'Tất cả học kỳ', value: 'ALL' },
      ...list.map(s => ({ label: `Học kỳ ${s}`, value: s })),
    ];
  }, [grades]);

  // Lọc theo học kỳ đã chọn
  const filteredGrades = useMemo(() => {
    if (selectedSemester === 'ALL') return grades;
    return grades.filter(g => g.semester === selectedSemester);
  }, [grades, selectedSemester]);

  // Tính GPA cho danh sách đang hiển thị
  const gpaResult = useMemo(() => {
    return calcGpa(filteredGrades, courses);
  }, [filteredGrades, courses]);

  return (
    <ScreenContainer>
      <FlatList
        data={filteredGrades}
        keyExtractor={item => String(item.id)}
        refreshControl={<RefreshControl refreshing={false} onRefresh={refreshAll} />}
        ListHeaderComponent={
          <View>
            <View style={styles.filterSection}>
              <FilterChips
                options={semesterOptions}
                selected={selectedSemester}
                onSelect={setSelectedSemester}
              />
            </View>

            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>
                {selectedSemester === 'ALL'
                  ? 'TỔNG KẾT TOÀN KHÓA'
                  : `TỔNG KẾT HỌC KỲ ${selectedSemester}`}
              </Text>
            </View>
            <GpaSummary gpa={gpaResult.gpa} totalCredits={gpaResult.totalCredits} />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                DANH SÁCH MÔN HỌC ({filteredGrades.length})
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }: { item: Grade }) => (
          <GradeRow
            grade={item}
            onPress={() => navigation.navigate(ROUTES.GRADE_DETAIL, { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Chưa có dữ liệu điểm"
            description="Không tìm thấy kết quả học tập nào cho lựa chọn hiện tại."
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.lg,
  },
  filterSection: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  summaryHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  summaryTitle: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textMuted,
  },
});
