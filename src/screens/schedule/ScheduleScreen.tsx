// src/screens/schedule/ScheduleScreen.tsx
// Thời khóa biểu: Chọn ngày bằng DaySelector (Thứ 2 - CN), hiển thị danh sách tiết học

import React, { useState, useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import DaySelector from '../../components/schedule/DaySelector';
import SessionCard from '../../components/schedule/SessionCard';
import EmptyState from '../../components/common/EmptyState';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import { useAppData, Session } from '../../context/AppDataContext';
import { ROUTES } from '../../navigation/routes';
import spacing from '../../theme/spacing';

export default function ScheduleScreen() {
  const navigation = useNavigation<any>();
  const { sessions, loading, error, lastUpdated, refreshAll } = useAppData();

  // Xác định ngày hôm nay theo quy ước (2 = Thứ 2 .. 8 = Chủ nhật)
  const getTodayDayOfWeek = (): number => {
    const day = new Date().getDay(); // 0 là Chủ nhật, 1 là Thứ 2
    return day === 0 ? 8 : day + 1;
  };

  const [selectedDay, setSelectedDay] = useState<number>(getTodayDayOfWeek());

  // Lọc các buổi học theo ngày đã chọn
  const daySessions = useMemo(() => {
    return sessions.filter(s => s.dayOfWeek === selectedDay);
  }, [sessions, selectedDay]);

  const getDayName = (val: number): string => {
    return val === 8 ? 'Chủ nhật' : `Thứ ${val}`;
  };

  if (loading && sessions.length === 0) {
    return <LoadingView message="Đang tải thời khóa biểu…" />;
  }

  if (error && sessions.length === 0) {
    return <ErrorView message={error} onRetry={refreshAll} />;
  }

  return (
    <ScreenContainer>
      {/* 7 nút chọn thứ từ Thứ 2 đến Chủ nhật */}
      <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      <LastUpdatedText timestamp={lastUpdated} />

      <FlatList
        data={daySessions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }: { item: Session }) => (
          <SessionCard
            session={item}
            onPress={() => navigation.navigate(ROUTES.SESSION_DETAIL, { id: item.id })}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={false} onRefresh={refreshAll} />}
        ListEmptyComponent={
          <EmptyState
            title={`Không có lịch học vào ${getDayName(selectedDay)}`}
            description="Bạn được nghỉ học hoặc không có tiết trong ngày này."
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
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },
});
