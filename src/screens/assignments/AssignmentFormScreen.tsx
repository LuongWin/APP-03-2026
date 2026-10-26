// src/screens/assignments/AssignmentFormScreen.tsx
// Màn hình thêm bài tập mới (gửi POST lên API hoặc xếp vào Outbox khi offline)

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/common/ScreenContainer';
import FormInput from '../../components/common/FormInput';
import AppButton from '../../components/common/AppButton';
import { useAppData } from '../../context/AppDataContext';
import { validateAssignment } from '../../utils/validators';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function AssignmentFormScreen() {
  const navigation = useNavigation<any>();
  const { courses, addAssignment } = useAppData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<number>(courses[0]?.id || 1);

  // Mặc định hạn nộp là 7 ngày sau
  const defaultDueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const [dueDate, setDueDate] = useState(defaultDueDate);

  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  // Chọn nhanh hạn nộp
  const setQuickDue = (days: number) => {
    const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    setDueDate(d.toISOString());
  };

  const handleSubmit = async () => {
    // Kiểm tra dữ liệu đầu vào theo yêu cầu A5
    const validation = validateAssignment(title, dueDate);
    if (!validation.isValid) {
      setErrors({ title: validation.error });
      return;
    }
    setErrors({});
    setSubmitting(true);

    const success = await addAssignment({
      courseId: selectedCourseId,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      status: 'todo',
    });

    setSubmitting(false);

    if (success) {
      Alert.alert('Thành công', 'Đã thêm bài tập mới!');
      navigation.goBack(); // Sau khi lưu form thành công thì tự quay về
    }
  };

  return (
    <ScreenContainer scroll>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>THÊM BÀI TẬP MỚI</Text>

        {/* Tiêu đề bài tập */}
        <FormInput
          label="Tiêu đề bài tập (*)"
          value={title}
          onChangeText={setTitle}
          placeholder="Nhập tên bài tập…"
          error={errors.title}
        />

        {/* Chọn môn học */}
        <Text style={styles.fieldLabel}>Môn học (*)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courseScroll}>
          {courses.map(c => {
            const isSelected = selectedCourseId === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.courseChip, isSelected && styles.courseChipActive]}
                onPress={() => setSelectedCourseId(c.id)}>
                <Text style={[styles.courseChipText, isSelected && styles.courseChipTextActive]}>
                  {c.code} - {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Hạn nộp */}
        <Text style={styles.fieldLabel}>Hạn chót nộp bài (*)</Text>
        <View style={styles.quickDueRow}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => setQuickDue(3)}>
            <Text style={styles.quickBtnText}>+3 Ngày</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => setQuickDue(7)}>
            <Text style={styles.quickBtnText}>+7 Ngày</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => setQuickDue(14)}>
            <Text style={styles.quickBtnText}>+14 Ngày</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dueDateDisplay}>
          Hạn chọn: {new Date(dueDate).toLocaleString('vi-VN')}
        </Text>

        {/* Mô tả yêu cầu */}
        <FormInput
          label="Mô tả chi tiết yêu cầu"
          value={description}
          onChangeText={setDescription}
          placeholder="Nhập yêu cầu bài tập (tùy chọn)…"
          multiline
        />

        {/* Nút lưu */}
        <View style={styles.btnRow}>
          <AppButton
            title="Lưu bài tập"
            onPress={handleSubmit}
            loading={submitting}
          />
          <AppButton
            title="Hủy bỏ"
            variant="outline"
            onPress={() => navigation.goBack()}
            disabled={submitting}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.md,
    margin: spacing.md,
  },
  formTitle: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.xs,
  },
  fieldLabel: {
    ...typography.caption,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  courseScroll: {
    marginBottom: spacing.sm,
  },
  courseChip: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
  },
  courseChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  courseChipText: {
    ...typography.caption,
    color: colors.text,
  },
  courseChipTextActive: {
    color: colors.card,
    fontWeight: 'bold',
  },
  quickDueRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  quickBtn: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
  },
  quickBtnText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
  },
  dueDateDisplay: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  btnRow: {
    marginTop: spacing.sm,
  },
});
