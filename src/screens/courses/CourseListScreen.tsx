// src/screens/courses/CourseListScreen.tsx
// Danh sách môn học có tìm kiếm theo tên/mã và lọc theo học kỳ

import React, { useState, useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import SearchBar from '../../components/common/SearchBar';
import FilterChips from '../../components/common/FilterChips';
import CourseCard from '../../components/course/CourseCard';
import EmptyState from '../../components/common/EmptyState';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import { useAppData, Course } from '../../context/AppDataContext';
import { ROUTES } from '../../navigation/routes';
import spacing from '../../theme/spacing';

export default function CourseListScreen() {
  const navigation = useNavigation<any>();
  const { courses, loading, error, lastUpdated, refreshAll } = useAppData();

  const [search, setSearch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('ALL');

  // Danh sách các học kỳ có trong dữ liệu
  const semesterOptions = useMemo(() => {
    const sems = Array.from(new Set(courses.map(c => c.semester).filter(Boolean)));
    return [
      { label: 'Tất cả học kỳ', value: 'ALL' },
      ...sems.map(s => ({ label: s, value: s })),
    ];
  }, [courses]);

  // Lọc theo tìm kiếm và học kỳ
  const filteredCourses = useMemo(() => {
    return courses.filter(item => {
      const matchSearch =
        search.trim() === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase());

      const matchSemester =
        selectedSemester === 'ALL' || item.semester === selectedSemester;

      return matchSearch && matchSemester;
    });
  }, [courses, search, selectedSemester]);

  if (loading && courses.length === 0) {
    return <LoadingView message="Đang tải danh sách môn học…" />;
  }

  if (error && courses.length === 0) {
    return <ErrorView message={error} onRetry={refreshAll} />;
  }

  return (
    <ScreenContainer>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Tìm môn học theo tên hoặc mã…"
      />

      <FilterChips
        options={semesterOptions}
        selected={selectedSemester}
        onSelect={setSelectedSemester}
      />

      <LastUpdatedText timestamp={lastUpdated} />

      <FlatList
        data={filteredCourses}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }: { item: Course }) => (
          <CourseCard
            course={item}
            onPress={() => navigation.navigate(ROUTES.COURSE_DETAIL, { id: item.id })}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={false} onRefresh={refreshAll} />}
        ListEmptyComponent={
          <EmptyState
            title="Không tìm thấy môn học nào"
            description="Hãy thử tìm bằng từ khóa khác hoặc xóa bộ lọc học kỳ."
            actionLabel="Xóa bộ lọc"
            onAction={() => {
              setSearch('');
              setSelectedSemester('ALL');
            }}
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },
});
