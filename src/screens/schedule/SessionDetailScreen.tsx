// src/screens/schedule/SessionDetailScreen.tsx
// Chi tiết buổi học: Môn học, thứ, thời gian, phòng học, giảng viên, ghi chú

import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import AppButton from '../../components/common/AppButton';
import { useAppData } from '../../context/AppDataContext';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function SessionDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params || {};

  const { sessions } = useAppData();
  const session = sessions.find(s => s.id === Number(id));

  const courseName = session?.course?.name || `Môn học #${session?.courseId}`;
  const dayName = session?.dayOfWeek === 8 ? 'Chủ nhật' : `Thứ ${session?.dayOfWeek}`;

  useLayoutEffect(() => {
    navigation.setOptions({ title: courseName });
  }, [navigation, courseName]);

  if (!session) {
    return (
      <ScreenContainer>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Không tìm thấy thông tin buổi học #{id}.</Text>
          <AppButton title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll>
      <View style={styles.box}>
        <Text style={styles.title}>{courseName}</Text>
        <Text style={styles.line}>Ngày học: <Text style={styles.bold}>{dayName}</Text></Text>
        <Text style={styles.line}>
          Thời gian: <Text style={styles.timeText}>{session.startTime} – {session.endTime}</Text>
        </Text>
        <Text style={styles.line}>
          Phòng học: <Text style={styles.roomText}>{session.room}</Text>
        </Text>
        <Text style={styles.line}>
          Giảng viên phụ trách: {session.course?.lecturer || 'Đang cập nhật'}
        </Text>
        <Text style={styles.line}>Mã môn: {session.course?.code || 'N/A'}</Text>
        <Text style={styles.line}>Ghi chú: {session.note || 'Không có ghi chú nào cho buổi học này.'}</Text>
      </View>

      <View style={styles.btnRow}>
        <AppButton title="Quay lại thời khóa biểu" variant="outline" onPress={() => navigation.goBack()} />
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
  title: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 4,
  },
  line: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs + 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  timeText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  roomText: {
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
    marginHorizontal: spacing.md,
  },
});
