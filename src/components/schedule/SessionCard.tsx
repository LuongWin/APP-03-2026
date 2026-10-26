// src/components/schedule/SessionCard.tsx
// Thẻ hiển thị một buổi học trong thời khóa biểu

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { Session } from '../../context/AppDataContext';

interface SessionCardProps {
  session: Session;
  onPress: () => void;
}

function SessionCard({ session, onPress }: SessionCardProps) {
  const courseName = session.course?.name || `Môn học #${session.courseId}`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={`Buổi học ${courseName}`}>
      <View style={styles.header}>
        <Text style={styles.time}>
          ⏰ {session.startTime} – {session.endTime}
        </Text>
        <Text style={styles.room}>📍 {session.room}</Text>
      </View>
      <Text style={styles.title}>{courseName}</Text>
      {session.note ? <Text style={styles.note}>Ghi chú: {session.note}</Text> : null}
    </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  time: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
  },
  room: {
    ...typography.caption,
    color: colors.success,
    fontWeight: 'bold',
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 2,
  },
  note: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: 2,
  },
});

export default React.memo(SessionCard);
