// src/screens/assignments/AssignmentListScreen.tsx
// Danh sách bài tập: lọc trạng thái (Tất cả / Chưa xong / Đã xong / Quá hạn) + Nút Thêm mới

import React, { useState, useMemo } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import FilterChips from '../../components/common/FilterChips';
import AppButton from '../../components/common/AppButton';
import AssignmentItem from '../../components/assignment/AssignmentItem';
import EmptyState from '../../components/common/EmptyState';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import { useAppData, Assignment } from '../../context/AppDataContext';
import { ROUTES } from '../../navigation/routes';
import { isOverdue } from '../../utils/date';
import spacing from '../../theme/spacing';

const FILTER_OPTIONS = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Chưa xong', value: 'TODO' },
  { label: 'Đã xong', value: 'DONE' },
  { label: 'Quá hạn', value: 'OVERDUE' },
];

export default function AssignmentListScreen() {
  const navigation = useNavigation<any>();
  const { assignments, loading, error, lastUpdated, refreshAll, toggleAssignmentStatus } = useAppData();

  const [filter, setFilter] = useState('ALL');

  // Lọc bài tập theo trạng thái
  const filteredList = useMemo(() => {
    return assignments.filter(item => {
      const overdue = isOverdue(item.dueDate, item.status);
      if (filter === 'TODO') return item.status === 'todo';
      if (filter === 'DONE') return item.status === 'done';
      if (filter === 'OVERDUE') return overdue;
      return true;
    });
  }, [assignments, filter]);

  if (loading && assignments.length === 0) {
    return <LoadingView message="Đang tải danh sách bài tập…" />;
  }

  if (error && assignments.length === 0) {
    return <ErrorView message={error} onRetry={refreshAll} />;
  }

  return (
    <ScreenContainer>
      {/* Bộ lọc trạng thái */}
      <FilterChips
        options={FILTER_OPTIONS}
        selected={filter}
        onSelect={setFilter}
      />

      {/* Nút thêm bài tập mới */}
      <View style={styles.addBtnContainer}>
        <AppButton
          title="+ Thêm bài tập mới"
          onPress={() => navigation.navigate(ROUTES.ASSIGNMENT_FORM)}
        />
      </View>

      <LastUpdatedText timestamp={lastUpdated} />

      <FlatList
        data={filteredList}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }: { item: Assignment }) => (
          <AssignmentItem
            assignment={item}
            onPress={() => navigation.navigate(ROUTES.ASSIGNMENT_DETAIL, { id: item.id })}
            onToggleStatus={() => toggleAssignmentStatus(item.id)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={false} onRefresh={refreshAll} />}
        ListEmptyComponent={
          <EmptyState
            title="Không có bài tập nào"
            description="Bạn không có bài tập nào trong danh sách lọc này."
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  addBtnContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },
});
